import style from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, Dimensions, FlatList,
    TouchableOpacity, Platform, ImageBackground, I18nManager, KeyboardAvoidingView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import Header from './header';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_offer_details } from '../../Actions/_get_offer_details';

var ID = '', Name = ''

class DealsModelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '', ID: ''
        }
    }

    async componentDidMount() {
        ID = this.props.navigation.getParam('ID')
        Name = this.props.navigation.getParam('Name')
        this.setState({
            ID: ID, Name: Name
        })

        await this.props.Get_offer_details(ID)
    }

    renderContent = () => (
        <View
            style={{
                backgroundColor: g.white,
            }}>


            <View style={style.semi} />
            {
                this.props.loading ?
                    <View style={{ marginTop: hp('35%') }} >
                        <Spinner />
                    </View>

                    :
                    this.props.offers_details == '' ?
                        <Text style={style.no_data}>
                            {g.NO_DATA}
                        </Text>
                        :
                        <View style={{ alignItems: 'flex-end', padding: 20, }}>
                            <Text style={[style.txt, style.sale, { marginTop: hp('1%') }]}>
                                {this.props.offer_detail.discount}{g.DISCOUNT}</Text>

                            <Text style={[style.txt, style.txt3]}>
                                {this.props.offer_detail.descriptionEn}
                            </Text>

                            <Text
                                style={[style.txt, style.txt1, { marginTop: hp('1%') }]}>
                                {this.props.offer_detail.priceBefore} {g.POUND}</Text>
                            <Text style={[style.txt, style.txt4]}>
                                {this.props.offer_detail.priceAfter} {g.POUND}</Text>


                            <Text style={[style.txt, style.txt5]}>
                                {this.props.offer_detail.descriptionEn}
                            </Text>


                            <Text style={[style.txt, style.txt2, { marginTop: hp('2%') }]}>
                                {g.OFFERS_SARY}   {this.props.offer_detail.toDate.split('T')[0]}</Text>

                            <View style={style.line} />
                            <View style={{ flexDirection: 'row', margin: 20 }}>
                                <Text style={style.branch}>{i18n.t(g.BRANCH)}</Text>
                                <View style={[style.view1, { marginRight: wp('2%') }]}>
                                    <Text style={[style.username, {
                                        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,

                                    }]}>   {this.props.offer_detail.placeName} </Text>
                                    <Text style={[style.code, style.txt6]}>{this.props.offer_detail.titleEn}  </Text>
                                </View>
                                <Image source={require('../../Images/profile.png')}
                                    style={[style.userimg]} />

                            </View>
                            <View style={[style.line, { marginTop: hp('0%') }]} />
                            <Text style={[style.txt, style.txt7]}>
                                {i18n.t(g.HOWGETOFFER)}
                            </Text>

                            <Text style={[style.txt, style.txt8]}>
                                {this.props.offer_detail.descriptionEn}
                            </Text>
                        </View>
            }
        </View>
    );

    render() {
        return (

            <View style={{ height: '100%' }}>
                <BottomSheet
                    snapPoints={[Platform.OS == "ios" ? 650 : 500,
                    Platform.OS == "ios" ? 750 : 600, Platform.OS == "ios" ? 750 : 500]}
                    borderRadius={20}
                    renderContent={this.renderContent}
                />
                <View style={style.view2}>
                    <Image source={require('../../Images/ads.png')}
                        resizeMode='cover'
                        style={style.img} />
                    <View onStartShouldSetResponder={() => {
                        this.props.navigation.pop()
                    }} style={{
                        flexDirection: 'row', marginLeft : wp('60%')
                    }}>  
                        <Text  style={[style.title3 , {zIndex : 2}]}> {this.state.Name}</Text>
                        <Icon name="arrowdown" type="AntDesign"
                            style={[style.arrow, style.down]} />
                    </View>
                </View>

            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        loading: state.offers_details.loading,
        offer_detail: state.offers_details.offer_detail,


    }
}

export default connect(mapStateToProps, { Get_offer_details })(withNavigation(DealsModelScreen));
