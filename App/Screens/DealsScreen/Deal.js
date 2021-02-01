import style from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, Dimensions, FlatList,
    TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import UserFooter from '../../Navigation/UserFooter';
import Header from './header';
import CountryRegion from '../../Navigation/CountryRegion';
import Spinner from '../../Navigation/Spinner'
import { Get_offer } from '../../Actions/_get_offer';
import { connect } from 'react-redux'

import { Get_offer_Types } from '../../Actions/getOffersSponserType';



const { width, height } = Dimensions.get("window");

const data =
    [
        { name: 'معامل تحاليل', id: 2 },
        { name: 'صيدليات', id: 4 },
        { name: 'مراكز أشعة', id: 3 },
        { name: 'أطباء', id: 1 }
    ]

class Deal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTypeId: 0
        }
    }

    componentDidMount() {
        this.props.Get_offer(1, 2, 1)
    }

    renderListHeader = () => {
        return (
            <View>
                <CountryRegion />

                <View style={style.flat}>
                    <FlatList
                        style={{ scaleX: -1 }}
                        key={(item) => {
                            item.id;
                        }}
                        showsHorizontalScrollIndicator={false}
                        data={data}
                        horizontal={true}
                        renderItem={({ item, index }) => (
                            <View style={style.center}>
                                <TouchableOpacity
                                    style={[style.view3, {

                                        backgroundColor: item.id == this.state.selectedTypeId ? '#c1dcff' : null,
                                        borderColor: item.id == this.state.selectedTypeId ? g.Blue : g.Light_Gray,
                                    }]}
                                    onPress={async () => {
                                        await this.setState({
                                            selectedTypeId: item.id
                                        })
                                        await this.props.Get_offer_Types(1, 1, this.state.selectedTypeId, 1)
                                    }}
                                >
                                    <Text style={[style.txt9, {
                                        color: item.id == this.state.selectedTypeId ? g.Blue : g.Light_Gray,
                                    }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            </View>
        );
    }


    render() {
        return (
            <View style={{ width: null, height: '100%', resizeMode: 'contain' }}>
                <Header title={g.offer} />
                {this.renderListHeader()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ zIndex: -1 }}>
                        {
                            (this.props.loading && this.state.selectedTypeId == 0)
                                || (this.props.loadingType && this.state.selectedTypeId != 0) ?
                                <View style={{ marginTop: hp('35%') }} >
                                    <Spinner />
                                </View>

                                :
                                (this.props.offers == '' && this.state.selectedTypeId == 0)
                                    || (this.props.offerType == null && this.state.selectedTypeId != 0) ?
                                    <Text style={style.no_data}>
                                        {g.NO_DATA}
                                    </Text>
                                    :
                                    <View style={{ height: g.windowHeight - 55 }} >
                                        <FlatList
                                            key={(item) => { item.id }}
                                            showsVerticalScrollIndicator={false}
                                            nestedScrollEnabled
                                            onEndReachedThreshold={.5}
                                            onEndReached={() => { console.log('saad') }}
                                            data={this.state.selectedTypeId == 0 ? this.props.offers : this.props.offerType}
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={[style.container, style.card,
                                                    { height: 300, flexDirection: 'column', marginBottom: 5 }]}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.props.navigation.navigate('DealsModelScreen', {
                                                            'ID': item.placeId, 'Name': item.placeName
                                                        })
                                                    }}>
                                                        <Image source={require('../../Images/ads.png')}
                                                            style={{
                                                                width: wp('90%'), height: hp('20%'), borderTopRightRadius: 10
                                                                , borderTopLeftRadius: 10
                                                            }} />
                                                    </TouchableOpacity>
                                                    <Image
                                                        source={require('../../Images/user.png')}
                                                        style={style.logo}
                                                    />
                                                    <Text style={[style.irea, { marginTop: hp('-2%'), color: g.Ferany }]}>
                                                        {item.placeName}</Text>

                                                    <View style={{ flexDirection: 'row-reverse' }}>
                                                        <Text style={[style.txt]}>
                                                            {item.titleEn}</Text>

                                                        <View style={{ flexDirection: 'column' }}>
                                                            <Text
                                                                style={[style.txt, style.txt1]}>
                                                                {item.priceBefore} {g.POUND}</Text>
                                                            <Text style={[style.txt, { width: 70, fontSize: 16, color: g.Blue }]}>
                                                                {item.priceAfter} {g.POUND}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={{ flexDirection: 'row-reverse', marginTop: hp('1%') }}>
                                                        <Text style={[style.txt, style.sale]}>
                                                            {item.discount}{g.DISCOUNT}</Text>
                                                        <Text style={[style.txt, style.txt2]}>
                                                            {g.OFFERS_SARY}   {item.toDate.split('T')[0]}</Text>
                                                    </View>

                                                </View>

                                            )} />
                                    </View>
                        }
                    </View>
                </ScrollView>
                <UserFooter tab={1} />


            </View>
        );

    }
}
const mapStateToProps = state => {
    return {
        loading: state.offer.loading,
        offers: state.offer.offers,

        loadingType: state.offerType.loadingType,
        offerType: state.offerType.offerType,


    }
}

export default connect(mapStateToProps, { Get_offer, Get_offer_Types })(withNavigation(Deal));

