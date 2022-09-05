import React, { useState, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/core';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore/lite'
import { db } from '../firebase/firebase-config';
import { useIsFocused } from '@react-navigation/native';

const DataScreen = () => {
    const [itemName, setItemName] = useState('');

    const route = useRoute();
    let itemID = route.params.itemId

    async function loadData() {
        const itemRef = doc(db, "item_master", itemID);

        try {
            const itemData = await getDoc(itemRef);

            if (itemData.exists()) {
                console.log(itemData.data());
                setItemName('got the data')
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
                <Text>DataScreen</Text>
                <Text>{itemID}</Text>
                <Text>{itemName}</Text>
            </View>
        </SafeAreaView>
    )
}

export default DataScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})