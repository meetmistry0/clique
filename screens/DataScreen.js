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
    TouchableOpacity,
    Image
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../firebase/firebase-config';
import { useIsFocused } from '@react-navigation/native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const DataScreen = () => {
    const [itemName, setItemName] = useState('');
    const [itemArticle, setItemArticle] = useState('');
    const [itemBarcode, setItemBarcode] = useState('');
    const [itemColor, setItemColor] = useState('');
    const [itemMcCode, setItemMcCode] = useState('');
    const [itemYear, setItemYear] = useState('');

    const [url, setUrl] = useState();

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
                setItemArticle(itemData.data().art_no);
                setItemBarcode(itemData.data().barcode);
                setItemColor(itemData.data().color);
                setItemMcCode(itemData.data().mc_code);
                setItemYear(itemData.data().season_year);
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

        const image_func = async () => {
            const storage = getStorage();
            const reference = ref(storage, '/1.jpg');
            await getDownloadURL(reference).then((x) => {
                setUrl(x);
            });
        }

        image_func();
    }, [isFocused]);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.headerText}>{itemName}</Text>
                <Image style={styles.productImage}
                    source={{ uri: url }}
                />
                <Text style={styles.subText}>Article: {itemArticle}</Text>
                <Text style={styles.subText}>Barcode: {itemBarcode}</Text>
                <Text style={styles.subText}>Color: {itemColor}</Text>
                <Text style={styles.subText}>MC Code: {itemMcCode}</Text>
                <Text style={styles.subText}>Season Year: {itemYear}</Text>
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

    subText: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '500',
        margin: 8,
        marginLeft: 26,
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

    productImage: {
        width: '45%',
        height: '45%',
        padding: 2,
        margin: 12,
        borderRadius: 12,
        alignSelf: 'center',
    }
})