import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Upload = () => {
    const [send, setSend] = useState('SEND');

    const sending = () => {
        setSend('Sending ... ')
        setTimeout(() => {
            setSend('SEND')
        }, 20000);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                disabled={send=='Sending ... '}
                style={styles.Button}
                onPress={sending}>
                <Text style={styles.text}>{send}</Text>
            </TouchableOpacity>
            <Text style={[styles.textLoading]}>{send=='Sending ... '? 'The file is loading ':''}</Text>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 7,
        backgroundColor: '#0091FF'
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    },
    textLoading: {
        textAlign: 'center',
        color: '#000',
        marginTop: 5
    }
});

export default Upload;