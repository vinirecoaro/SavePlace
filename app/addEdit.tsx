import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { TextInput, StyleSheet, Button, View, Alert } from 'react-native'
import { useLocalization } from "@/contexts/localization";
import { useEditLocalization } from "@/contexts/editLocalization";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Localization from "@/model/localization";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";
import { CheckIcon, NativeBaseProvider, Select } from "native-base";
import * as Location from 'expo-location';
import { FontConstants, InputConstants } from "@/styles/Global.style";
import { useLocalizationsList } from "@/contexts/localizationsListContext";


export default function AddEditScreen(){
    const [name, setName] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [pinColor, setPinColor] = useState('')
    const [locs, setLocs] = useState<Array<Localization>>([])
    const { localization } = useLocalization();
    const { editLocalization } = useEditLocalization();
    const navigation = useNavigation();
    const {addLocalization, updateLocalization, deleteLocalization} = useLocalizationsList()

    const handleAddLoc = async () => {
        const loc: Localization = new Localization(
            name+latitude+longitude+pinColor, 
            name,
            latitude, 
            longitude, 
            pinColor
        )
        await addLocalization(loc)
        setName('')
        setLatitude('')
        setLongitude('')
        setPinColor('')
    }

    const handleUpdateLoc = async () => {
        if(localization){
            const loc: Localization = new Localization(
                localization.id,
                name,
                latitude, 
                longitude, 
                pinColor
            )
            await updateLocalization(loc)
            router.back()
        }else{
            console.log("Falha ao editar localização")
        }
    }

    const handleDeleteLoc = async (item : Localization) => {
        await deleteLocalization(item.id)
        router.back()
    }

    const showDeleteDialog = () => {
        Alert.alert(
          "Confirmação", // Título
          "Tem certeza que deseja deletar este item?", // Mensagem
          [
            {
              text: "Cancelar", // Botão de cancelar
              style: "cancel"
            },
            {
              text: "Deletar", // Botão de ação
              onPress: () => handleDeleteLoc(localization!)
            }
          ],
          { cancelable: true } // Se o diálogo pode ser fechado ao clicar fora dele
        );
    };

    const getCurrentLocation = async() => {
        let locationPermission = await Location.requestForegroundPermissionsAsync();
        let { status } = locationPermission;
        // let status = locationPermission.status;
        if (status !== 'granted') {
            console.log('A permissão foi negada!');
        } else {
            let location = await Location.getCurrentPositionAsync();
            setLatitude((location?.coords.latitude).toString() ?? '0')
            setLongitude((location?.coords.longitude).toString() ?? '0')
        }
    }

    useEffect(() => {
        if (editLocalization) {
            navigation.setOptions({
                title:'Editar Localização',
            })
            if(localization != null){
                setName(localization.name);
                setLatitude(localization.latitude);
                setLongitude(localization.longitude);
                setPinColor(localization.pinColor);
                navigation.setOptions({
                    headerRight: () => (
                        <Icon
                            name="trash"
                            size={24}
                            color="white"
                            onPress={showDeleteDialog} // Botão de deletar
                        />
                    ),
                })
            }
        }else{
            navigation.setOptions({
                title:'Adicionar Localização',
                headerRight: () => (
                    <Icon
                        name="map-marker"
                        size={24}
                        color="white"
                        onPress={getCurrentLocation} // Botão de deletar
                    />
                )
            })
        }
      }, []);

    return(
        <Container>
             <TextInput
                style={styles.input}
                value={name}
                placeholder="Nome da Localização"
                placeholderTextColor={FontConstants.placeHolderTextColor}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                value={latitude}
                placeholder="Latitude"
                placeholderTextColor={FontConstants.placeHolderTextColor}
                onChangeText={setLatitude}
            />
            <TextInput
                style={styles.input}
                value={longitude}
                placeholder="Longitude"
                placeholderTextColor={FontConstants.placeHolderTextColor}
                onChangeText={setLongitude}
            />
            <NativeBaseProvider>
                
                <Select 
                style={styles.input} 
                selectedValue={pinColor} 
                accessibilityLabel="Cor do Marcador" 
                placeholder="Cor do Marcador"
                variant="unstyled"
                placeholderTextColor={FontConstants.placeHolderTextColor}
                _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />
                }} 
                mt={1} onValueChange={itemValue => setPinColor(itemValue)}>
                <Select.Item label="Blue" value="blue" />
                <Select.Item label="Red" value="red" />
                <Select.Item label="Green" value="green" />
                <Select.Item label="Yellow" value="yellow" />
                <Select.Item label="Purple" value="purple" />
                </Select>
                    
            </NativeBaseProvider>
            
            <View
            style={styles.button}
            >
                <Button
                    title="Salvar"
                    color="#f4511e"
                    onPress={() => {
                        if(editLocalization){
                            handleUpdateLoc()
                        }else{
                            handleAddLoc()
                        }
                    }}
                />
            </View>
            
        </Container>
    )    
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: InputConstants.borderBottomColor,
        padding:10,
        fontSize: 18,
        color: FontConstants.color
    },
    button: {
        marginTop : 30,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 30
    }
})