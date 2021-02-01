import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, Image,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import HeaderNav from '../../Navigation/HeaderNav';
import { Get_Emergency } from '../../Actions/getEmergencyAction';
import { connect } from 'react-redux'
class Emergency extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {
        await this.props.Get_Emergency()
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderNav title={g.EMERGENCY} />

                <View style={{ zIndex: -1 }}>

                    <View style={{
                        flexDirection: 'row-reverse', width: wp('90'),
                        marginRight: 'auto', marginLeft: 'auto',
                        padding: 15, alignItems: 'center'
                    }}>

                        <Image source={require('../../Images/es3af.jpg')}
                            resizeMode={'center'}
                            style={{
                                width: 70, height: 70, borderRadius: 35
                            }} />
                        <View style={{ padding: 10, }}>
                            <Text style={[styles.txtBold]}>
                                الإسعاف
                                        </Text>
                            <Text style={[styles.txt, { color: g.Light_Gray, }]}>
                                123
                                        </Text>
                        </View>

                        <Image source={require('../../Images/call.png')}
                            style={{
                                width: 35, height: 35,
                                marginLeft: 'auto',
                            }} />

                    </View>

                    <View style={{
                        height: 1, width: wp('90'), marginLeft: 'auto', marginRight: 'auto',
                        backgroundColor: g.Light_Gray, borderRadius: 5, opacity: .3
                    }} />

                    <View style={{
                        flexDirection: 'row-reverse', width: wp('90'),
                        marginRight: 'auto', marginLeft: 'auto',
                        padding: 15, alignItems: 'center'
                    }}>

                        <Image source={require('../../Images/wzara_se7a.png')}
                            resizeMode={'center'}
                            style={{
                                width: 70, height: 70,
                            }} />
                        <View style={{ padding: 10, }}>
                            <Text style={[styles.txtBold]}>
                                وزارة الصحة والسكان
                                        </Text>
                            <Text style={[styles.txt, { color: g.Light_Gray, }]}>
                                105
                                        </Text>
                        </View>

                        <Image source={require('../../Images/call.png')}
                            style={{
                                width: 35, height: 35,
                                marginLeft: 'auto',
                            }} />

                    </View>

                    <View style={{
                        height: 1, width: wp('90'), marginLeft: 'auto', marginRight: 'auto',
                        backgroundColor: g.Light_Gray, borderRadius: 5, opacity: .3
                    }} />

                    <View style={{
                        flexDirection: 'row-reverse', width: wp('90'),
                        marginRight: 'auto', marginLeft: 'auto',
                        padding: 15, alignItems: 'center'
                    }}>

                        <Image source={require('../../Images/Egyptian_Police_Emblem.png')}
                            resizeMode={'center'}
                            style={{
                                width: 70, height: 70,

                            }} />
                        <View style={{ padding: 10, }}>
                            <Text style={[styles.txtBold]}>
                                شرطة النجدة
                                        </Text>
                            <Text style={[styles.txt, { color: g.Light_Gray, }]}>
                                122
                                        </Text>
                        </View>

                        <Image source={require('../../Images/call.png')}
                            style={{
                                width: 35, height: 35,
                                marginLeft: 'auto',
                            }} />

                    </View>

                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        Emergency: state.Emergency.Emergency,
    }
}
export default connect(mapStateToProps, { Get_Emergency })(withNavigation(Emergency));

