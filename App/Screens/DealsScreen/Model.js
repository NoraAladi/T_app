import style from './style';
import React, { Component } from 'react';
import {
    Text, View, Image, Platform,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../../Gloabal';
import BottomSheet from 'reanimated-bottom-sheet';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_offer_details } from '../../Actions/_get_offer_details';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import FitImage from 'react-native-fit-image';

class DealsModelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.navigation.getParam('Name'),
            ID: this.props.navigation.getParam('ID'),
            typeId: this.props.navigation.getParam('typeId')
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
                            <View style={style.saleView}>
                            <Text style={[style.sale, ]}>
                                {this.props.offer_detail.discount}{g.DISCOUNT}</Text>
</View>
                            <Text style={[style.txt, style.txt3]}>
                                {this.props.offer_detail.titleEn}
                            </Text>

                            <Text
                                style={[style.txt, style.txt1, style.enter]}>
                                {this.props.offer_detail.priceBefore} {g.POUND}</Text>
                            <Text style={[style.txt, style.txt4]}>
                                {this.props.offer_detail.priceAfter} {g.POUND}</Text>


                            <Text style={[style.txt, style.txt5]}>
                                {this.props.offer_detail.descriptionEn}
                            </Text>


                            <Text style={[style.txt2, style.enter2]}>
                                {g.OFFERS_SARY}
                                {'  ' + ArabicNumbers(moment(this.props.offer_detail.toDate).format('DD-MM-YYYY'))}
                            </Text>

                            <View style={style.line} />

                            <View style={[style.viewBranch, { alignItems: 'center' }]}>
                                <View style={[style.view1, style.enter2, { marginLeft: '25%' }]}>
                                    <Text style={[style.username,
                                    style.txtIOS, { textAlign: 'right', marginTop: -15 }]}>
                                        {this.props.offer_detail.placeNameAR} </Text>

                                    <Text style={[style.code, style.txt6]}>{this.state.typeId == 1 ? 'عيادة'
                                        : this.state.typeId == 2 ? 'معمل تحاليل'
                                            : this.state.typeId == 3 ? 'مركز اشعة'
                                                : 'صيدلية'

                                    }  </Text>
                                </View>

                                <View style={{
                                    marginLeft: 10,
                                    justifyContent: 'center', alignItems: 'center',
                                    borderColor: g.Light_Gray,
                                    borderWidth: .5,
                                    borderRadius: widthPercentageToDP('50'),
                                    padding: 7,
                                }}>
                                    <FitImage
                                        source={{ uri: this.props.offer_detail.placeLogo }}
                                        style={style.fitImageWithSize}
                                    />
                                </View>


                            </View>

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
                <View style={[style.view2]}>
                    <Image source={{ uri: this.props.offer_detail.imageEn }}
                        resizeMode='contain'
                        style={style.img} />
                    <View
                        style={style.popModal}

                        onStartShouldSetResponder={() => {
                            this.props.navigation.pop()
                        }} >
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