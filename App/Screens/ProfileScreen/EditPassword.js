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
import HeaderNav from '../../Navigation/HeaderNav';
import { change_Pass } from '../../Actions/change_passAction';
import { connect } from 'react-redux';
import Spinner from '../../Navigation/Spinner'

class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCurrent: true,
            currentPassword: '',
            show: true,
            showConfirm: true,
            password: '',
            confirmPassword: '',
            loading: false,

            disable: true,
            passError: false,

            currentPasswordError: false,
            confirmPassError: false,
        };
    }
    validatePass = async (text) => {
        console.log(text);
        if (text.length < 6) {
            console.log("pass <6");
            this.setState({ passError: true })
        }
        else {
            console.log("pass done");
            await this.setState({
                passError: false,
                password: text
            })

        }
    }
    validateCurrentPass = async (text) => {
        console.log(text);
        if (text.length < 6) {
            console.log("pass <6");
            this.setState({ currentPasswordError: true })
        }
        else {
            console.log("pass done");
            await this.setState({
                currentPasswordError: false,
                currentPassword: text,

            })

        }
    }

    validateConfirmPass = async (text) => {
        console.log(text);
        if (text != this.state.password) {
            console.log("don't match");
            this.setState({ confirmPassError: true })

        }
        else {
            console.log("pass done");
            await this.setState({
                confirmPassError: false,
                confirmPassword: text
            })

        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user && this.state.password) {
            this.props.navigation.replace('LoginScreen');
        }
        else null
    }
    activeBtn() {
        if (this.state.passError || this.state.password == '' ||
            this.state.currentPasswordError || this.state.currentPassword == '' ||
            this.state.confirmPassError || this.state.confirmPassword == '')
            this.setState({ disable: true })
        else
            this.setState({ disable: false })

    }
    render() {
        return (
            <ScrollView>
                <View>
                    <HeaderNav title={g.EDIT_PASS} />

                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.CURRENT_PASS}
                    </Text>

                    <View style={[styles.viewInput, {
                        flexDirection: 'row', borderColor: this.state.currentPasswordError ? 'red' : g.Light_Gray

                    }]}>

                        <Icon name="eye-off-sharp" type="Ionicons"

                            onPress={() => {
                                this.setState({
                                    showCurrent: !this.state.showCurrent
                                })
                            }}
                            style={[styles.show, { marginLeft: wp('5%'), color: this.state.showCurrent ? g.Light_Gray : g.Bold_blue }]} />
                        <TextInput
                            placeholder={g.CURRENT_PASS}
                            secureTextEntry={this.state.showCurrent}
                            onChangeText={async (currentPassword) => {
                                await this.validateCurrentPass(currentPassword)
                                this.setState({
                                    showCurrent: true
                                })
                                this.activeBtn()

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('60%') }]} />
                    </View>
                    {this.state.currentPasswordError ?
                        <Text style={styles.error}>
                            {'*كلمة المرور لا تقل عن 6 احرف '}
                        </Text>
                        : null}

                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.NEW_PASS}
                    </Text>

                    <View style={[styles.viewInput, {
                        flexDirection: 'row',
                        borderColor: this.state.passError ? 'red' : g.Light_Gray
                    }]}>

                        <Icon name="eye-off-sharp" type="Ionicons"

                            onPress={() => {
                                this.setState({
                                    show: !this.state.show
                                })
                            }}
                            style={[styles.show, { marginLeft: wp('5%'), color: this.state.show ? g.Light_Gray : g.Bold_blue }]} />
                        <TextInput
                            placeholder={g.NEW_PASS}
                            secureTextEntry={this.state.show}
                            keyboardType={'web-search'}
                            onChangeText={async (password) => {
                                await this.validatePass(password)
                                this.setState({
                                    show: true
                                })
                                this.activeBtn()

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('60%') }]} />
                    </View>
                    {this.state.passError ?
                        <Text style={styles.error}>
                            {'*كلمة المرور لا تقل عن 6 احرف '}
                        </Text>
                        : null}


                    {/***confirm pass */}
                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.CONFIRM_NEW_PASS}
                    </Text>

                    <View style={[styles.viewInput, {
                        flexDirection: 'row',
                        borderColor: this.state.confirmPassError ? 'red' : g.Light_Gray
                    }]}>

                        <Icon name="eye-off-sharp" type="Ionicons"

                            onPress={() => {
                                this.setState({
                                    showConfirm: !this.state.showConfirm
                                })
                            }}
                            style={[styles.show, { marginLeft: wp('5%'), color: this.state.showConfirm ? g.Light_Gray : g.Bold_blue }]} />
                        <TextInput
                            placeholder={g.CONFIRM_NEW_PASS}
                            secureTextEntry={this.state.showConfirm}
                            onChangeText={async (confirmPassword) => {
                                await this.validateConfirmPass(confirmPassword)
                                this.setState({
                                    showConfirm: true
                                })
                                this.activeBtn()

                            }}
                            placeholderTextColor={g.Light_Gray}
                            style={[styles.input, { width: wp('60%') }]} />
                    </View>
                    {this.state.confirmPassError ?
                        <Text style={styles.error}>
                            {'*كلمة المرور غير متطابقة '}
                        </Text>
                        : null}


                    <TouchableOpacity
                        disabled={this.state.disable}
                        style={[styles.btn, { backgroundColor: this.state.disable ? g.Light_Gray : g.Bold_blue, marginTop: hp('20') }]}
                        onPress={async () => {
                            this.setState({
                                loading: true
                            })
                            await this.props.change_Pass(this.state.currentPassword,
                                this.state.password, this.state.confirmPassword)
                            this.setState({
                                loading: false
                            })
                        }}>
                        {
                            this.state.loading ?
                                <View style={{ marginBottom: hp('0%') }} >
                                    <Spinner />
                                </View>
                                :
                                <Text style={[styles.txt_btn,]}>
                                    {g.CONFIRM}</Text>
                        }
                    </TouchableOpacity>
                    <Text style={styles.error}>
                        {this.props.error}
                    </Text>

                </View>
            </ScrollView>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        user: state.CHange.loading,
        user: state.CHange.user,
        error: state.CHange.error,

    };
};

export default connect(mapStateToProps, { change_Pass })(
    withNavigation(EditPassword),
);

