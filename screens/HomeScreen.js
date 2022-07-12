import { useNavigation } from '@react-navigation/core';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { authentication } from '../firebase/firebase-config'
import { signOut } from "firebase/auth";

const HomeScreen = () => {
    const navigation = useNavigation()

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('');

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    };

    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting permission for camera access...</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access provided to camera. Please check your permissions.</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    const signOutUser = () => {
        signOut(authentication)
            .then((re) => {
                console.log("Signed out", re)
                navigation.replace("Login")
            })
            .catch((err) => {
                console.warn("ERROR", err)
            })
    }


    // GO TO THE NEXT SCREEN WHICH SHOWS DATA WITH THIS FUNCTION
    const onSearchClick = () => {
        navigation.replace("Data")
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.body}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setText(text)}
                        value={text}
                        placeholder="Product/EAN Code"
                    />
                    <TouchableOpacity
                        onPress={onSearchClick}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.barcodeBox}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={{ height: 610, width: 340 }} />
                </View>
                <Text style={styles.mainText}>{text}</Text>

                {scanned &&
                    <Button
                        onPress={() => setScanned(false)}
                        style={styles.searchButton}
                        title="Scan Again"
                        color='#0782F9'
                    />
                }

                <TouchableOpacity
                    onPress={signOutUser}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        // alignItems: 'center',
    },

    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    searchButton: {
        alignItems: 'center',
        backgroundColor: '#0782F9',
        padding: 8,
        borderRadius: 18,
    },

    button: {
        backgroundColor: '#0782F9',
        width: '40%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    mainText: {
        fontSize: 16,
        margin: 18,
    },

    barcodeBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
    },

    input: {
        backgroundColor: 'white',
        minWidth: '60%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
    },
})