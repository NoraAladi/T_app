import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, TextInput,
    TouchableOpacity, Platform, Keyboard
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
            code: ''
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
                            this.state.code != ''
                                ? false : true
                        }
                        style={styles.txt2}
                        onPress={async () => {
                            Keyboard.dismiss()
                            await this.props.Get_PatientCode(this.state.code)
                            if (this.props.status == 200) {
                                this.toast.show(this.props.message, 1000);
                                setTimeout(() => {
                                    this.props.navigation.getParam('dependents') == 'dependents' ?
                                        this.props.navigation.navigate('NewUserScreen',
                                            { 'patientCode': this.state.code })
                                        :
                                        this.props.navigation.navigate('SignUpHaveCode',
                                            { 'patientCode': this.state.code })
                                }, 1000);

                            }
                            else {
                                this.toast.show(this.props.message, 1000);
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
                    style={{ backgroundColor: '#000' }}
                    position='bottom'
                    positionValue={180}
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
        status: state.patientCode.status,
        message: state.patientCode.message,
        loading: state.patientCode.loading,
    }
}

export default connect(mapStateToProps, { Get_PatientCode })(withNavigation(PatientCode));
