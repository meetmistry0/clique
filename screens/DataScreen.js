import { StatusBar } from "expo-status-bar";
import { useRoute } from '@react-navigation/core';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const DataScreen = () => {
    const route = useRoute();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text>DataScreen</Text>
                <Text>{route.params.itemId}</Text>
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