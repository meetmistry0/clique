import React from 'react';
import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import {
    StyleSheet, Text, View, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore/lite'
import { db } from '../firebase/firebase-config';

const DataScreen = () => {
    const route = useRoute();
    let itemID = route.params.itemId

    const ItemData = async () => {

        const itemRef = doc(db, "item_master", `${route.params.itemId}`);
        const itemData = await getDoc(itemRef);

        if (itemData.exists()) {
            // console.log("Document data:", itemData.data());
            ToastAndroid.show("data found", ToastAndroid.SHORT);
        } else {
            ToastAndroid.show("No such product!", ToastAndroid.SHORT);
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            alert(itemID);
            return () => {
                alert('Screen was unfocused');
                // Useful for cleanup functions
            };
        }, [])
    );


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text>DataScreen</Text>
                <Text>{itemID}</Text>
                <TouchableOpacity
                    onPress={ItemData}
                    style={styles.searchButton}
                >
                    <Text style={styles.searchButtonText}>get data</Text>
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

    searchButton: {
        marginTop: 12,
        marginBottom: 12,
        backgroundColor: '#000000',
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
})