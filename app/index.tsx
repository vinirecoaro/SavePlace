import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import TextField from '@/components/TextField';
import { useState } from 'react';
import { router } from 'expo-router';
import { ButtonConstants, ScreenConstants, FontConstants } from '@/styles/Global.style';

export default function LoginScreen() {

    const [inputUser, setInputUser] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");

    const loginSubmit = () => {
        setInputUserFeedback("");
        setInputPasswordFeedback("");
        if (inputUser && inputPassword) {
            router.replace('/map');
        } else {
            if (!inputUser) setInputUserFeedback("Preencha este campo.");
            if (!inputPassword) setInputPasswordFeedback("Preencha este campo.");
        }
    }

    return (
        <View style={styles.loginContainer}>
            <Image style={styles.loginImageIcon} resizeMode='contain' source={require('@/assets/images/appIcon.png')} />
            <Text style={styles.loginHeader}>Acesso</Text>
            <View style={styles.textField}>
                <TextField
                    placeholder='Usuário'
                    value={inputUser}
                    onChangeText={setInputUser}
                    feedback={inputUserFeedback}
                />
            </View>
            <TextField
                placeholder='Senha'
                value={inputPassword}
                onChangeText={setInputPassword}
                feedback={inputPasswordFeedback}
                isPassword
            />
            <Pressable style={styles.loginBtnSubmit} onPress={loginSubmit}>
                <Text style={styles.loginBtnSubmitLabel}>Acessar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 70,
        alignItems: 'center',
        backgroundColor: ScreenConstants.backgroundColor
    },
    loginImageIcon: {
        height: 200,
    },
    loginHeader: {
        fontSize: FontConstants.sizeTitle,
        padding: 10,
        paddingTop: 70,
        fontWeight: '700',
        color: FontConstants.color,
    },
    textField:{
        paddingTop: 30,
        width: '100%',
        alignItems: 'center'
    },
    loginBtnSubmit: {
        padding: 10,
        marginVertical: 50,
        backgroundColor: ButtonConstants.backgroundColor,
        width: "50%",
        borderRadius: 10,
        shadowColor: "#343a40",
        shadowOffset: {
            height: 1,
            width: 1,
        },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 4,
    },
    loginBtnSubmitLabel: {
        fontSize: 20,
        textAlign: 'center',
        color: ButtonConstants.textColor,
    }
})