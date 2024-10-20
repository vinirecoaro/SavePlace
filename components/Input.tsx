
import {TextInput, Text, StyleSheet, View} from 'react-native'
import {useState, useEffect} from 'react'

type InputProps = {
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
  };

export default function Input({placeholder, value, setValue} : InputProps){
    const [isValid, setIsValid] = useState(false)
    useEffect(() => {
        const valid = value.length > 4 
        setIsValid(valid)
      })
    return(
        <View style={styles.container}>
            <TextInput 
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={setValue}
            ></TextInput>
            {
                !isValid && (
                    <Text style={styles.errorMessage}>
                        Campo inválido
                    </Text>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        maxWidth:250,
    },
    input: {
      borderWidth: 1,
      borderColor:'#ccc',
      marginTop: 10,
      borderRadius: 5,
      paddingTop: 5,
      paddingBottom: 5,
      paddingStart: 8,
      paddingEnd: 8
    },
    errorMessage:{
        color:'red'
    }

  });