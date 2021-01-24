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

const { width, height } = Dimensions.get("window");
const data = [{ name: 'معامل تحاليل' }, { name: 'صيدليات' },
{ name: 'مراكز أشعة' }, { name: 'أطباء' }]
class Deal extends Component {
    constructor(props) {
        super(props);

    }



    renderListHeader = () => {
        return (
            <View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', margin: 20 }}>
                        <View style={{ marginLeft: wp('0%') }}>
                            <Text style={style.irea}>{i18n.t(g.IREA)}</Text>
                            <View style={[style.container, {
                                height: 50, width: 150, marginTop: hp('1%'), borderRadius: 10, paddingLeft: 10
                            }]}>
                                <Icon name="arrow-drop-down" type="MaterialIcons"
                                    style={[style.arrow, { marginTop: 0 }]} />
                                <Text style={style.city}>مصر الجديدة</Text>
                            </View>
                        </View>

                        <View style={{ marginLeft: wp('5%') }}>
                            <Text style={[style.irea, { marginLeft: wp('22%') }]}>{i18n.t(g.CITY)}</Text>
                            <View style={[style.container, style.pouns]}>
                                <Icon name="arrow-drop-down" type="MaterialIcons"
                                    style={[style.arrow, { marginTop: 0 }]} />
                                <Text style={style.city}>القاهرة</Text>
                            </View>
                        </View>

                    </View>
                </View>
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
                <Header />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ zIndex: -1 }}>

                        <View style={{height:g.windowHeight-55 }} >
                            <FlatList
                                ListHeaderComponent={this.renderListHeader}
                                key={(item) => { item.id }}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled
                                onEndReachedThreshold={.5}
                                onEndReached={() => { console.log('saad') }}
                                data={[1, 1, 1, 1, 1, 1]}
                                renderItem={({ item, index }) => (
                                    <View
                                        style={[style.container, style.card,
                                        { height: 300, flexDirection: 'column', marginBottom: 5 }]}>
                                        <TouchableOpacity onPress={() => {
                                            this.props.navigation.navigate('DealsModelScreen')
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
                                            صيدلية العزبي</Text>

                                        <View style={{ flexDirection: 'row-reverse' }}>
                                            <Text style={[style.txt]}>
                                                صيدلية العزبي عملتلكوا عروض كتير بخصومات لحد 50% …</Text>

                                            <View style={{ flexDirection: 'column' }}>
                                                <Text
                                                    style={[style.txt, style.txt1]}>
                                                    400 ج.م</Text>
                                                <Text style={[style.txt, { width: 70, fontSize: 16, color: g.Blue }]}>
                                                    200 ج.م</Text>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row-reverse', marginTop: hp('1%') }}>
                                            <Text style={[style.txt, style.sale]}>
                                                50% خصم</Text>
                                            <Text style={[style.txt, style.txt2]}>
                                                العرض ساري حتي ٢٨ يناير ٢٠٢١</Text>
                                        </View>

                                    </View>

                                )} />
                        </View>
                    </View>
                </ScrollView>
                <UserFooter tab={1} />


            </View>
        );

    }
}
export default withNavigation(Deal);
