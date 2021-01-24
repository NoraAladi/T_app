import style from './style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, ScrollView, TextInput
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import styleLogin from '../LoginScreen/style';
import ModalCreateRequest from './ModalCreateRequest';
import UserFooter from '../../Navigation/UserFooter';

class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: '', Irea: '', icon: '',
            heightWithScroll: g.windowHeight,
            modal: false
        }
    }

    componentDidMount() {
        this._get_Design_Of_ONE_SCREEN()
    }

    _get_Design_Of_ONE_SCREEN() {
        const TITLE = this.props.navigation.getParam('TITLE');
        const IREA = this.props.navigation.getParam('IREA');
        const icon = this.props.navigation.getParam('icon');
        this.setState({
            Title: TITLE,
            Irea: IREA,
            icon: icon,
        })
    }






    render() {
        return (

            <View style={{ flex: 1, height: '100%', zIndex: -1, }}>


                {/* // Header  */}
                <View style={[style.container, { height: 70 }]}>
                    <View style={{ flexDirection: 'row-reverse', marginRight: wp('8%') }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.pop()
                        }}>
                            <Icon name="arrowright" type="AntDesign"
                                style={style.arrow} />
                        </TouchableOpacity>
                        <Text>     </Text>
                        <Text style={style.Title}> {this.state.Title} </Text>
                    </View>
                </View>

                {/* // Content  */}
                <View style={{ flexDirection: 'row',alignItems: 'center',justifyContent:'center',margin:10,}}>
                    <View style={{ marginLeft: wp('0%') }}>
                        <Text style={style.irea}>{this.state.Irea}</Text>
                        <View style={[style.container, style.view2]}>
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

                <View style={{ height:( g.windowHeight-210), alignItems: 'center' }} >
                    <FlatList
                        key={(item) => { item.id }}
                        showsVerticalScrollIndicator={false}
                        onEndReachedThreshold={.5}
                        onEndReached={() => { console.log('hegazy') }}
                        data={[1, 1, 1, 1, 1, 1]}
                        renderItem={({ item, index }) => (
                            <View style={style.info}>
                                <View style={[style.view_img, {
                                    backgroundColor:
                                        this.state.Title == g.DOCTOR_TITLE ? g.Samawe
                                            :
                                            this.state.Title == g.LAB_TITLE ? g.pink
                                                :
                                                this.state.Title == g.RAD_TITLE ? g.Peag
                                                    :
                                                    g.Move
                                }]}>
                                    <Image source={this.state.icon}
                                        style={{ width: 30, height: 30, marginTop: 0 }} />
                                </View>
                                <TouchableOpacity onPress={() => {
                                       
                                }}>
                                    <Text style={style.doctor_name}>
                                        د. محمد عبد الرازق خليفة </Text>

                                    <Text style={[style.doctor_name, { color: 'black', fontFamily: g.Regular }]}>
                                        أخصائي أمراض الباطنة </Text>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[style.doctor_name, { color: g.Gray, fontFamily: g.Regular }]}>
                                            ٢٣ ش صادق الرافعي من شارع الحجاز - مصر الجديدة</Text>
                                        <Icon name="location-pin" type="MaterialIcons"
                                            style={[style.arrow, { marginTop: 5, color: g.Gray }]} />
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[style.doctor_name, { color: g.Gray, fontFamily: g.Bold }]}>
                                            0124 5687 345 </Text>
                                        <Icon name="call" type="Ionicons" style={style.call} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                        )} />

                </View>

                <Modal
                    isOpen={this.state.modal}
                    swipeToClose={true}
                    backButtonClose={true}
                    coverScreen={true}
                    style={{
                        width: g.windowWidth,
                        height: g.windowHeight,
                        backgroundColor: '#00000020',
                    }}>

                    <View>
                        <View style={{
                            backgroundColor: g.white, height: g.windowHeight - 90,
                            borderTopLeftRadius: 35, borderTopRightRadius: 35,
                            marginTop: g.windowHeight - (g.windowHeight - 90),
                        }}>
                            <View
                                onStartShouldSetResponder={() => {
                                    this.setState({
                                        modal: !this.state.modal
                                    })
                                }}

                                style={{
                                    height: 5, backgroundColor: g.Light_Gray, width: 100,
                                    marginTop: 15, marginRight: 'auto', marginLeft: 'auto'
                                    , borderRadius: 10
                                }} />
                            {/*close bottom sheet*/}
                            <View style={{
                                flexDirection: 'row-reverse',
                                paddingHorizontal: 25, width: g.windowWidth,
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[styleLogin.login, {
                                    marginRight: 0, marginTop: 15,
                                    fontSize: 20
                                }]}>
                                    {g.CREATE_REQUEST}
                                </Text>
                                <Icon name='close' type='Ionicons'
                                    style={{ fontSize: 22, marginTop: 15, }}
                                    onPress={() => {
                                        this.setState({
                                            modal: !this.state.modal
                                        })
                                    }}
                                />
                            </View>
                            <ModalCreateRequest />
                        </View>
                    </View>

                </Modal>



            </View>
        );

    }
}
export default withNavigation(SearchList);
