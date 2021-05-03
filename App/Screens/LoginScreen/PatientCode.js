import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Keyboard
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../../Gloabal';
import { Get_PatientCode } from '../../Actions/patientCode_Action';
import { connect } from 'react-redux'
import Toast, { DURATION } from 'react-native-easy-toast'
import Spinner from '../../Navigation/Spinner';

class PatientCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            mobile: 0
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <View>
                <View style={styles.patientContainer}>

                    <Icon name="arrowright" type="AntDesign"
                        onPress={() => {
                            this.props.navigation.pop()
                        }}
                        style={[styles.arrow]} />
                </View>

                <Text style={styles.login}>
                    {this.props.navigation.getParam('dependents') == 'dependents' ?
                        'هل لديك كود المريض المضاف' : g.QUESTION_CODE}
                </Text>

                <Text style={styles.enter}>
                    {g.ENTER_CODE_PATIENT}
                </Text>

                <Text style={[styles.username, styles.enter4]}>
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

                <Text style={[styles.username, styles.enter4]}>
                    {g.MOBILE}
                </Text>

                <View style={styles.viewInput}>
                    <TextInput
                        onChangeText={(mobile) => {
                            this.setState({ mobile })
                        }}
                        placeholder={g.MOBILE}
                        placeholderTextColor={g.Light_Gray}
                        style={styles.input} />
                </View>

                <View style={styles.view1}>

                    <TouchableOpacity
                        style={styles.view2} onPress={() => {
                            this.props.navigation.getParam('dependents') == 'dependents' ?
                                this.props.navigation.navigate('NewUserScreen')
                                :
                                this.props.navigation.navigate('SignUpScreen')
                        }}>
                        <Text style={styles.txt1}>{g.NO}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={
                            this.state.code != '' || this.state.mobile != ''
                                ? false : true
                        }
                        style={[styles.txt2, {
                            backgroundColor: this.state.code == '' ||
                                this.state.mobile == '' ? g.Gray : g.Bold_blue
                        }]}
                        onPress={async () => {
                            Keyboard.dismiss()
                            await this.props.Get_PatientCode(this.state.code, this.state.mobile)
                            if (this.props.status == 200) {
                                this.toast.show(this.props.message, 3000);
                                setTimeout(() => {
                                    this.props.navigation.getParam('dependents') == 'dependents' ?
                                        this.props.navigation.navigate('NewUserScreen',
                                            { 'patientCode': this.state.code })
                                        :
                                        this.props.navigation.navigate('SignUpHaveCode',
                                            { 'patientCode': this.state.code })
                                }, 3000);

                            }
                            else {
                                //                             if (this.props.message == "redirecttoverify") {
                                //     this.props.navigation.navigate('VerificationScreen',
                                //         {
                                //             'email': response[1].email,
                                //             'fromLoginScreen': 'true'
                                //         }
                                //     )
                                // }
                                this.toast.show(this.props.message, 3000);
                            }
                            //

                        }}
                    >
                        <Text style={styles.txt3}>{g.YES}</Text>
                    </TouchableOpacity>


                </View>
                {
                    this.props.loading ?
                        <View style={styles.SpinnerTopPatient}>
                            <Spinner />
                        </View>

                        : null}
                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: g.toast }}
                    position='center'
                    fadeInDuration={120}
                    fadeOutDuration={1000}
                    textStyle={{ color: '#000', fontFamily: g.Regular, fontSize: 16, }}
                />
            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        status: state.patientCode.status,
        message: state.patientCode.message,
        loading: state.patientCode.loading,
    }
}

export default connect(mapStateToProps, { Get_PatientCode })(withNavigation(PatientCode));
