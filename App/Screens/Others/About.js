import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, TouchableOpacity, Linking
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

import HeaderNav from '../../Navigation/HeaderNav';
import Spinner from '../../Navigation/Spinner'
import { Get_Social } from '../../Actions/_get_social';
import { connect } from 'react-redux'



class About extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    async componentDidMount() {
        await this.props.Get_Social()
    }


    render() {
        return (
            <View style={{ flex: 1 }}>

                <HeaderNav title={g.ABOUT} />

                {
                    this.props.loading ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>

                        :

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{ zIndex: -1 }}>
                                <View style={{
                                    marginLeft: 'auto', paddingHorizontal: 10,
                                    width: 120, height: 80,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>

                                    <Image source={require('../../Images/logo.png')}
                                        style={{ width: 100, height: 100 }}
                                        resizeMode='center'

                                    />
                                </View>

                                <View style={{
                                    width: wp('90'), justifyContent: 'center', marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}>
                                    <Text style={[styles.txt, { color: g.Gray, fontSize: 16 }]}>
                                      {this.props.social.aboutUs}
                                    </Text>
                                </View>

                                <View style={{
                                    justifyContent: 'center', marginLeft: 'auto',
                                    marginRight: 'auto', width: g.windowWidth, alignItems: 'center'
                                }} >
                                    <Text style={styles.txtBold}>للمتابعة عبر وسائل التواصل</Text>
                                    <View style={{
                                        flexDirection: 'row', marginTop: 10, marginBottom: 5,
                                        justifyContent: 'space-around', width: wp('40')
                                    }}>
                                        {this.props.social.socialChannelsResponse.map(item => {
                                            return (
                                                <TouchableOpacity onPress={() => {
                                                    Linking.openURL(item.channelLinkEN)
                                                }}>
                                                    <Icon name={item.channelNameEN == 'linkedIn' ? 'linkedin-square' : item.channelNameEN}
                                                        type={item.channelNameEN == 'facebook' ? 'FontAwesome' : 'AntDesign'}
                                                        style={[styles.icon1, { color: g.Gray }]} />
                                                </TouchableOpacity>
                                            )
                                        })}



                                    </View>
                                </View>

                            </View>
                        </ScrollView>
                }
            </View>
        );

    }
}



const mapStateToProps = state => {
    return {
        loading: state.social_channel.loading,
        social: state.social_channel.social,
    }
}

export default connect(mapStateToProps, { Get_Social })(withNavigation(About));

