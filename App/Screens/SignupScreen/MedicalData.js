import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import styleSignUp from './styleSignUp';
import RadioForm from 'react-native-simple-radio-button';


var radio_props_one = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var radio_props_two = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var radio_props_three = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];

class UserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: 0,
            height: 0,
            smoking: radio_props_one[0].value,
            married: radio_props_two[0].value,
            elevation: true,
            pregnant: radio_props_three[0].value,
        };
    }


    async setDefault() {
        await AsyncStorage.setItem('weight', String(this.state.weight))
        await AsyncStorage.setItem('height', String(this.state.height))
        await AsyncStorage.setItem('smoking', this.state.smoking)
        await AsyncStorage.setItem('married', this.state.married)
        await AsyncStorage.setItem('pregnant', this.state.pregnant)

    }
    async componentDidMount() {
        await this.setDefault()
    }



    render() {

        return (
            <View style={{ zIndex: -1 }}>

                <Text style={[styles.login, { marginTop: hp('2') }]}>
                    {g.MEDICAL_DATA}
                </Text>

                {/**weight */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.WEIGHT}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.WEIGHT + ' KG'}
                            keyboardType={'number-pad'}
                            onChangeText={(weight) => {
                                this.setState({
                                    weight: weight,
                                })

                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('weight', String(this.state.weight))
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>

                {/**height */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.HEIGHT}
                    </Text>

                    <View style={[styles.viewInput]}>

                        <TextInput
                            placeholder={g.HEIGHT + ' CM'}
                            keyboardType={'number-pad'}
                            onChangeText={(height) => {
                                this.setState({
                                    height: height,
                                })

                            }}
                            onEndEditing={async () => {
                                await AsyncStorage.setItem('height', String(this.state.height))
                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>



                {/*****Smoking */}
                <View>
                    <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                        {g.U_SMOKING}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        transform: [{ rotate: '180deg' }],
                        paddingHorizontal: 40,
                        marginTop: 10,
                    }}>
                        <RadioForm
                            radio_props={radio_props_one}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonSize={11}
                            labelStyle={[styleSignUp.dropDownTxt,
                            {
                                transform: [{
                                    rotate: '180deg',
                                }],
                                paddingHorizontal: 10,


                            }]}
                            selectedButtonColor={'red'}
                            buttonColor={'#000'}
                            animation={false}
                            onPress={async (value) => {
                                await AsyncStorage.setItem('smoking', String(value))
                            }}
                        />
                    </View>
                </View>

                {/***Married */}
                <View>
                    <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                        {g.U_MARRIED}
                    </Text>

                    <View style={{
                        flexDirection: 'row',
                        transform: [{ rotate: '180deg' }],
                        paddingHorizontal: 40,
                        marginTop: 10,
                    }}>
                        <RadioForm
                            radio_props={radio_props_two}
                            initial={0}
                            formHorizontal={true}
                            labelHorizontal={true}
                            buttonSize={11}
                            labelStyle={[styleSignUp.dropDownTxt,
                            {
                                transform: [{
                                    rotate: '180deg',
                                }],
                                paddingHorizontal: 10,


                            }]}
                            selectedButtonColor={'red'}
                            buttonColor={'#000'}
                            animation={false}
                            onPress={async (value) => {
                                await AsyncStorage.setItem('married', String(value))
                            }}
                        />
                    </View>
                </View>




                {/***حامل  */}
                {this.props.gender != 1 ?
                    <View>
                        <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                            {g.pregnant}
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            transform: [{ rotate: '180deg' }],
                            paddingHorizontal: 40,
                            marginTop: 10,
                        }}>
                            <RadioForm
                                radio_props={radio_props_three}
                                initial={0}
                                formHorizontal={true}
                                labelHorizontal={true}
                                buttonSize={11}
                                labelStyle={[styleSignUp.dropDownTxt,
                                {
                                    transform: [{
                                        rotate: '180deg',
                                    }],
                                    paddingHorizontal: 10,


                                }]}
                                selectedButtonColor={'red'}
                                buttonColor={'#000'}
                                animation={false}
                                onPress={async (value) => {
                                    await AsyncStorage.setItem('pregnant', String(value))
                                }}
                            />
                        </View>
                    </View>

                    : null}

            </View>
        );
    }
}
export default withNavigation(UserData);
