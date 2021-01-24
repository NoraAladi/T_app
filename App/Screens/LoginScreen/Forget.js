import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, AppState, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';

class Forget extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row',  paddingHorizontal: 25, }}>
                    <Text style={[styles.change, { fontSize: 18 ,marginLeft: wp('25') ,}]}>
                        {g.CHANGE_PASSWORD}
                    </Text>
                    <Icon name="arrowright" type="AntDesign"
                        style={[styles.arrow, { marginLeft: 'auto' }]} />
                </View>

                <Text style={styles.login}>
                    {g.QUESTION_FORGET}
                </Text>

                <Text style={styles.enter}>
                    {g.FORGET_PASSWORD_P1}
                </Text>

                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                    {g.EMAIL}
                </Text>

                <View style={styles.viewInput}>
                    <TextInput
                        placeholder={g.ENTER_EMAIL}
                        placeholderTextColor={g.Light_Gray}
                        style={styles.input} />
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    this.props.navigation.navigate('VerificationScreen')

                }}>
                    <Text style={styles.txt_btn}>{g.SEND}</Text>
                </TouchableOpacity>



            </View>
        );

    }
}
export default withNavigation(Forget);
