import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import { loginuser } from '../../Actions/authAction';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: '', text_error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && this.state.email) {
            this.props.navigation.replace('SearchScreen');
        }
        else null
    }


    async _onLogin() {
            const { email, password } = this.state;
            await this.props.loginuser({ email, password })
            Keyboard.dismiss()
    }


    render() {
        return (

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'position'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -200}>
                <ScrollView >


                    <View style={{
                        flex: 0,
                        marginTop: Platform.OS == "ios" ? hp('5%') : null
                    }}
                    >
                        <Icon name="arrowright" type="AntDesign"
                            onPress={() => {
                                this.props.navigation.pop()
                            }}
                            style={styles.arrow} />

                        <Text style={styles.login}>
                            {g.LOGIN}
                        </Text>

                        <Text style={styles.enter}>
                            {g.ENTER_USERNAME_PASSWORD}
                        </Text>

                        <Text style={styles.username}>
                            {g.USERNAME}
                        </Text>

                        <View style={styles.viewInput}>
                            <TextInput
                                onChangeText={(email) => this.setState({ email })}
                                keyboardType="email-address"
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholder={g.USERNAME}
                                placeholderTextColor={g.Light_Gray}
                                style={styles.input} />
                        </View>

                        <Text style={[styles.username, { marginTop: hp('2%') }]}>
                            {g.PASSWORD}
                        </Text>

                        <View style={styles.viewInput}>
                            <TextInput
                                onChangeText={(password) => this.setState({ password })}
                                secureTextEntry
                                autoCorrect={false}
                                placeholder={g.PASSWORD}
                                placeholderTextColor={g.Light_Gray}
                                style={styles.input} />
                        </View>

                        <Text
                            style={[styles.forget, { marginTop: hp('2%') }]}
                            onPress={() => {
                                this.props.navigation.navigate('ForgetScreen')
                            }}
                        >
                            {g.FORGET_PASSWORD}
                        </Text>

                        {
                            this.props.loading ?
                                <Spinner />
                                :
                                <TouchableOpacity style={styles.btn}
                                    onPress={this._onLogin.bind(this)}>
                                    <Text style={styles.txt_btn}>{g.LOGIN}</Text>
                                </TouchableOpacity>
                        }
                             
                        <Text style={styles.error}>
                         {this.props.error}
                         </Text>

                        <View style={styles.row}>
                            <Text style={styles.sign}
                                onPress={() => { this.props.navigation.navigate('PatientCodeScreen') }}

                            >
                                {g.SIGNUP}
                            </Text>
                            <Text style={styles.sign1}>
                                {g.ACCOUNT}
                            </Text>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        user: state.auth.user,
        message: state.auth.message,

    }
}

export default connect(mapStateToProps, { loginuser })(withNavigation(Login));
