import style from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, FlatList,
    TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import g from '../../Gloabal';
import UserFooter from '../../Navigation/UserFooter';
import Header from './header';
import CountryRegion from '../../Navigation/CountryRegion';
import Spinner from '../../Navigation/Spinner'
import { Get_offer } from '../../Actions/_get_offer';
import { connect } from 'react-redux'
 
import { Get_offer_Types } from '../../Actions/getOffersSponserType';




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
            selectedTypeId: 2,
            cityId: 1,
            countryId: 1,
        }
    }

    async componentDidMount() {
        await this.props.Get_offer_Types(1, 1, this.state.selectedTypeId, 1)
    }

    getCountryAndCityIds = async (countryId, cityId) => {
        await this.setState({
            cityId: cityId,
            countryId: countryId
        })
        await this.props.Get_offer_Types(countryId, cityId, this.state.selectedTypeId, 1)
    }

    renderListHeader = () => {
        return (
            <View>
                <CountryRegion callApi={this.getCountryAndCityIds} />

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
                                        await this.props.Get_offer_Types(this.state.countryId, this.state.cityId, this.state.selectedTypeId, 1)
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
            <View style={style.forFlex}>
                <Header title={g.offer} />
                {this.renderListHeader()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{zIndex: -1}}>
                        {
                            this.props.loadingType ?
                                <View style={style.spinner} >
                                    <Spinner />
                                </View>
                                :
                                this.props.offersType == '' ?
                                    <Text style={style.no_data}>
                                        {g.NO_DATA}
                                    </Text>
                                    :
                                    <View style={style.flatListHeight} >
                                        <FlatList
                                            key={(item) => { item.id }}
                                            showsVerticalScrollIndicator={false}
                                            nestedScrollEnabled
                                            onEndReachedThreshold={.5}
                                            onEndReached={() => { console.log('paging') }}
                                            data={this.props.offersType}
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={[style.container, style.card, style.specificCard
                                                    ]}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.props.navigation.navigate('DealsModelScreen', {
                                                            'ID': item.id, 'Name': item.placeName
                                                        })
                                                    }}>
                                                        <Image source={require('../../Images/ads.png')}
                                                            style={style.imageCard} />
                                                    </TouchableOpacity>
                                                    <Image
                                                        source={require('../../Images/user.png')}
                                                        style={style.logo}
                                                    />
                                                    <Text style={[style.irea, style.minusMargin]}>
                                                        {item.titleEn}</Text>

                                                    <View style={style.simpleRowRevers}>
                                                        <Text style={[style.txt]}>
                                                            {item.placeName}</Text>

                                                        <View >
                                                            <Text
                                                                style={[style.txt, style.txt1]}>
                                                                {item.priceBefore} {g.POUND}</Text>
                                                            <Text style={[style.txt, style.specificTxt]}>
                                                                {item.priceAfter} {g.POUND}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={style.discount}>
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
        loadingType: state.offersType.loadingType,
        offersType: state.offersType.offersType,
    }
}

export default connect(mapStateToProps, { Get_offer, Get_offer_Types })(withNavigation(Deal));

