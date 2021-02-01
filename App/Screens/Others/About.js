import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput, StatusBar,
    TouchableOpacity, Platform, ImageBackground, Image,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions, VirtualizedList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import Header from '../DealsScreen/header';
import HeaderNav from '../../Navigation/HeaderNav';
import CountryRegion from '../../Navigation/CountryRegion';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <View style={{ flex: 1 }}>

                <HeaderNav title={g.ABOUT} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ zIndex: -1 }}>
                        <View style={{
                            marginLeft: 'auto', paddingHorizontal: 10,
                            width: 120, height: 80, backgroundColor: g.Light_Gray,
                            justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={styles.txtBold}>لوجو</Text>
                        </View>

                        <View style={{
                            width: wp('90'), justifyContent: 'center', marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <Text style={[styles.txt, { color: g.Gray, fontSize: 16 }]}>
                                تطبيق EXIR 360 سهل الاستخدام مخزن على السحابة الإليكترونية .. آمن تماما ..  خصوصية كاملة لملفك الطبي و تحكم تام في كيفية الوصول إليه.{'\n'}
خصوصيتك هي مهمتنا الرئيسية ، أظهر من بياناتك ما تريد لمن تريد فقط.{'\n'}
تجنب الأخطاء في صرف الأدوية الموصوفة لك.{'\n'}
سجلك الطبي وتقارير الأشعة والاختبارات المعملية والوصفات الطبية معك أينما كنت.{'\n'}
ملف تعريف فريد لك ولأي فرد من أفراد العائلة تقوم بإضافته ، مع خاصية التحقق المزدوج عند محاولة الوصول إلى ملف التعريف الصحي.{'\n'}
ابحث عن الوظائف غير الطبية التي تم نشرها بواسطة مقدمي الرعاية الصحية.{'\n'}
قم بتنفيذ الوصفة الطبية الخاصة بك عبر الإنترنت ، أو اطلب عبر الإنترنت ما تريده من أقرب الصيدليات.{'\n'}
أضف أطفالك و المسنين بسهولة إلى التطبيق ، و استمر بالاهتمام بهم.{'\n'}
اتصل بالطوارئ وابحث عن المتبرعين بالدم وتبرع بالدم.{'\n'}
                            </Text>
                        </View>

                        <View style={{
                            justifyContent: 'center', marginLeft: 'auto',
                            marginRight: 'auto', width: g.windowWidth, alignItems: 'center'
                        }} >
                            <Text style={styles.txtBold}>للمتابعة عبر وسائل التواصل</Text>
                            <View style={{
                                flexDirection: 'row-reverse', marginTop: 10, marginBottom: 5,
                                justifyContent: 'space-around', width: wp('40')
                            }}>

                                <Icon name='youtube' type='AntDesign' style={[styles.icon1, { color: g.Gray }]} />
                                <Icon name='instagram' type='AntDesign' style={[styles.icon1, { color: g.Gray }]} />
                                <Icon name='twitter' type='AntDesign' style={[styles.icon1, { color: g.Gray }]} />
                                <Icon name='facebook-f' type='FontAwesome' style={[styles.icon1, { color: g.Gray }]} />

                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );

    }
}
export default withNavigation(About);
