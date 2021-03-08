import style from './style';
import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, TextInput
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import CountryRegion from '../../Navigation/CountryRegion';


class Lab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lab_name: '', error: '',
            cityId: 1,
            countryId: 1,
        }
    }

    getCountryAndCityIds = async (countryId, cityId) => {
        await this.setState({
            cityId: cityId,
            countryId: countryId
        })
    }
    render() {
        return (

            <View>
                <Text style={[style.username1, { marginTop: hp('2%'), textAlign: 'right' }]}>
                    {g.Lab_NAME}
                </Text>

                <View style={style.viewInput}>
                    <TextInput
                        onChangeText={(lab_name) => this.setState({ lab_name })}
                        placeholder={g.Lab_NAME}
                        placeholderTextColor={g.Light_Gray}
                        style={style.input} />
                </View>


                <CountryRegion callApi={this.getCountryAndCityIds} />

                <TouchableOpacity style={style.btn} onPress={() => {

                    this.props.navigation.navigate('SearchListScreen', {
                        'TITLE': g.LAB_TITLE, 'IREA': g.LAB_IREA,
                        'icon': require('../../Images/listtwo.png'),
                        'Filter_name': this.state.lab_name,
                    })

                }}>
                    <Text style={style.txt_btn}>{g.SEARCH}</Text>
                </TouchableOpacity>
                <Text style={[style.error, { marginTop: -30, marginBottom: 50 }]}>{this.state.error}</Text>

            </View>
        );

    }
}
export default withNavigation(Lab);
