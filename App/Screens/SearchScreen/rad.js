import style from './style';
import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, TextInput
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import CountryRegion from '../../Navigation/CountryRegion';


class Rad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rad_name: '',
            cityId: 1,
            countryId:1,
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
                <Text style={[style.username1, { marginTop: hp('2%') ,textAlign : 'right'  }]}>
                    {g.RAD_NAME}
                </Text>

                <View style={style.viewInput}>
                    <TextInput
                        placeholder={g.RAD_NAME}
                        placeholderTextColor={g.Light_Gray}
                        style={style.input}
                    onChangeText={(val)=>this.setState({rad_name:val})}
                    />
                </View>


                <CountryRegion callApi={this.getCountryAndCityIds} />

                <TouchableOpacity style={style.btn} onPress={() => {
                    this.props.navigation.navigate('SearchListScreen' , {
                        'TITLE' : g.RAD_TITLE , 'IREA' : g.RAD_IREA , 
                        'icon': require('../../Images/listthree.png'), 
                        'Filter_name' : this.state.rad_name , 

                    })

                }}>
                    <Text style={style.txt_btn}>{g.SEARCH}</Text>
                </TouchableOpacity>
            </View>
        );

    }
}
export default withNavigation(Rad);
