import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

const DataScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View>
                <Text>DataScreen</Text>
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