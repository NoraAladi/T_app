import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Keyboard,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../../Gloabal';
import Spinner from '../../Navigation/Spinner'
import { connect } from 'react-redux'
import { forget_pass } from '../../Actions/forget_pass';
import Toast from 'react-native-easy-toast'


class Forget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }


    async _on_ForgetPass() {
        Keyboard.dismiss()
        const { email } = this.state;
        await this.props.forget_pass({ email })
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
                    {g.QUESTION_FORGET}
                </Text>

                <Text style={styles.enter}>
                    {g.FORGET_PASSWORD_P1}
                </Text>

                <Text style={[styles.username, styles.enter2]}>
                    {g.EMAIL}
                </Text>

                <View style={styles.viewInput}>
                    <TextInput
                        keyboardType='email-address'
                        onChangeText={(email) => { this.setState({ email }) }}
                        placeholder={g.ENTER_EMAIL}
                        placeholderTextColor={g.Light_Gray}
                        style={styles.input} />
                </View>

                {
                    this.props.loading ?
                        <View style={styles.SpinnerTopForget}>
                            <Spinner />
                        </View>

                        :
                        <TouchableOpacity style={styles.btn}
                            onPress={async () => {

                                await this._on_ForgetPass()

                                if (this.props.error) {
                                    this.toast.show(this.props.error, 10000);

                                }
                                else {
                                    console.log('code: ' + this.props.forget);
                                    // this.toast.show(this.props.forget, 1000);
                                    if (this.props.forget == 'no account') {
                                        this.toast.show(this.props.forget, 10000);

                                    } else{
                                        this.toast.show('The code has been sent successfully', 10000);

                                    setTimeout(() => {
                                        this.props.navigation.navigate('VerificationScreen',
                                            { 'email': this.state.email }
                                        )

                                    }, 1000);

                                }
                                }

                            }}>
                            <Text style={styles.txt_btn}>{g.SEND}</Text>
                        </TouchableOpacity>
                }

                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: '#000' }}
                    position='center'
                    fadeInDuration={120}
                    fadeOutDuration={1000}
                    textStyle={{ color: 'white', fontFamily: g.Regular }}
                />
            </View>

        );

    }
}

const mapStateToProps = state => {
    return {
        error: state.forget_pass.error,
        loading: state.forget_pass.loading,
        forget: state.forget_pass.forget,
        message: state.forget_pass.message

    }
}

export default connect(mapStateToProps, { forget_pass })(withNavigation(Forget));

