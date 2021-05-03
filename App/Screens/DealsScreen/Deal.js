import style from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, Image, FlatList,ActivityIndicator,
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
import { ArabicNumbers } from 'react-native-arabic-numbers';
import moment from 'moment';

import FitImage from 'react-native-fit-image';
import { widthPercentageToDP } from 'react-native-responsive-screen';



const data =
    [
        { name: 'تحاليل', id: 2 },
        { name: 'صيدليات', id: 4 },
        { name: 'أشعة', id: 3 },
        { name: 'أطباء', id: 1 }
    ]

class Deal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTypeId: 2,
            loadPagination: false,
            refreshKey:true

        }
        this.page = 1
    }

    async componentDidMount() {
        await this.props.Get_offer_Types(this.state.selectedTypeId, 1)
        this.props.navigation.addListener('willFocus', () => {
            this.setState({
                refreshKey: !this.state.refreshKey
            })

        });
    }

    getCountryAndCityIds = async (countryId, cityId) => {
        await this.setState({
            cityId: cityId,
            countryId: countryId
        })
        await this.props.Get_offer_Types(this.state.selectedTypeId, 1)
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
                                        this.page=1
                                        await this.props.Get_offer_Types(this.state.selectedTypeId, 1)
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
                <Header key={this.state.refreshKey} title={g.offer} />
                {this.renderListHeader()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{ zIndex: -1 }}>
                        {
                            this.props.loadingType && !this.state.loadPagination ?
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
                                            onEndReached={async () => {
                                                if (this.page < this.props.totalPages) {
                                                    this.page = this.page + 1
                                                    this.setState({ loadPagination: true })
                                                    await this.props.Get_offer_Types(this.state.selectedTypeId, this.page)
                                                    this.setState({ loadPagination: false })
                                                }

                                            }}
                                            data={this.props.offersType}
                                            renderItem={({ item, index }) => (
                                                <TouchableOpacity
                                                    activeOpacity={.9}
                                                    onPress={() => {
                                                    this.props.navigation.navigate('DealsModelScreen', {
                                                        'ID': item.id, 'Name': item.placeNameAR,
                                                        'typeId': this.state.selectedTypeId
                                                    })
                                                }}>
                                                <View
                                                    style={[style.container, style.card, style.specificCard
                                                    ]}>
                                                  
                                                        <Image source={{ uri: item.imageEn }}
                                                            style={[style.imageCard]}
                                                            resizeMode='stretch'
                                                        />

                                                    
                                                        <FitImage
                                                            source={{ uri: item.placeLogo }}
                                                            style={{
                                                                marginLeft: 'auto', marginRight: 15,
                                                                borderRadius: 50, width: 50
                                                                , height: 50, overflow: 'hidden',
                                                                backgroundColor: '#fff',
                                                                elevation:2
                                                            }}
                                                            
                                                        />

                                                    <Text style={[style.irea, style.minusMargin]}>
                                                        {item.placeNameAR}</Text>

                                                    <View  style={[style.simpleRowRevers, style.rowTitle]}>
                                                        <Text
                                                            numberOfLines={2}
                                                            style={[style.txt, { width: '75%', marginTop: 10 }]}>
                                                            {item.titleEn}</Text>

                                                        <View style={{ width: '30%' }} >
                                                            <Text
                                                                style={[style.txt, style.txt1]}>
                                                                {item.priceBefore} {g.POUND}</Text>
                                                            <Text style={[style.txt, style.specificTxt]}>
                                                                {item.priceAfter} {g.POUND}</Text>
                                                        </View>
                                                    </View>

                                                    <View style={style.discount}>
                                                        <View style={style.saleView}>
                                                            <Text style={[style.sale]}>
                                                                {item.discount}{g.DISCOUNT}</Text>
                                                        </View>

                                                        <Text style={[style.txt2]}>
                                                            {g.OFFERS_SARY}   {ArabicNumbers(moment(item.toDate).format('DD-MM-YYYY'))}</Text>
                                                    </View>
                                                </View>
                                           </TouchableOpacity>
                                            )} />
                                    </View>
                        }
                        {this.state.loadPagination ?
                        <ActivityIndicator size='small' color='gray' style={{ marginTop: 5 }} />
                        : null}
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
        totalPages: state.offersType.totalPages,

    }
}

export default connect(mapStateToProps, { Get_offer, Get_offer_Types })(withNavigation(Deal));

