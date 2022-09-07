import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/core';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ToastAndroid,
    Linking,
    TouchableOpacity
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../firebase/firebase-config';
import { useIsFocused } from '@react-navigation/native';

const DataScreen = () => {
    const [itemName, setItemName] = useState('');
    const [itemNo, setItemNo] = useState('');
    const [itemBarcode, setItemBarcode] = useState('');

    const route = useRoute();
    let itemID = route.params.itemId

    const itemURL = "https://www.pantaloons.com/c/search?search_query=" + itemID;

    const OpenURLButton = () => {
        Linking.openURL(itemURL);
    };

    async function loadData() {
        const itemRef = doc(db, "item_master", itemID);

        try {
            const itemData = await getDoc(itemRef);

            if (itemData.exists()) {
                setItemName(itemData.data().art_desc);
                setItemNo(itemData.data().art_no);
                setItemBarcode(itemData.data().barcode);
            }
            else {
                alert("Item Does Not Exist")
            }
        }
        catch (error) {
            ToastAndroid.show("No such product!", ToastAndroid.SHORT);
            alert("Product Not Found")
        }
    };

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            // alert('In isFocused', isFocused);
            loadData();
        }
    }, [isFocused]);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.headerText}>{itemName}</Text>
                <Text>Item Number: {itemNo}</Text>
                <Text>Item Barcode: {itemBarcode}</Text>
                <TouchableOpacity
                    style={styles.productURLButton}
                    onPress={() => OpenURLButton()}
                >
                    <Text style={styles.productURLText}>View in pantaloons.com</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default DataScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: '600',
        margin: 18,
    },

    productURLButton: {
        margin: 20,
        backgroundColor: '#4bb1b6',
        padding: 12,
        borderRadius: 12,
        alignSelf: 'center',
    },

    productURLText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})