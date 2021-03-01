
import {
    Animated, Image,
    Keyboard,
    Text, View,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { withNavigation } from "react-navigation";
import G from '../../Gloabal';
import {

    UIActivityIndicator,
} from 'react-native-indicators';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
    ACTIVE_CELL_BG_COLOR,
    NOT_EMPTY_CELL_BG_COLOR,
} from './verifyStyle';
import { Icon } from 'native-base';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Toast from 'react-native-easy-toast'

import { useSelector, useDispatch } from 'react-redux'
import { forget_pass } from '../../Actions/forget_pass';


const { Value, Text: AnimatedText } = Animated;




const Verification = ({ navigation }) => {

    const CELL_COUNT = navigation.getParam('flag') ? 6 : 5;
    const source = require('../../Images/succSign.png');

    const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
    const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));


    const [value, setValue] = useState('');
    const [loader, setLoader] = useState(false);
    const toast = useRef();

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const propss = useSelector(state => state)
    const dispatch = useDispatch()

    const resend = async (email) => {
        await dispatch(await forget_pass({ email }))
        toast.current.show('تم إرسال الكود مرة اخرى', 1000);
    }


    useEffect(() => {
        // alert(navigation.getParam('email'))
    }, [])


    const verifyApi = async () => {
        Keyboard.dismiss()
        setLoader(true)
        try {
            let response = await axios({
                method: 'POST',
                url: `${G.BASE_URL}/api/Accounts/validate-resetandforget-token`,
                headers:
                {
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': G.authorizationKey,
                },
                data:
                {
                    token: value,
                },
            })
            console.log('---- Call Verification API ----');
            console.log(response.data);
            setLoader(false)
            toast.current.show(response.data.message, 1000);
            setTimeout(() => {
                navigation.navigate('EnterpassScreen', { 'token': value })
            }, 1000);

        } catch (error) {
            setLoader(false)
            console.log(error.response);

            if (error.response.data.message) {
                toast.current.show(error.response.data.message, 1000);
            }
            else {
                toast.current.show(error.response.data.errors.Token[0], 1000);

            }
        }

    }

    const verifyApiSignUp = async () => {
        Keyboard.dismiss()
        setLoader(true)
        try {
            let response = await axios.get(`${G.BASE_URL}/api/Accounts/verify-email?token=${value}`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': G.authorizationKey,

                    }
                })
            console.log('---- Call Verification API ----');
            console.log(response.data);
            setLoader(false)
            toast.current.show(response.data.message, 1000);
            setTimeout(() => {
                navigation.navigate('ThankUScreen')
            }, 1000);

        } catch (error) {
            setLoader(false)
            console.log(error.response);
            toast.current.show(error.response.data.message, 1000);
        }

    }




    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            borderColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, NOT_EMPTY_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#CFCFCF', ACTIVE_CELL_BG_COLOR],
                }),

            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };



        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };



    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.ViewContainer}>

                    <Icon name='arrowdown' type='AntDesign'
                        style={styles.iconStyle}
                        onPress={() => { navigation.pop() }}
                    />
                    <Text style={styles.title}>{G.SEND_CODE}</Text>
                    <Image style={styles.icon} source={source} />
                    <Text style={styles.subTitle}>
                        {G.ENTER_CODE_VERIFICATION + '\n' + navigation.getParam('email')}
                    </Text>

                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        // keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        onSubmitEditing={() => {
                            if (navigation.getParam('flag'))
                                verifyApiSignUp()
                            else
                                verifyApi()
                        }}
                        onEndEditing={() => {
                            if (value.length === CELL_COUNT) {
                                if (navigation.getParam('flag'))
                                    verifyApiSignUp()
                                else
                                    verifyApi()
                            }
                        }}
                        renderCell={renderCell}

                    />
                    {loader ? <UIActivityIndicator color={NOT_EMPTY_CELL_BG_COLOR} size={30}
                        style={styles.spinner} /> : null}

                    <View style={styles.notSend}>
                        <Text style={styles.subTitle}>
                            {G.NOT_SEND}{'  '}
                        </Text>
                        <TouchableOpacity onPress={() => resend(navigation.getParam('email'))}>
                            <Text style={[styles.subTitle, styles.trySend]}>
                                {G.TRY_SEND}{'  '}
                            </Text>
                        </TouchableOpacity>

                    </View>

                    <Toast
                        ref={toast}
                        style={{ backgroundColor: '#000' }}
                        position='bottom'
                        positionValue={200}
                        fadeInDuration={120}
                        fadeOutDuration={1000}
                        textStyle={{ color: 'white', fontFamily: G.Regular }}
                    />
                </View>


            </ScrollView>
        </>
    );
};

export default withNavigation(Verification);
