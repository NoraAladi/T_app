import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, AppState, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import styleSignUp from '../SignupScreen/styleSignUp';
import RadioForm from 'react-native-simple-radio-button';
import HeaderNav from '../../Navigation/HeaderNav';


var radio_props_one = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];
var radio_props_two = [
    { label: g.YES, value: 0 },
    { label: g.NO, value: 1 }
];

class EditMedicalData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: 0,
            height: 0,
            smoking: radio_props_one[0].label,
            married: radio_props_two[0].label,
        };
    }


    render() {
        return (
            <View style={{ zIndex: -1 }}>
                <HeaderNav title={g.EDIT_MEDICAL} />



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

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input]} />
                    </View>
                </View>

                {/**diseases */}
                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.DISEASE}
                    </Text>

                    <TouchableOpacity
                        style={[styleSignUp.dropDownView,
                        {
                            alignItems: 'center', justifyContent: 'center',
                        }]}
                        onPress={() => {
                            //this.props.handlePress()
                        }}
                    >
                        <Text style={[styleSignUp.dropDownTxt,
                        { textAlign: 'center', 
                        fontFamily: Platform.OS == "android" ?  g.Bold  : g.Regular , fontWeight : Platform.OS == "ios" ? "800": null ,
                         color: g.Bold_blue }]}
                        >
                            {g.DISEASE_SELECTED}
                        </Text>

                    </TouchableOpacity>
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
                                this.setState({ smoking: radio_props_one[value].label })
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
                                this.setState({ married: radio_props[value].label })
                            }}
                        />
                    </View>
                </View>

                <TouchableOpacity style={[styles.btn, { marginTop: hp('6') }]}>
                    <Text style={[styles.txt_btn,]}>
                        {g.SAVE}</Text>
                </TouchableOpacity>

            </View>
        );

    }
}
export default withNavigation(EditMedicalData);
