import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, Platform, KeyboardAvoidingView,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import UserData from './UserData';


class SignUpHaveCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientCode: this.props.navigation.getParam('patientCode')
        };
    }



    componentDidMount() {
    }



    render() {

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'position'}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -270}>
                <ScrollView
                    ref={(ref) => { this.scrollListReftop = ref; }}
                    showsVerticalScrollIndicator={false}>



                    <View style={{ zIndex: -1, }}>
                        <View style={{
                            flexDirection: 'row', paddingHorizontal: 25,
                            justifyContent: 'space-between',
                            marginTop: Platform.OS == "ios" ? hp('5%') : null,
                        }}>
                            <View style={{ width: 25 }} />

                            <Text style={[styleLogin.change, { fontSize: 18, marginLeft: 0, }]}>
                                {g.SIGNUP}
                            </Text>
                            <Icon name="arrowright" type="AntDesign"
                                onPress={() => {
                                    this.props.navigation.pop()
                                }}
                                style={[styleLogin.arrow, { marginLeft: 0 }]} />
                        </View>


                        <UserData haveCode={true}
                            patientCode={this.state.patientCode} />

                        <View style={{ height: 50 }} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );

    }
}
export default withNavigation(SignUpHaveCode);
