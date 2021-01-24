import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform,
    AppState, ImageBackground, I18nManager, Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

class ThankU extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View style={{
                alignItems: 'center', justifyContent: 'center'
                , marginBottom: 'auto', marginTop: 'auto',
            }}>
                <Text style={[styles.login, { marginLeft: 0, marginRight: 0, marginTop: 0, }]}>
                    {g.THANKU}
                </Text>

                <Text style={[styles.username, { marginTop: hp('3%'), marginLeft: 0, marginRight: 0, }]}>
                    {g.ADD_DONE}
                </Text>
                <Image
                    style={{ marginTop: 25, width: 175, height: 175, marginBottom: 25, }}
                    resizeMode='contain'
                    source={require('../../Images/thankYou.png')} />

                <Text style={[styles.login, {
                    marginLeft: 0, marginRight: 0,
                    marginTop: 0, color:'#0091FF',fontSize:14
                }]}
                    onPress={() => {
                    this.props.navigation.replace('SearchScreen')
                }}
                >
                    {g.GO_TO_HOME}
                </Text>
            </View>
        );

    }
}
export default withNavigation(ThankU);
