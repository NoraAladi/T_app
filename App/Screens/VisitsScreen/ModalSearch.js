import styleLogin from '../LoginScreen/style';
import style from '../SearchScreen/style';

import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions, Image
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';


class ModalSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details_component: true,
            search_component: false
        };
    }

    render() {
        return (

            <View style={{ height: '100%' }}>
                {/*close bottom sheet*/}
                <View style={{
                    flexDirection: 'row-reverse',
                    paddingHorizontal: 10, width: g.windowWidth,
                }}>
                    <Icon name='arrowright' type='AntDesign'
                        style={{ fontSize: 22, marginTop: 25, paddingHorizontal: 15, }}
                        onPress={() => {
                            this.props.backModal()
                        }}
                    />
                    <Text style={[styleLogin.login, {
                        marginRight: 0, marginTop: 15,
                        fontSize: 20
                    }]}>
                        {g.SEARCH_PHARM}
                    </Text>

                </View>

                    <Text style={[style.irea,{margin: 10,paddingHorizontal: 15,}]}>{g.PHRMA_NAME}</Text>
                    <View style={[style.viewInput]}>
                        <TextInput
                            placeholder={g.PHRMA_NAME }
                            onChangeText={(search) => {
                                this.setState({
                                    search: search,
                                })
                            }}      
                            placeholderTextColor={g.Light_Gray}
                            style={[style.input]} />
                    </View>


                {/* // Content  */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, }}>
                    <View style={{ marginLeft: wp('0%') }}>
                        <Text style={style.irea}>{g.RAD_IREA}</Text>
                        <View style={[style.container, style.view2]}>
                            <Icon name="arrow-drop-down" type="MaterialIcons"
                                style={[style.arrow, { marginTop: 0 }]} />
                            <Text style={style.city}>مصر الجديدة</Text>
                        </View>
                    </View>

                    <View style={{ marginLeft: wp('5%') }}>
                        <Text style={[style.irea, { marginLeft: wp('22%') }]}>{g.CITY}</Text>
                        <View style={[style.container, style.pouns]}>
                            <Icon name="arrow-drop-down" type="MaterialIcons"
                                style={[style.arrow, { marginTop: 0 }]} />
                            <Text style={style.city}>القاهرة</Text>
                        </View>
                    </View>

                </View>

                <TouchableOpacity style={[styleLogin.btn, { marginTop:'auto' ,marginBottom: 'auto', }]}
                    onPress={async () => {
                        this.props.navigation.navigate('SearchListScreen' , {
                            'TITLE' : g.PHARMA_TITLE , 'IREA' : g.PHARMA_IREA ,
                            'color' : g.Move ,
                            'icon' : require('../../Images/listfour.png') , 
    
                        })
                        this.props.closeModal()

                    }}>
                    <Text style={[styleLogin.txt_btn,]}>
                        {g.SEARCH}</Text>
                </TouchableOpacity>


            </View>

        );
    }
}
export default withNavigation(ModalSearch);
