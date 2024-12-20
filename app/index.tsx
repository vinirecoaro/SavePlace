import { ActivityIndicator, Alert, Image, Pressable, StyleSheet} from 'react-native';
import { Text, View} from "native-base"
import TextField from '@/components/TextField';
import { useContext, useState } from 'react';
import { router } from 'expo-router';
import { ButtonConstants, ScreenConstants, FontConstants, IconConstants } from '@/styles/Global.style';
import { UserActionType, UserContext, UserDispatchContext } from '@/store/UserStore';
import env from '@/constants/env';

export default function LoginScreen() {

    const userAuth = useContext(UserContext)
    const userAuthDispatch = useContext(UserDispatchContext)

    const [isLoading, setLoading] = useState(false);
    const [inputUser, setInputUser] = useState<string>( userAuth?.email ?? "");
    const [inputPassword, setInputPassword] = useState<string>(userAuth?.password ??"");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");


    const loginSubmit = async () => {
        setLoading(true);
        try {
            setInputUserFeedback("");
            setInputPasswordFeedback("");
            if (inputUser && inputPassword) {
                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;
                const response = await fetch(`${apiUrl}/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: inputUser,
                        password: inputPassword,
                        returnSecureToken: true,
                    })
                });
                const { status } = response;
                if (status == 200) {
                    const body = await response.json();
                    // Alert.alert(`Usuário ${body.email}`);
                    if (!userAuthDispatch) {
                        throw new Error("UserDispatchContext is not provided");
                    }
                    userAuthDispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: body.email,
                            password: inputPassword,
                            token: body.idToken,
                        }
                    });
                    router.replace('/map');
                } else if (status == 400) {
                    const body = await response.json();
                    Alert.alert(`${body.error.message}`);
                } else {
                    Alert.alert(`Status ${status}`);
                }
            } else {
                if (!inputUser) setInputUserFeedback("Preencha este campo.");
                if (!inputPassword) setInputPasswordFeedback("Preencha este campo.");
            }
        } catch (error) {
            const err = error as { message: string };
            Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    }

    const goToRegister = ()=>{
        router.push("/register")
    }

    return (
        <View style={styles.loginContainer}>
            <Image style={styles.loginImageIcon} resizeMode='contain' source={IconConstants.appIcon} />
            <Text style={styles.loginHeader}>Acesso</Text>
            <View style={styles.textField}>
                <TextField
                    testID='login-input-username'
                    placeholder='Usuário'
                    value={inputUser}
                    onChangeText={setInputUser}
                    feedback={inputUserFeedback}
                    editable={!isLoading}
                />
            </View>
            <TextField
                testID='login-input-password'
                placeholder='Senha'
                value={inputPassword}
                onChangeText={setInputPassword}
                feedback={inputPasswordFeedback}
                isPassword
                editable={!isLoading}
            />
            {!isLoading && <Pressable style={styles.loginBtnSubmit} onPress={loginSubmit}>
                <Text style={styles.loginBtnSubmitLabel}>Acessar</Text>
            </Pressable>}
            {isLoading && <ActivityIndicator size='large'/>}
            <Text onPress={goToRegister}>Não tem conta? Cadastre-se</Text>
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