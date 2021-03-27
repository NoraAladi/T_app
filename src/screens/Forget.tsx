import React, {FC, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import {Colors, Fonts, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Input from "../components/textInputs/Input";
import AuthHeader from "../components/header/AuthHeader";
import {useNavigation} from "@react-navigation/native";
import Touchable from "../components/touchables/Touchable";


const Forget: FC = () => {

    const [email, setEmail] = useState('');

    const {t} = useTranslation();
    const {navigate} = useNavigation();
    return (
        <Container style={styles.container}>
            <AuthHeader/>
            <Content noPadding style={styles.contentContainer}>
                <View style={styles.sectionTitleContainer}>
                    <Text style={styles.mainTitle}>{t('Enter Email / Mobile Number ')}</Text>
                    <Text style={styles.sectionTitle}>{t('And We\'ll Send You The Instructions')}</Text>
                </View>
                <View style={styles.inputsContainer}>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Phone Number / Email Address</Text>
                        <Input
                            textInputContainer={styles.textInput}
                            contentContainerStyle={styles.contentContainerStyle}
                            options={{
                                onChangeText: (value) => {
                                    setEmail(value)
                                },
                                value: email,
                            }}
                        />
                    </View>

                    <View style={styles.submitContainer}>
                        <Touchable>
                            <View style={styles.buttonContent}>
                                <Text style={styles.submitTitle}>{t('Next')}</Text>
                            </View>
                        </Touchable>
                    </View>

                </View>
            </Content>
        </Container>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.sacandAppBackgroundColor,
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.sacandAppBackgroundColor,
        flex: 1,
    },
    mainTitle: {
        color: Colors.dark,
        fontFamily: Fonts.bold,
        fontSize: Pixel(40),
        marginVertical: Pixel(20)
    },
    submitContainer: {
        height: Pixel(100),
        borderRadius: 30,
        backgroundColor: Colors.minColor,
        overflow: 'hidden',
        marginVertical: Pixel(80)
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    submitTitle: {
        fontFamily: Fonts.bold,
        fontSize: Pixel(40),
    },
    inputsContainer: {
        paddingHorizontal: Pixel(20),
        paddingVertical: Pixel(25),
        paddingBottom: 40
    },
    inputContainer: {
        marginVertical: 7
    },
    inputLabel: {
        color: '#4D4D4D',
        fontFamily: Fonts.medium,
        marginBottom: Pixel(17)
    },
    textInput: {
        height: Pixel(100),
        padding: 0,
        fontFamily: Fonts.bold,
        fontSize: Pixel(33),
        color: '#070707'
    },
    contentContainerStyle: {
        borderRadius: 14,
        borderWidth: 0,
        padding: 0,
        paddingHorizontal: 15
    },
    sectionTitleContainer: {
        marginVertical: 10
    },
    sectionTitle: {
        fontFamily: Fonts.medium,
        color: '#4D4D4D',
        marginLeft: 10
    }

});

export default Forget;
