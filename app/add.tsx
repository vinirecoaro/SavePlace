import { useState } from "react";
import { Container } from "./styles";
import {Text, TextInput, StyleSheet, Button, View} from 'react-native'


export default function AddScreen(){
    const [name, setName] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [pinColor, setPinColor] = useState('')

    const handleAddLoc = () => {

    }

    return(
        <Container>
             <TextInput
                style={styles.input}
                value={name}
                placeholder="Nome da Localização"
            />
            <TextInput
                style={styles.input}
                value={latitude}
                placeholder="Latitude"
            />
            <TextInput
                style={styles.input}
                value={longitude}
                placeholder="Longitude"
            />
            <TextInput
                style={styles.input}
                value={pinColor}
                placeholder="Cor do Marcador"
            />
            <View
            style={styles.button}
            >
                <Button
                    title="Adicionar"
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