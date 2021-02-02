import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground, Image,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions
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

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderListHeader = () => {
        return (
            <CountryRegion />

        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderNav title={g.JOBS} />

                <View style={{ zIndex: -1 }}>

                    <FlatList
                        style={{ height: g.windowHeight - 100 }}
                        key={(item) => { item.id }}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={.1}
                        onEndReached={() => { console.log('saad') }}
                        data={[1, 1, 1, 1, 1, 1]}
                        ListHeaderComponent={this.renderListHeader}

                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <View>
                                    <Image source={require('../../Images/user.png')}
                                        style={styles.img} />
                                </View>

                                <View style={{ paddingHorizontal: 10, width: wp('60') }}>
                                    <Text style={[styles.txtBold, { color: g.Blue }]}>
                                        سكرتير عيادات
                                </Text>

                                    <Text style={[styles.txt, {}]}>
                                        مركز ZO للأمراض الجلدية • القاهرة
                                </Text>

                                    <Text style={[styles.txt, { color: g.Light_Gray, marginTop: 5, width: wp('55') }]}>
                                        مطلوب اطباء لمركز طبي مجهز بأحدث الاجهزة و معمل تحاليل و مركز اشعه جلديه العمر من 25 الي 45 عام
                                </Text>

                                    <View style={{
                                        flexDirection: 'row-reverse',
                                        // paddingHorizontal: 88,
                                    }}>
                                        <View style={{ width: wp('20') }}>
                                            <Text style={[styles.txt, { color: g.Light_Gray, marginTop: 5 }]}>
                                                المرتب
                                        </Text>

                                            <Text style={[styles.txtBold, { fontSize: 15 }]}>
                                                غير محدد
                                        </Text>
                                        </View>

                                        <View style={{ width: wp('40') }}>
                                            <Text style={[styles.txt, { color: g.Light_Gray, marginTop: 5 }]}>
                                                التواصل
                                        </Text>

                                            <Text style={[styles.txtBold, { fontSize: 15 }]}>
                                                test@ewegiw.edu
                                        </Text>
                                        </View>

                                    </View>

                                </View>

                            </View>


                        )} />






                </View>
            </View>
        );

    }
}
export default withNavigation(Jobs);
/**                        <View style={{ height: 15 }} />
 */