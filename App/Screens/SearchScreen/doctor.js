import style from './style';
import styleSignUp from '../SignupScreen/styleSignUp';
import styles from '../LoginScreen/style';

import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, TextInput, FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

import CountryRegion from '../../Navigation/CountryRegion';
import { Get_Specialist } from '../../Actions/get_specialist';
import { connect } from 'react-redux';
import ScrollPicker from "react-native-wheel-scrollview-picker";


class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpecialist: false,
            specialist: 'اختر التخصص',
            doctor_name: '',
            error: '',
            special_id: 0,
            cityId: 1,
            countryId: 1,
            specialistArray: []
        }
    }

    getCountryAndCityIds = async (countryId, cityId) => {
        await this.setState({
            cityId: cityId,
            countryId: countryId
        })
    }
    async componentDidMount() {
        if (this.props.specialist == '') {
            await this.props.Get_Specialist()

        }
        //  this.setState({ special_id: this.props.specialist[0].id });

        this.props.specialist.map(item => {
            this.state.specialistArray.push(item.specialityNameAr)
        })
        // var lastValue = this.state.specialistArray.pop()
        // this.state.specialistArray.unshift(lastValue)

        // await this.setState({
        //     specialist: this.props.specialist[0].specialityNameAr
        // })

    }


    render() {
        return (

            <View>
                <Text style={[style.username1, { marginTop: hp('2%'), textAlign: 'right' }]}>
                    {g.DOCTOR_NAME}
                </Text>

                <View style={style.viewInput}>
                    <TextInput
                        onChangeText={(doctor_name) => this.setState({ doctor_name })}
                        placeholder={g.DOCTOR_NAME}
                        placeholderTextColor={g.Light_Gray}
                        style={style.input} />
                </View>

                <View>
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {'التخصص'}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            this.setState({
                                showSpecialist: !this.state.showSpecialist
                            })
                        }}>
                        <View style={[styleSignUp.dropDownView, { width: wp('90') }]}>
                            <Text style={[styleSignUp.dropDownTxt]}>{this.state.specialist}</Text>
                            <Icon name={this.state.showSpecialist ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                style={styleSignUp.dropDownIcon}

                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {this.state.showSpecialist ?
                    <ScrollPicker
                        ref={(sp) => { this.sp = sp }}
                        dataSource={this.state.specialistArray}
                        selectedIndex={this.state.special_id - 2}
                        itemHeight={40}
                        wrapperHeight={100}
                        wrapperWidth={'45%'}
                        highlightColor={g.Light_Gray}
                        onValueChange={async (data, selectedIndex) => {
                            await this.setState({
                                specialist: data,
                                // showSpecialist: false,
                                special_id: this.props.specialist[selectedIndex].id
                            })
                        }}
                    />

                    : null}

                <CountryRegion callApi={this.getCountryAndCityIds} />


                <TouchableOpacity style={style.btn} onPress={() => {
                    console.log(this.state.special_id);
                    this.props.navigation.navigate('SearchListScreen', {
                        'TITLE': g.DOCTOR_TITLE, 'IREA': g.IREA,
                        'icon': require('../../Images/listone.png'),
                        'Filter_name': this.state.doctor_name,
                        'Special': this.state.special_id,
                    })

                }}>
                    <Text style={style.txt_btn}>{g.SEARCH}</Text>
                </TouchableOpacity>
                <Text style={[style.error, { marginTop: -30, marginBottom: 50 }]}>{this.state.error}</Text>
            </View>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.specialist.loading,
        specialist: state.specialist.specialist,

    };
};

export default connect(mapStateToProps, { Get_Specialist })(
    withNavigation(Doctor),
);