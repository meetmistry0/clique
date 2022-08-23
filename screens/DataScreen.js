import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const DataScreen = () => {
    const route = useRoute();
    let itemID = route.params.itemId

    useFocusEffect(
        React.useCallback(() => {
            alert(itemID);
            return () => {
                // alert('Screen was unfocused');
                // Do something when the screen is unfocused
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