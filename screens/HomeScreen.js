import { useNavigation } from '@react-navigation/core';
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ToastAndroid,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { authentication } from '../firebase/firebase-config'
import { signOut } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../firebase/firebase-config';

const HomeScreen = () => {
    const navigation = useNavigation()

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setCode] = useState('');

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
    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        setCode(data)
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
                <Text style={{ margin: 10 }}>Camera access is not provided. Please check the app permissions.</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    const signOutUser = () => {
        signOut(authentication)
            .then(() => {
                navigation.replace("Login")
            })
            .catch((err) => {
                console.log("ERROR", err)
            })
    }


    async function GetData() {
        const itemMasterRef = doc(db, "item_master", `${text}`);
        const itemMasterSnap = await getDoc(itemMasterRef);

        if (itemMasterSnap.exists()) {
            // console.log("Document data:", itemMasterSnap.data());
            navigation.navigate('Product Details', {
                itemId: `${text}`
            });
        } else {
            ToastAndroid.show("No such product!", ToastAndroid.SHORT);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setCode(text)}
                    value={text}
                    placeholder="Enter Product/EAN Code"
                />
                <TouchableOpacity
                    onPress={GetData}
                    style={styles.searchButton}
                >
                    <Text style={styles.searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.scanCodeText}>Scan Barcode</Text>

            <View style={styles.barcodeBox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 610, width: 340 }} />
            </View>

            {scanned &&
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    style={styles.searchAgainButton}>
                    <Text style={styles.searchAgainText}>Search Again</Text>
                </TouchableOpacity>
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

    scanCodeText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
        padding: 8,
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
        fontSize: 20,
        fontWeight: '600',
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

    searchAgainButton: {
        marginTop: 20,
        backgroundColor: '#ffc107',
        padding: 16,
        borderRadius: 12,
        alignSelf: 'center',
    },

    searchAgainText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },

})