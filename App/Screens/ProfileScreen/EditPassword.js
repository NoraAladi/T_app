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
            loading: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user && this.state.password) {
            this.props.navigation.replace('LoginScreen');
        }
        else null
    }

    render() {
        return (
            <View>
                <HeaderNav title={g.EDIT_PASS} />

                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                    {g.CURRENT_PASS}
                </Text>

                <View style={[styles.viewInput, { flexDirection: 'row' }]}>

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
                        onChangeText={(currentPassword) => {

                            this.setState({
                                currentPassword: currentPassword,
                                showCurrent: true
                            })

                        }}
                        placeholderTextColor={g.Light_Gray}
                        style={[styles.input, { width: wp('60%') }]} />
                </View>


                <Text style={[styles.username, { marginTop: hp('2%') }]}>
                    {g.NEW_PASS}
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
                        placeholder={g.NEW_PASS}
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
                    {g.CONFIRM_NEW_PASS}
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
                        placeholder={g.CONFIRM_NEW_PASS}
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



                <TouchableOpacity style={[styles.btn, { marginTop: hp('20') }]}
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

