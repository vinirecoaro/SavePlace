import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text, View, FlatList} from "native-base"
import { Container } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Localization from "@/model/localization";
import { router, useFocusEffect } from "expo-router";
import { useLocalization } from "@/contexts/localization";
import { useEditLocalization } from "@/contexts/editLocalization";
import { useCallback, useState } from "react";
import { FontConstants } from "@/styles/Global.style";
import { useLocalizationsList } from "@/contexts/localizationsListContext";

export default function LocalizationList(){
  
  const { setLocalization } = useLocalization();
  const { setEditLocalization } = useEditLocalization();
  const [locs, setLocs] = useState<Array<Localization>>([])
  const {localizations, loadLocalizations} = useLocalizationsList()

  useFocusEffect(
    useCallback(() => {
      getLocations();
    }, [])
  );

  const getLocations = async () => {
    let locsList : Localization[] = []
    await loadLocalizations()
    locsList = localizations
    setLocs(locsList)
  }

  const handleEditOption = () => {
    setEditLocalization(true)
    router.push('/addEdit');
  };

  const handleMapOption = (item : Localization) => {
    router.replace({
      pathname: '/map',
      params: {
        latitude: item.latitude,
        longitude: item.longitude,
      }
    })
  }

  const showActionDialog = (item : Localization) => {
    Alert.alert(
      "Ação", // Título
      "Selecione a ação que deseja tomar", // Mensagem
      [
        {
          text: "Ver no Mapa", // Botão de cancelar
          onPress: () => {
            handleMapOption(item)
          },
          style: "cancel"
        },
        {
          text: "Editar", // Botão de ação
          onPress: () => handleEditOption()
        }
      ],
      { cancelable: true } // Se o diálogo pode ser fechado ao clicar fora dele
    );
};

  const ListItem = ( { item }: { item: Localization }) => {
    return (
      <TouchableOpacity 
      style={styles.container} 
      onPress={() => {
          setLocalization(item);
          showActionDialog(item)
        }
      }>
        <Icon name="map-marker" size={40} color={item.pinColor} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.primaryText}>{item.name}</Text>
          <Text style={styles.secondaryText}>Lat: {item.latitude} Lon: {item.longitude}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return(
      <Container>
          <FlatList
              data={locs}
              renderItem={({item}) => <ListItem item={item}/>}
              keyExtractor={item => item.id}
          />
      </Container>      
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // Alinha o ícone e as linhas de texto na horizontal
    alignItems: 'center',       // Alinha verticalmente o ícone e as linhas de texto no centro
    padding: 10,                // Espaço ao redor do item
    borderBottomWidth: 1,       // Linha separadora entre os itens (opcional)
    borderBottomColor: '#ddd',  // Cor da linha separadora
  },
  icon: {
    marginRight: 15,            
  },
  textContainer: {
    flex: 1,                    // O conteúdo das linhas de texto ocupará o restante do espaço
  },
  primaryText: {
    fontSize: 16,               // Tamanho da fonte para a primeira linha de texto
    fontWeight: 'bold',
    color: FontConstants.color       // Deixar a primeira linha em negrito (opcional)
  },
  secondaryText: {
    fontSize: 14,               // Tamanho da fonte para a segunda linha de texto
    color: FontConstants.placeHolderTextColor,              // Cor da segunda linha (opcional)
  },
});
  