import style from './style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, ScrollView, TextInput, Platform
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Title } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modalbox';
import styleLogin from '../LoginScreen/style';
import ModalCreateRequest from './ModalCreateRequest';
import CountryRegion from '../../Navigation/CountryRegion';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { Get_Doctor_Search } from '../../Actions/_get_doctor_search';
import { Get_LAB_RAD_PAHRMA_Search } from '../../Actions/_get_lab_search';



var TITLE = '', IREA, Filter_name, icon, Special
class SearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: '', Irea: '', icon: '',
            heightWithScroll: g.windowHeight,
            modal: false, loading_stop: 1
        }
    }
    _callApi = async (countryId, cityID) => {
        //  alert(countryId + '  ' + cityID)
        //if(TITLE==)
        if (TITLE == g.DOCTOR_TITLE) {
            this.props.Get_Doctor_Search(Filter_name, Special, countryId, cityID)
        }
        else if (TITLE == g.LAB_TITLE) {
            this.props.Get_LAB_RAD_PAHRMA_Search('MicrolabSearch', Filter_name, countryId, cityID)
        }
        else if (TITLE == g.RAD_TITLE) {
            //   this.props.Get_Doctor_Search( Filter_name , Special , 1 , 1  )
        }
        else null


    }

    componentDidMount() {
        this._get_Design_Of_ONE_SCREEN()
    }

    async _get_Design_Of_ONE_SCREEN() {
        TITLE = this.props.navigation.getParam('TITLE');
        IREA = this.props.navigation.getParam('IREA');
        icon = this.props.navigation.getParam('icon');
        Filter_name = this.props.navigation.getParam('Filter_name');
        Special = this.props.navigation.getParam('Special');
        this.setState({
            Title: TITLE,
            Irea: IREA,
            icon: icon,
        })
        if (TITLE == g.DOCTOR_TITLE) {
            this.props.Get_Doctor_Search(Filter_name, Special, 1, 1)
        }
        else if (TITLE == g.LAB_TITLE) {
            this.props.Get_LAB_RAD_PAHRMA_Search('MicrolabSearch', Filter_name, 1, 1)
        }
        else if (TITLE == g.RAD_TITLE) {
            this.props.Get_LAB_RAD_PAHRMA_Search('RadiologyCenterSearch', Filter_name, 1, 1)
        }
        else if (TITLE == g.PHARMA_TITLE)
            this.props.Get_LAB_RAD_PAHRMA_Search('PharmacySearch', Filter_name, 1, 1)

        else null
    }

    getCountryAndCityIds = async (countryId, cityId) => {
        await this.setState({
            cityId: cityId,
            countryId: countryId
        })
        if (TITLE == g.DOCTOR_TITLE) {
            this.props.Get_Doctor_Search(Filter_name, Special, countryId, cityId)
        }
        else if (TITLE == g.LAB_TITLE) {
            this.props.Get_LAB_RAD_PAHRMA_Search('MicrolabSearch', Filter_name, countryId, cityId)
        }
        else if (TITLE == g.RAD_TITLE) {
            this.props.Get_LAB_RAD_PAHRMA_Search('RadiologyCenterSearch', Filter_name, countryId, cityId)
        }
        else if (TITLE == g.PHARMA_TITLE) {
          await  this.props.Get_LAB_RAD_PAHRMA_Search('PharmacySearch', Filter_name, countryId, cityId)
           // alert(JSON.stringify(this.props.lab_rad))
        }
        else null
    }

    render() {

        return (

            <View style={{ flex: 1, height: '100%', zIndex: -1, }}>
                {/* // Header  */}
                <View style={[style.container, {
                    height: 70,
                    marginTop: Platform.OS == "ios" ? hp('5%') : null,
                }]}>
                    <View style={{ flexDirection: 'row-reverse', marginRight: wp('8%') }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.pop()
                        }}>
                            <Icon name="arrowright" type="AntDesign"
                                style={[style.arrow, { marginTop: Platform.OS == "ios" ? hp('1%') : hp('2%') }]} />
                        </TouchableOpacity>
                        <Text>     </Text>
                        <Text style={[style.Title]}> {this.state.Title} </Text>
                    </View>
                </View>

                {
                    this.state.Title == g.ROSHETA_NAME ?
                        <Text style={[style.Title,
                        { marginLeft: wp('40%'), marginTop: hp('1%'), width: wp('50') }]}>
                            {g.CHOOSE_PHARMACY} </Text>
                        : null
                }

                {/* // Content  */}
                <CountryRegion callApi={this.getCountryAndCityIds} />

                {
                  this.props.loading_doctor||
                   ( this.props.loading_lab  && 
                   ( TITLE == g.LAB_TITLE  ||  TITLE == g.RAD_TITLE  ||
                           TITLE == g.PHARMA_TITLE  ))
                   ?
                        <View style={{ marginTop: hp('35%') }} >
                            <Spinner />
                        </View>
                        :
                    ( this.props.doctor == '' && TITLE == g.DOCTOR_TITLE ) ||
                    ( this.props.lab_rad == ''  && 
                    ( TITLE == g.LAB_TITLE  ||  TITLE == g.RAD_TITLE  ||
                           TITLE == g.PHARMA_TITLE  )) ?
                            <Text style={style.no_data}>
                                {g.NO_DATA}
                            </Text>

                            :
                            <View style={{
                                height: this.state.Title != g.ROSHETA_NAME ? (g.windowHeight - 210)
                                    : (g.windowHeight - 100), alignItems: 'center'
                            }} >
                                <FlatList
                                    key={(item) => { item.id }}
                                    showsVerticalScrollIndicator={false}
                                    onEndReachedThreshold={.5}
                                    onEndReached={() => { console.log('hegazy') }}
                                    data={TITLE == g.DOCTOR_TITLE? this.props.doctor:this.props.lab_rad}
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
                                                //    alert(this.state.Title)
                                                if (this.state.Title == g.ROSHETA_NAME) {

                                                    this.props.navigation.navigate('DispenseScreen')
                                                }
                                                if ((this.state.Title == g.PHARMA_TITLE)) {
                                                    //   alert(g.PHRMA_NAME+'  '+ g.PHARMA_TITLE)
                                                    this.setState({
                                                        modal: !this.state.modal
                                                    })
                                                }
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
                                                    <Text style={[style.doctor_name, {
                                                        color: g.Gray,
                                                        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
                                                    }]}>
                                                        0124 5687 345 </Text>
                                                    <Icon name="call" type="Ionicons" style={style.call} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    )} />

                            </View>
                }
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
const mapStateToProps = state => {
    return {
        loading_doctor: state.doctor_search.loading_doctor,
        doctor: state.doctor_search.doctor,

        loading_lab: state.lab_search.loading_lab,
        lab_rad: state.lab_search.lab_rad,
    }
}

export default connect(mapStateToProps, { Get_Doctor_Search, Get_LAB_RAD_PAHRMA_Search })(withNavigation(SearchList));
