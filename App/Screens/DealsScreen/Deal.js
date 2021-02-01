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
import UserFooter from '../../Navigation/UserFooter';
import i18n from '../../i18n';
import Header from './header';
import CountryRegion from '../../Navigation/CountryRegion';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_offer } from '../../Actions/_get_offer';


const { width, height } = Dimensions.get("window");
const data = [{ name: 'معامل تحاليل' }, { name: 'صيدليات' },
{ name: 'مراكز أشعة' }, { name: 'أطباء' }]
class Deal extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.Get_offer(1, 2)
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
                                    style={style.view3}>
                                    <Text style={style.txt9}>
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
                            this.props.loading ?
                                <View style={{ marginTop: hp('35%') }} >
                                    <Spinner />
                                </View>

                                :
                                this.props.offers == '' ?
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
                                            data={this.props.offers}
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={[style.container, style.card,
                                                    { height: 300, flexDirection: 'column', marginBottom: 5 }]}>
                                                    <TouchableOpacity onPress={() => {
                                                        this.props.navigation.navigate('DealsModelScreen' , {
                                                            'ID' : item.placeId , 'Name' : item.placeName 
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

    

    }
}

export default connect(mapStateToProps, { Get_offer })(withNavigation(Deal));

