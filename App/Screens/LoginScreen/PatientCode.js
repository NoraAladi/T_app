import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, Dimensions, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';


class PatientCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        };
    }

    componentDidMount() {
        alert('sss')
    }

    render() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 25, width: g.windowWidth,
                    justifyContent: 'space-between',
                    marginTop: Platform.OS == "ios" ? hp('5%') : null,

                }}>
                    <Icon name="info" type="Feather"
                        style={[styles.arrow, { marginLeft: 0 }]} />
                    <Icon name="arrowright" type="AntDesign"
                        onPress={() => {
                            this.props.navigation.pop()
                        }}
                        style={[styles.arrow, { marginLeft: 0 }]} />
                </View>

                <Text style={styles.login}>
                    {g.QUESTION_CODE}
                </Text>

                <Text style={styles.enter}>
                    {g.ENTER_CODE_PATIENT}
                </Text>

                <Text style={[styles.username, { marginTop: hp('4') }]}>
                    {g.PATIENT_CODE}
                </Text>

                <View style={styles.viewInput}>
                    <TextInput
                        onChangeText={(code) => {
                            this.setState({ code })
                        }}
                        placeholder={g.PATIENT_CODE}
                        placeholderTextColor={g.Light_Gray}
                        style={styles.input} />
                </View>


                <View style={styles.view1}>

                    <TouchableOpacity

                        disabled={
                            this.state.code != ''
                                ? false : true
                        }
                        style={styles.view2} onPress={() => {
                            this.props.navigation.navigate('SignUpScreen')
                        }}>
                        <Text style={styles.txt1}>{g.NO}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={
                            this.state.code != ''
                                ? false : true
                        }
                        style={styles.txt2}
                        onPress={() => {
                            this.props.navigation.navigate('SignUpHaveCode')

                        }}
                    >
                        <Text style={styles.txt3}>{g.YES}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );

    }
}
export default withNavigation(PatientCode);
