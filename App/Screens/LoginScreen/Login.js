import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform,
    KeyboardAvoidingView,
    AppState, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        return (
           
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'position'}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 :-200}>
                  <ScrollView >


                <View style={{flex: 0,}}
                >
                    <Icon name="arrowright" type="AntDesign"
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
                           
                            placeholder={g.USERNAME}
                            placeholderTextColor={g.Light_Gray}
                            style={styles.input} />
                    </View>

                    <Text style={[styles.username, { marginTop: hp('2%') }]}>
                        {g.PASSWORD}
                    </Text>

                    <View style={styles.viewInput}>
                        <TextInput
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

                    <TouchableOpacity style={styles.btn} onPress={() => {
                        this.props.navigation.navigate('ForgetScreen')
                    }}>
                        <Text style={styles.txt_btn}>{g.LOGIN}</Text>
                    </TouchableOpacity>

                    <View style={styles.row}>
                        <Text style={styles.sign}>
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
export default withNavigation(Login);
