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

class Enterpass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            password: '', confirm_pass: ' ', show_confirm: true,
        };
    }
   
    render() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row', paddingHorizontal: 25,
                    marginTop: Platform.OS == "ios" ? hp('5%') : null
                }}>
                    <Text style={[styles.change, { fontSize: 18, marginLeft: wp('25'), }]}>
                        {g.CHANGE_PASSWORD}
                    </Text>
                    <Icon name="arrowright" type="AntDesign"
                        style={[styles.arrow, { marginLeft: 'auto' }]}
                        onPress={() => { this.props.navigation.pop() }}

                    />
                </View>


                <Text style={styles.login}>
                    {g.CREATE_PASS}
                </Text>

                <Text style={styles.enter}>
                    {g.PLEASE}
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


                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                    {g.CONFIRM_PASS}
                </Text>
                <View style={[styles.viewInput, { flexDirection: 'row' }]}>

                    <Icon name="eye-off-sharp" type="Ionicons"

                        onPress={() => {
                            this.setState({
                                show_confirm: !this.state.show_confirm
                            })
                        }}
                        style={[styles.show, { marginLeft: wp('5%'), color: this.state.show_confirm ? g.Light_Gray : g.Bold_blue }]} />

                    <TextInput
                        placeholder={g.CONFIRM_PASS}
                        secureTextEntry={this.state.show_confirm}
                        keyboardType={'web-search'}
                        onChangeText={(confirm_pass) => {

                            this.setState({
                                confirm_pass: confirm_pass,
                                show_confirm: true
                            })

                        }}
                        placeholderTextColor={g.Light_Gray}
                        style={[styles.input, { width: wp('60%') }]} />
                </View>

                {
                    this.state.password == this.state.confirm_pass &&
                        (this.state.password != '' || this.state.confirm_pass != '')
                        ?

                        <TouchableOpacity
                            style={styles.btn} onPress={() => {
                                //alert(this.state.password)
                                this.props.navigation.navigate('')
                            }}>
                            <Text style={styles.txt_btn}>{g.CONFIRM_PASS}</Text>
                        </TouchableOpacity>

                        : null
                }

            </View>
        );

    }
}
export default withNavigation(Enterpass);
