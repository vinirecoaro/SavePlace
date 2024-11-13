import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Container } from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";
import Localization from "@/model/localization";
import { router } from "expo-router";
import { useLocalization } from "@/contexts/localization";
import { useEditLocalization } from "@/contexts/editLocalization";

export default function LocalizationList(){
    const locList: Localization[] = [
        new Localization('1', 'Localização 1', '40.7128', '-74.0060', '#FF5733'),  // Exemplo de cor hexadecimal
        new Localization('2', 'Localização 2', '34.0522', '-118.2437', '#3498db'),  // Azul
        new Localization('3', 'Localização 3', '51.5074', '-0.1278', '#2ecc71'),   // Verde
        new Localization('4', 'Localização 4', '48.8566', '2.3522', '#f1c40f'),    // Amarelo
        new Localization('5', 'Localização 5', '35.6895', '139.6917', '#8e44ad')   // Roxo
    ];

    const { setLocalization } = useLocalization();
    const { setEditLocalization } = useEditLocalization();
    
    const handleItemPress = (item : Localization) => {
        setLocalization(item);
        setEditLocalization(true)
        router.push('/add');
      };

    return(
        <Container>
            <FlatList
                data={locList}
                renderItem={({item}) => <ListItem item={item} onPress={() =>{router.push('/add')}}/>}
                keyExtractor={item => item.id}
            />
        </Container>
    )
}

const ListItem = ({ item, onPress }: { item: Localization, onPress: (item: Localization) => void }) => {
    return (
      <TouchableOpacity style={styles.container}>
        <Icon name="map-marker" size={40} color={item.pinColor} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.primaryText}>{item.name}</Text>
          <Text style={styles.secondaryText}>Lat: {item.latitude} Lon: {item.longitude}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',       // Alinha o ícone e as linhas de texto na horizontal
      alignItems: 'center',       // Alinha verticalmente o ícone e as linhas de texto no centro
      padding: 10,                // Espaço ao redor do item
      borderBottomWidth: 1,       // Linha separadora entre os itens (opcional)
      borderBottomColor: '#ddd',  // Cor da linha separadora
    },
    icon: {
      marginRight: 15,            // Espaço entre o ícone e as linhas de texto
    },
    textContainer: {
      flex: 1,                    // O conteúdo das linhas de texto ocupará o restante do espaço
    },
    primaryText: {
      fontSize: 16,               // Tamanho da fonte para a primeira linha de texto
      fontWeight: 'bold',         // Deixar a primeira linha em negrito (opcional)
    },
    secondaryText: {
      fontSize: 14,               // Tamanho da fonte para a segunda linha de texto
      color: '#888',              // Cor da segunda linha (opcional)
    },
  });
  