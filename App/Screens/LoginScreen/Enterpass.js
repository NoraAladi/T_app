import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../../Gloabal';

import Spinner from '../../Navigation/Spinner'
import { connect } from 'react-redux'
import { Reset_Pass } from '../../Actions/resetPass_action';
import Toast from 'react-native-easy-toast'
import { widthPercentageToDP } from 'react-native-responsive-screen';

class Enterpass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            password: '', confirm_pass: ' ', show_confirm: true,
            token: this.props.navigation.getParam('token')
        };
    }


    render() {
        return (
            <View>
                <View style={styles.ViewContainer}>
                    <Text style={[styles.change, styles.changePass]}>
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

                <Text style={[styles.username, styles.enter2]}>
                    {g.PASSWORD}
                </Text>

                <View style={[styles.viewInput, styles.simpleRow]}>

                    <Icon name="eye-off-sharp" type="Ionicons"
                        onPress={() => {
                            this.setState({
                                show: !this.state.show
                            })
                        }}
                        style={[styles.show, styles.enter5, { color: this.state.show ? g.Light_Gray : g.Bold_blue }]} />

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
                        style={[styles.input, styles.widthInput]} />
                </View>


                <Text style={[styles.username, styles.enter2]}>
                    {g.CONFIRM_PASS}
                </Text>
                <View style={[styles.viewInput, styles.simpleRow]}>

                    <Icon name="eye-off-sharp" type="Ionicons"

                        onPress={() => {
                            this.setState({
                                show_confirm: !this.state.show_confirm
                            })
                        }}
                        style={[styles.show, styles.enter5, { color: this.state.show_confirm ? g.Light_Gray : g.Bold_blue }]} />

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
                        style={[styles.input, styles.widthInput]} />
                </View>

                <TouchableOpacity
                    disabled={
                        this.state.password == this.state.confirm_pass &&
                            (this.state.password != '' || this.state.confirm_pass != '')
                            ? false : true
                    }
                    style={[styles.btn, {
                        backgroundColor: this.state.password == this.state.confirm_pass &&
                            (this.state.password != '' || this.state.confirm_pass != '')
                            ? g.Bold_blue : g.Gray
                    }]} onPress={async () => {
                        //alert(this.state.password)
                        await this.props.Reset_Pass(this.state.token,
                            this.state.password,
                            this.state.confirm_pass)
                        this.toast.show(this.props.message, 4000)
                        if (this.props.message == 'Password reset successful,\nyou can now login')
                            setTimeout(() => {
                                this.props.navigation.navigate('LoginScreen')
                            }, 4000);
                    }}>
                    <Text style={styles.txt_btn}>{g.CONFIRM_PASS}</Text>
                </TouchableOpacity>

                {this.props.loading ?
                    <View style={styles.SpinnerTopForget}>
                        <Spinner />
                    </View>

                    : null}
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{
                        backgroundColor: g.toast,
                        width: widthPercentageToDP('85'),
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                    position='center'
                    fadeInDuration={120}
                    fadeOutDuration={1000}
                    textStyle={{ color: '#000', fontFamily: g.Regular,fontSize: 16,textAlign:'center' }}

                />
                 
            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        message: state.resetPass.message,
        loading: state.resetPass.loading,

    }
}

export default connect(mapStateToProps, { Reset_Pass })(withNavigation(Enterpass));

