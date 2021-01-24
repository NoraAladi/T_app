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

class DealsModelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    renderContent = () => (
        <View
            style={{
                backgroundColor: g.white,
            }}>

           <View style={ style.semi} />
            <View style={{ alignItems: 'flex-end', padding: 20 , }}>
                <Text style={[style.txt, style.sale, { marginTop: hp('1%') }]}>
                    50% خصم</Text>

                <Text style={[style.txt, style.txt3]}>
                    صيدلية العزبي عملتلكوا عروض كتير بخصومات لحد 50% على منتجات مختلفة عشان نفرحها بهدية مختلفة
                    </Text>

                <Text
                    style={[style.txt, style.txt1, { marginTop: hp('1%') }]}>
                    400 ج.م</Text>
                <Text style={[style.txt, style.txt4]}>
                    200 ج.م</Text>


                <Text style={[style.txt, style.txt5]}>
                    بندور على هدية مميزة نشكر بيها ماما ونفرحها… وعشان متحتاروش كتير #صيدلية_العزبي عملتلكوا عروض كتير بخصومات لحد 50% على منتجات مختلفة عشان نفرحها بهدية مختلفة… العروض هتلاقوها في كل فروعنا من يوم 14/3 ولحد يوم 1/4
                    </Text>


                <Text style={[style.txt, style.txt2, { marginTop: hp('2%') }]}>
                    العرض ساري حتي ٢٨ يناير ٢٠٢١</Text>

                <View style={style.line} />
                <View style={{ flexDirection: 'row', margin: 20 }}>
                    <Text style={style.branch}>{i18n.t(g.BRANCH)}</Text>
                    <View style={[style.view1, { marginRight: wp('2%') }]}>
                        <Text style={[style.username, { fontFamily: g.Bold }]}> صيدلية العزبي </Text>
                        <Text style={[style.code, style.txt6]}>صيدلية  </Text>
                    </View>
                    <Image source={require('../../Images/profile.png')}
                        style={[style.userimg]} />

                </View>
                <View style={[style.line, { marginTop: hp('0%') }]} />
                <Text style={[style.txt, style.txt7]}>
                    {i18n.t(g.HOWGETOFFER)}
                </Text>

                <Text style={[style.txt, style.txt8]}>

                    هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء.                      </Text>
            </View>
        </View>
    );
    
    render() {
        return (

            <View style = {{ height : '100%'}}>
               <BottomSheet
                    snapPoints={[ 500 , 600 , 500   ]}
                    borderRadius={20}
                    renderContent={this.renderContent}
                />
                <View style={style.view2}>
                    <Image source={require('../../Images/ads.png')}
                        resizeMode='cover'
                        style={style.img} />
                    <View onStartShouldSetResponder={() => {
                        this.props.navigation.pop()

                    }} style={{ flexDirection: 'row', marginLeft: 'auto' , backgroundColor : 'red' }}>
                        <Text style={style.title3}> صيدلية العزبي عملتلكوا عروض … </Text>

                        <Icon name="arrowdown" type="AntDesign"
                            style={[style.arrow, style.down]} />
                    </View>
                </View>
               
            </View>
        );

    }
}
export default withNavigation(DealsModelScreen);
