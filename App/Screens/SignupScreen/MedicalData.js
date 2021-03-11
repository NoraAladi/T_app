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
import { Get_Dependant_Health } from '../../Actions/getDependant_Health_Action';

import { connect } from 'react-redux'

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
            flag: true
        };
    }


    async setDefault() {
        await AsyncStorage.setItem('weight', String(this.state.weight))
        await AsyncStorage.setItem('height', String(this.state.height))
        await AsyncStorage.setItem('smoking', String(this.state.smoking))
        await AsyncStorage.setItem('married', String(this.state.married))
        await AsyncStorage.setItem('pregnant', String(this.state.pregnant))

    }
    async componentDidMount() {
        if (this.props.dependentCode) {
            //call get Api
            await this.props.Get_Dependant_Health('dependentCode', this.props.dependentCode)
            await this.setState({
                height: this.props.dependantHealth.height,
                weight: this.props.dependantHealth.weight,
                smoking: this.props.dependantHealth.smoker == true ? 0 : 1,
                married: this.props.dependantHealth.married == true ? 0 : 1,
                pregnant: this.props.dependantHealth.healthProfile.pregnant == true ? 0 : 1,

            })
        }

        else if (this.props.dependentId) {
            //call get Api
            await this.props.Get_Dependant_Health('dependentId', this.props.dependentId)
          //  alert(this.props.dependantHealth)
            await this.setState({
                height: this.props.dependantHealth.height,
                weight: this.props.dependantHealth.weight,
                smoking: this.props.dependantHealth.smoker == true ? 0 : 1,
                married: this.props.dependantHealth.married == true ? 0 : 1,
                pregnant: this.props.dependantHealth.healthProfile.pregnant == true ? 0 : 1,

            })
        }
        await this.setState({ flag: false })
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
                            style={[styles.input]}
                            defaultValue={this.state.weight}
                        />
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
                            style={[styles.input]}
                            defaultValue={this.state.height}

                        />
                    </View>
                </View>
                {this.state.flag && this.props.dependentCode ||
                    this.state.flag && this.props.dependentId ?
                    null :
                    <View>

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
                                    initial={this.state.smoking}
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
                                    initial={this.state.married}
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
                                        initial={this.state.pregnant}
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

                                <View>
                                <Text style={[styles.login, { marginTop: hp('2'), fontSize: 18, }]}>
                                    {'هل انت مرضع ...'}
                                </Text>

                                <View style={{
                                    flexDirection: 'row',
                                    transform: [{ rotate: '180deg' }],
                                    paddingHorizontal: 40,
                                    marginTop: 10,
                                }}>
                                    <RadioForm
                                        radio_props={radio_props_three}
                                        initial={this.state.pregnant}
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
                            </View>

                            : null}
                    </View>
                }
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        dependantHealth: state.dependantHealth.dependantHealth
    }
}

export default connect(mapStateToProps, { Get_Dependant_Health })(withNavigation(UserData));
