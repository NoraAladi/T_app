import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, Image, Linking
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import HeaderNav from '../../Navigation/HeaderNav';
import { Get_Emergency } from '../../Actions/getEmergencyAction';
import { connect } from 'react-redux'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Spinner from '../../Navigation/Spinner'
import FitImage from 'react-native-fit-image';

class Emergency extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emergency: []
        };
    }
    async componentDidMount() {
        await this.props.Get_Emergency()
        await this.setState({
            emergency: this.props.Emergency
        })

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderNav title={g.EMERGENCY} />

                <View style={{ zIndex: -1 }}>
                    {
                        this.props.loading ?
                            <View style={{ marginTop: '30%' }} >
                                <Spinner />
                            </View>

                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.emergency}
                                renderItem={({ item, index }) => (

                                    <>
                                        <TouchableOpacity
                                            style={{
                                            }}
                                            onPress={() => {
                                                Linking.openURL(`tel:${item.phoneNumber}`)

                                            }}>
                                            <View style={{
                                                flexDirection: 'row-reverse', width: wp('90'),
                                                marginRight: 'auto', marginLeft: 'auto',
                                                padding: 15, alignItems: 'center', justifyContent: 'space-between',
                                            }}>
                                                <View style={{ flexDirection: 'row-reverse' }}>

                                                    <FitImage
                                                        source={{ uri: item.logo }}
                                                        resizeMode={'center'}
                                                        style={{
                                                            width: 70, height: 70, borderRadius: 35,
                                                            overflow: 'hidden'
                                                        }} />

                                                    <View style={{ padding: 10, }}>
                                                        <Text style={[styles.txtBold]}>
                                                            {item.placeNameAR}
                                                        </Text>
                                                        <Text style={[styles.txt, { color: g.Light_Gray, }]}>
                                                            {item.phoneNumber}
                                                        </Text>
                                                    </View>
                                                </View>

                                                <Image source={require('../../Images/call.png')}
                                                    style={{
                                                        width: 35, height: 35,
                                                    }} />

                                            </View>

                                            <View style={{
                                                height: 1, width: wp('90'), marginLeft: 'auto', marginRight: 'auto',
                                                backgroundColor: g.Light_Gray, borderRadius: 5, opacity: .3
                                            }} />
                                        </TouchableOpacity>
                                    </>

                                )
                                }
                            />
                    }


                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        Emergency: state.Emergency.Emergency,
        loading: state.Emergency.loading,

    }
}
export default connect(mapStateToProps, { Get_Emergency })(withNavigation(Emergency));

