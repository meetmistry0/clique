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

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setText(text)}
                    value={text}
                    placeholder="Product/EAN Code"
                />
                <TouchableOpacity
                    onPress={onSearchClick}
                    style={styles.searchButton}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.barcodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 610, width: 340 }} />
            </View>
            <Text style={styles.mainText}>Code: {text}</Text>

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
                style={styles.logoutButton}
            >
                <Text style={styles.logoutButtonText}>Sign out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 12,
    },

    searchInput: {
        backgroundColor: 'white',
        minWidth: '66%',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        marginTop: 12,
        marginBottom: 12,
    },

    searchButton: {
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: '#4bb1b6',
        width: '24%',
        borderRadius: 12,
        height: 48,
        alignItems: 'center',
        justifyContent: "center",
    },

    searchButtonText: {
        color: 'white',
        fontWeight: '600',
    },

    barcodeBox: {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
    },

    mainText: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '500',
        margin: 18,
    },

    logoutButton: {
        marginTop: 20,
        backgroundColor: '#c23a22',
        width: '30%',
        padding: 14,
        borderRadius: 12,
        alignSelf: 'center',
        alignItems: 'center',
    },

    logoutButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})