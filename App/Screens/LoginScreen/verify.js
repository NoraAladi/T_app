
import {
    Animated, Image,
    Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
import { ScrollView } from 'react-native-gesture-handler';

const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 5;
const source = require('../../Images/succSign.png');

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));


const Verification = ({ navigation }) => {
    const [value, setValue] = useState('');
    const [loader, setLoader] = useState(false);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

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
                <View style={{
                    flex: 1, padding: 24,
                    marginTop: Platform.OS == "ios" ? hp('5%') : null
                }}>

                    <Icon name='arrowdown' type='AntDesign'
                        style={{ fontsize: 25, marginLeft: 'auto', }}
                        onPress={() => { navigation.pop() }}
                    />
                    <Text style={styles.title}>{G.SEND_CODE}</Text>
                    <Image style={styles.icon} source={source} />
                    <Text style={styles.subTitle}>
                        {G.ENTER_CODE_VERIFICATION}
                    </Text>

                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        onEndEditing={() => {
                            if (value.length === 5) {
                                setLoader(true)
                                setTimeout(() => {
                                    setLoader(false)
                                    navigation.navigate('EnterpassScreen')
                                }, 3000);
                            }
                            else { }
                        }}
                        renderCell={renderCell}

                    />
                    {loader ? <UIActivityIndicator color={NOT_EMPTY_CELL_BG_COLOR} size={30}
                        style={{ marginTop: 50, }} /> : null}

                    <View style={{
                        flexDirection: 'row-reverse',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}>
                        <Text style={styles.subTitle}>
                            {G.NOT_SEND}{'  '}
                        </Text>
                        <Text style={[styles.subTitle, {
                            fontFamily: Platform.OS == "android" ? G.Bold : G.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, 
                            color: G.Bold_blue
                        }]}>
                            {G.TRY_SEND}{'  '}
                        </Text>
                    </View>

                </View>

            </ScrollView>
        </>
    );
};

export default withNavigation(Verification);
