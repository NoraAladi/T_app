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

const specialists = ['السلام',
    'مدينة نصر',
    'الهرم',
    'مصر الجديدة',
    'السيدة عائشة',
    'المهندسين'
]
class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpecialist: false,
            specialist: '',
            doctor_name: '', error: '', special_id: 1
        }
    }
    async componentDidMount() {
        await this.props.Get_Specialist()
        // await this.setState({
        //     specialist: this.props.specialist[0].specialityNameAr
        // })

    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.specialist !== this.props.specialist) {
            this.setState({ specialist: this.props.specialist[0].specialityNameAr });
        }
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
                        {'امراض باطنة'}
                    </Text>
                    <View style={[styleSignUp.dropDownView, { width: wp('90') }]}>
                        <Text style={[styleSignUp.dropDownTxt, { fontFamily: g.Bold }]}>{this.state.specialist}</Text>
                        <Icon name={this.state.showSpecialist ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                            style={styleSignUp.dropDownIcon}
                            onPress={() => {
                                this.setState({
                                    showSpecialist: !this.state.showSpecialist
                                })
                            }}
                        />
                    </View>
                </View>

                {this.state.showSpecialist ?
                    <View style={[styleSignUp.dropDownView, {
                        width: wp('90'),
                        marginTop: -15,
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        height: 110
                    }]}>
                        <FlatList
                            ListFooterComponent={() => <Text>{ }</Text>}
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={false}
                            style={{ padding: 10, }}
                            data={this.props.specialist}
                            renderItem={({ item, index }) => (
                                <View >
                                    <TouchableOpacity onPress={async () => {
                                        this.setState({
                                            specialist: item.specialityNameAr,
                                            showSpecialist: false,
                                            special_id: item.id
                                        })
                                    }}>
                                        <Text style={[styleSignUp.dropDownTxt, {
                                            fontSize: 12,
                                            color: g.Light_Gray,
                                            textAlign: 'right'
                                        }]}>{item.specialityNameAr}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                    : null}

                <CountryRegion  />


                <TouchableOpacity style={style.btn} onPress={() => {
                    if (this.state.doctor_name == '') {
                        this.setState({
                            error: g.DOCTOR_ERROR
                        })
                    }

                    else {
                        this.props.navigation.navigate('SearchListScreen', {
                            'TITLE': g.DOCTOR_TITLE, 'IREA': g.IREA,
                            'icon': require('../../Images/listone.png'),
                            'Filter_name': this.state.doctor_name,
                            'Special': this.state.special_id,
                        })
                    }
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