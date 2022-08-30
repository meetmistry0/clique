import { useNavigation } from '@react-navigation/core';
import { StatusBar } from "expo-status-bar";
import React, { useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView,
    ToastAndroid,
} from 'react-native'
import { authentication } from '../firebase/firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useNavigation()

    const signInUser = () => {
        signInWithEmailAndPassword(authentication, email, password)
            .then((res) => {
                // console.log(res)
                navigation.replace("Home")
            })
            .catch((error) => {
                console.log(error)
                if (error.code === 'auth/wrong-password') {
                    ToastAndroid.show("Wrong password entered!", ToastAndroid.SHORT);
                }
                if (error.code === 'auth/user-not-found') {
                    ToastAndroid.show("Wrong email entered!", ToastAndroid.SHORT);
                }
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require("../assets/clique_logo.png")} />

            <StatusBar style="auto" />

            <View style={styles.inputView}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.loginInput}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.loginInput}
                    secureTextEntry={true}
                />
            </View>

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={signInUser} >
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },

    image: {
        marginTop: 100,
        marginBottom: 80,
    },


    inputView: {
        width: "80%",
    },

    loginInput: {
        marginTop: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderWidth: 1.2,
        borderRadius: 12,
        borderColor: '#d1d5db',
    },

    loginBtn: {
        marginTop: 20,
        backgroundColor: '#4bb1b6',
        width: '50%',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: "center",
    },

    loginText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})