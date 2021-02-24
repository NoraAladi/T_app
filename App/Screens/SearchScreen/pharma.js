import style from './style';
import React, { Component } from 'react';
import {
    Text, View, TouchableOpacity, TextInput
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import CountryRegion from '../../Navigation/CountryRegion';


class Pharma extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Filter_name: ''
        }
    }

    render() {
        return (

            <View>
                <Text style={[style.username1, { marginTop: hp('2%'), textAlign: 'right' }]}>
                    {g.PHRMA_NAME}
                </Text>

                <View style={style.viewInput}>
                    <TextInput
                        placeholder={g.PHRMA_NAME}
                        placeholderTextColor={g.Light_Gray}
                        style={style.input}
                        onChange={(value) => this.setState({ Filter_name: value })}
                    />
                </View>

                <CountryRegion />

                <TouchableOpacity style={style.btn} onPress={() => {
                    this.props.navigation.navigate('SearchListScreen', {
                        'TITLE': g.PHARMA_TITLE, 'IREA': g.PHARMA_IREA,
                        'color': g.Move,
                        'icon': require('../../Images/listfour.png'),
                        'Filter_name': this.state.Filter_name
                    })

                }}>
                    <Text style={style.txt_btn}>{g.SEARCH}</Text>
                </TouchableOpacity>
            </View>
        );

    }
}
export default withNavigation(Pharma);
