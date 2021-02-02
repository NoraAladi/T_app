import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, Keyboard, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Toast, Root } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import Spinner from '../../Navigation/Spinner'
import { connect } from 'react-redux'
import { forget_pass } from '../../Actions/forget_pass';


class Forget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }


    async _on_ForgetPass() {
        const { email } = this.state;
        await this.props.forget_pass({ email })
        Keyboard.dismiss()
    }

    render() {
        return (
            <Root>

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
                            onChangeText={(email) => { this.setState({ email }) }}
                            placeholder={g.ENTER_EMAIL}
                            placeholderTextColor={g.Light_Gray}
                            style={styles.input} />
                    </View>

                    {
                        this.props.loading ?
                            <View style = {{ marginTop : '10%'}}>
                                <Spinner />
                            </View>
                     
                            :
                            <TouchableOpacity style={styles.btn}
                                onPress={async () => {
                                    await this._on_ForgetPass()

                                    if (this.props.error) {
                                        Toast.show({
                                            text: this.props.error,
                                            textStyle: { fontFamily: g.Regular },
                                            style: { marginTop: hp('0%') },
                                            position: 'bottom',
                                        })
                                    }
                                    else {
                                        setTimeout(() => {
                                            this.props.navigation.navigate('VerificationScreen')
                                        }, 2000);
                                    }

                                }}>
                                <Text style={styles.txt_btn}>{g.SEND}</Text>
                            </TouchableOpacity>
                    }

                </View>

            </Root>
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

