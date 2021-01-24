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


class Lab extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (

            <View>
                <Text style={[style.username1, { marginTop: hp('2%') }]}>
                    {g.Lab_NAME}
                </Text>

                <View style={style.viewInput}>
                    <TextInput
                        placeholder={g.Lab_NAME}
                        placeholderTextColor={g.Light_Gray}
                        style={style.input} />
                </View>


                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <View style={{ marginLeft: wp('0%') }}>
                        <Text style={style.irea}>{i18n.t(g.LAB_IREA)}</Text>
                        <View style={[style.container, style.view2]}>
                            <Icon name="arrow-drop-down" type="MaterialIcons"
                                style={[style.arrow, { marginTop: 0 }]} />
                            <Text style={style.city}>مصر الجديدة</Text>
                        </View>
                    </View>

                    <View style={{ marginLeft: wp('5%') }}>
                        <Text style={[style.irea, { marginLeft: wp('22%') }]}>{i18n.t(g.CITY)}</Text>
                        <View style={[style.container, style.pouns]}>
                            <Icon name="arrow-drop-down" type="MaterialIcons"
                                style={[style.arrow, { marginTop: 0 }]} />
                            <Text style={style.city}>القاهرة</Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity style={style.btn} onPress={() => {
                    this.props.navigation.navigate('SearchListScreen' , {
                        'TITLE' : g.LAB_TITLE  , 'IREA' : g.LAB_IREA ,
                        'icon' : require('../../Images/listtwo.png') , 
                    })

                }}>
                    <Text style={style.txt_btn}>{g.SEARCH}</Text>
                </TouchableOpacity>
            </View>
        );

    }
}
export default withNavigation(Lab);
