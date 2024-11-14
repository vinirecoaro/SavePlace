import { useEffect, useState } from "react";
import { Container } from "./styles";
import {Text, TextInput, StyleSheet, Button, View} from 'react-native'
import { useLocalization } from "@/contexts/localization";
import { useEditLocalization } from "@/contexts/editLocalization";
import { useNavigation } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Localization from "@/model/localization";
import Icon from "react-native-vector-icons/FontAwesome";
import { router } from "expo-router";


export default function AddEditScreen(){
    const [name, setName] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [pinColor, setPinColor] = useState('')
    const [locs, setLocs] = useState<Array<Localization>>([])

    const handleAddLoc = async () => {
        let locsList : Localization[] = []
        const locsStorage = await AsyncStorage.getItem('markers');
        if (locsStorage){
            locsList = JSON.parse(locsStorage)
        }
        const loc: Localization = new Localization(
            name+latitude+longitude+pinColor, 
            name,
            latitude, 
            longitude, 
            pinColor
        )
        locsList.push(loc)
        setLocs(locsList)
        AsyncStorage.setItem('markers', JSON.stringify(locsList));
        setName('')
        setLatitude('')
        setLongitude('')
        setPinColor('')
    }

    const updateLoc = async () => {

    }

    const handleDeleteLoc = async (item : Localization) => {
        let locsList : Localization[] = []
        const locsStorage = await AsyncStorage.getItem('markers');
        if (locsStorage){
            locsList = JSON.parse(locsStorage)
            const updatedList = locsList.filter(loc => loc.id !== localization!.id);
            setLocs(updatedList);
            await AsyncStorage.setItem('markers', JSON.stringify(updatedList));
            router.back()
        }

    }

    const { localization } = useLocalization();
    const { editLocalization } = useEditLocalization();
    const navigation = useNavigation();

    useEffect(() => {
        if (editLocalization) {
            navigation.setOptions({
                title:'Editar Tarefa',
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
                            onPress={() => {handleDeleteLoc(localization)}} // Botão de deletar
                        />
                    ),
                })
            }
        }else{
            navigation.setOptions({title:'Adicionar Tarefa'})
        }
      }, []);

    return(
        <Container>
             <TextInput
                style={styles.input}
                value={name}
                placeholder="Nome da Localização"
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                value={latitude}
                placeholder="Latitude"
                onChangeText={setLatitude}
            />
            <TextInput
                style={styles.input}
                value={longitude}
                placeholder="Longitude"
                onChangeText={setLongitude}
            />
            <TextInput
                style={styles.input}
                value={pinColor}
                placeholder="Cor do Marcador"
                onChangeText={setPinColor}
            />
            <View
            style={styles.button}
            >
                <Button
                    title="Salvar"
                    color="#f4511e"
                    onPress={handleAddLoc}
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
        padding:10
    },
    button: {
        marginTop : 30,
        width: '100%',
        alignItems: 'center'
    }
})