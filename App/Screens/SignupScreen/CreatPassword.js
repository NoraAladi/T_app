import styles from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, AppState, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

class CreatPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            showConfirm:true,
            password: '',
            confirmPassword:'',
        };
    }

    render() {
        return (
            <View>



                <Text style={styles.login}>
                    {g.CREATE_PASS}
                </Text>


                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                    {g.PASSWORD}
                </Text>

                <View style={[styles.viewInput, { flexDirection: 'row' }]}>

                    <Icon name="eye-off-sharp" type="Ionicons"

                        onPress={() => {
                            this.setState({
                                show: !this.state.show
                            })
                        }}
                        style={[styles.show, { marginLeft: wp('5%'), color: this.state.show ? g.Light_Gray : g.Bold_blue }]} />
                    <TextInput
                        placeholder={g.PASSWORD}
                        secureTextEntry={this.state.show}
                        keyboardType={'web-search'}
                        onChangeText={(password) => {

                            this.setState({
                                password: password,
                                show: true
                            })

                        }}
                        placeholderTextColor={g.Light_Gray}
                        style={[styles.input, { width: wp('60%') }]} />
                </View>

                

                {/***confirm pass */}
                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                    {g.CONFIRM_PASS}
                </Text>

                <View style={[styles.viewInput, { flexDirection: 'row' }]}>

                    <Icon name="eye-off-sharp" type="Ionicons"

                        onPress={() => {
                            this.setState({
                                showConfirm: !this.state.showConfirm
                            })
                        }}
                        style={[styles.show, { marginLeft: wp('5%'), color: this.state.showConfirm ? g.Light_Gray : g.Bold_blue }]} />
                    <TextInput
                        placeholder={g.CONFIRM_PASS}
                        secureTextEntry={this.state.showConfirm}
                        onChangeText={(confirmPassword) => {

                            this.setState({
                                confirmPassword: confirmPassword,
                                showConfirm: true
                            })

                        }}
                        placeholderTextColor={g.Light_Gray}
                        style={[styles.input, { width: wp('60%') }]} />
                </View>
            </View>
        );

    }
}
export default withNavigation(CreatPassword);
