import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth } from '../firebase'

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
                <Text>Requesting for camera permission</Text>
            </View>)
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera</Text>
                <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
            </View>)
    }

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>

            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 610, width: 340 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && <Button title={'Scan again'} onPress={() => setScanned(false)} />}

            {/* <input style={styles.input_box} value={text}></input> */}
            <TextInput
                style={styles.input}
                onChangeText={setText}
                // value={text}
                placeholder="Product/EAN Code"
            />
            <TouchableOpacity
                // onPress={handleSignOut}
                style={styles.search_button}
            >
                <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '40%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 5,
    },
    search_button: {
        backgroundColor: '#0782F9',
        width: '30%',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 340,
        width: 340,
        overflow: 'hidden',
        borderRadius: 20,
    },
    input: {
        backgroundColor: 'white',
        minWidth: '60%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
})