import TextField from "@/components/TextField";
import env from "@/constants/env";
import { UserActionType, UserContext, UserDispatchContext } from "@/store/UserStore";
import { ButtonConstants, FontConstants, ScreenConstants } from "@/styles/Global.style";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Alert } from "react-native";
import { Text, View} from "native-base"


export default function RegisterScreen(){

    const userAuth = useContext(UserContext)
    const userAuthDispatch = useContext(UserDispatchContext)

    const [isLoading, setLoading] = useState(false);
    const [inputUser, setInputUser] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputUserFeedback, setInputUserFeedback] = useState<string>("");
    const [inputPasswordFeedback, setInputPasswordFeedback] = useState<string>("");

    const registerSubmit = async () => {
        setLoading(true);
        try {
            setInputUserFeedback("");
            setInputPasswordFeedback("");
            if (inputUser && inputPassword) {
                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;
                const response = await fetch(`${apiUrl}/v1/accounts:signUp?key=${apiKey}`, {
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
                        type: UserActionType.REGISTRAR,
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

    return(
        <View style={styles.loginContainer}>
            <Text style={styles.loginHeader}>Cadastro</Text>
            <View style={styles.textField}>
                <TextField
                    testID='register-input-username'
                    placeholder='Usuário'
                    value={inputUser}
                    onChangeText={setInputUser}
                    feedback={inputUserFeedback}
                    editable={!isLoading}
                />
            </View>
            <TextField
                testID='register-input-password'
                placeholder='Senha'
                value={inputPassword}
                onChangeText={setInputPassword}
                feedback={inputPasswordFeedback}
                isPassword
                editable={!isLoading}
            />
            {!isLoading && <Pressable style={styles.loginBtnSubmit} onPress={registerSubmit}>
                <Text style={styles.loginBtnSubmitLabel}>Cadastrar</Text>
            </Pressable>}
            {isLoading && <ActivityIndicator size='large'/>}
        </View>
    )

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