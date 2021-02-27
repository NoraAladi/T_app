import style from './style';
import React, { Component } from 'react';
import {
    Text, View, Image, Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../../Gloabal';
import i18n from '../../i18n';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_offer_details } from '../../Actions/_get_offer_details';


class DealsModelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.navigation.getParam('Name'),
            ID: this.props.navigation.getParam('ID')
        }
    }

    async componentDidMount() {

        await this.props.Get_offer_details(this.state.ID)
    }

    renderContent = () => (
        <View
            style={{
                backgroundColor: g.white,
            }}>


            <View style={style.semi} />
            {
                this.props.loading ?
                    <View style={style.spinnerTop} >
                        <Spinner />
                    </View>

                    :
                    this.props.offers_details == '' ?
                        <Text style={style.no_data}>
                            {g.NO_DATA}
                        </Text>
                        :
                        <View style={style.discountView}>
                            <Text style={[style.txt, style.sale, style.enter]}>
                                {this.props.offer_detail.discount}{g.DISCOUNT}</Text>

                            <Text style={[style.txt, style.txt3]}>
                                {this.props.offer_detail.descriptionEn}
                            </Text>

                            <Text
                                style={[style.txt, style.txt1, style.enter]}>
                                {this.props.offer_detail.priceBefore} {g.POUND}</Text>
                            <Text style={[style.txt, style.txt4]}>
                                {this.props.offer_detail.priceAfter} {g.POUND}</Text>


                            <Text style={[style.txt, style.txt5]}>
                                {this.props.offer_detail.descriptionEn}
                            </Text>


                            <Text style={[style.txt, style.txt2, style.enter2]}>
                                {g.OFFERS_SARY}
                                {this.props.offer_detail.toDate.split('T')[0]}
                            </Text>

                            <View style={style.line} />
                            <View style={style.viewBranch}>
                                <Text style={style.branch}>{i18n.t(g.BRANCH)}</Text>
                                <View style={[style.view1, style.enter2]}>
                                    <Text style={[style.username, style.txtIOS]}>   {this.props.offer_detail.placeName} </Text>
                                    <Text style={[style.code, style.txt6]}>{this.props.offer_detail.titleEn}  </Text>
                                </View>
                                <Image source={require('../../Images/profile.png')}
                                    style={[style.userimg]} />

                            </View>
                            <View style={[style.line]} />
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
                    }} style={style.popModal}>
                        <Text style={[style.title3]}> {this.state.Name}</Text>
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
