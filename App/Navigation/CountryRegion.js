import style from '../Screens/SearchScreen/style';
import styleSignUp from '../Screens/SignupScreen/styleSignUp';
import React, { Component } from 'react';
import {
    View, Text, FlatList, TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import g from '../Gloabal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Get_Country } from '../Actions/getCountryAction';
import { Get_City } from '../Actions/getCityAction';

import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import ScrollPicker from "react-native-wheel-scrollview-picker";



class CountryRegion extends Component {

    state = {
        countries: [],
        country: '',
        countryId: 1,
        showCountry: false,

        cities: [],
        region: '',
        regionId: 1,
        showRegion: false,

        countryNameArray: [],
        cityNameArray: [],

    }


    async _callApi() {
        // alert('country_id= ' + this.state.countryId + this.state.country + '\n' +
        //     'region_id= ' + this.state.regionId + this.state.region + '\n'
        // )

        this.props.callApi(this.state.countryId, this.state.regionId)

    }

    async saving() {

        AsyncStorage.getItem('countryIdKey').then(val => {
            //  console.log('countryIdKey: ' + val);
            if (val) {
                this.setState({

                    country: parseInt(val) != 0 ?
                        this.props.countries.find(x => x.id == parseInt(val)).nameAr
                        : 'اختر المحافظة',
                    countryId: parseInt(val),
                })
                AsyncStorage.getItem('cityIdKey').then(val => {
                    //     console.log('cityIdKey: ' + val);
                    //  alert(this.props.cities.find(x => x.id == parseInt(val)).cityNameAr)
                    this.setState({
                        region: parseInt(val) != 0 ?
                            this.props.cities.find(x => x.id == parseInt(val)).cityNameAr :
                            'اختر المنطقة',
                        regionId: parseInt(val),

                    })

                })
            }
            else {
                this.setState({
                    // region: this.props.cities[0].cityNameAr,
                    // country: this.props.countries[0].nameAr,
                    region: 'اختر المنطقة',
                    country: 'اخنر المحافظة',
                });
                AsyncStorage.setItem('cityIdKey', '0')
                AsyncStorage.setItem('countryIdKey', '0')
                this.props.Get_City(1)


            }
        })
    }
    async componentDidMount() {
        // AsyncStorage.removeItem('cityIdKey')
        // AsyncStorage.removeItem('countryIdKey')

        if (this.props.countries == '') {
            await this.props.Get_Country()

        }
        if (this.props.cities == '') {
            const id = await AsyncStorage.getItem('countryIdKey')
            await this.props.Get_City(id ? parseInt(id) : 1)
        }

        this.props.countries.map(item => {
            this.state.countryNameArray.push(item.nameAr)
        })

        this.props.cities.map(item => {
            this.state.cityNameArray.push(item.cityNameAr)

        })

        this.saving()

    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.cities !== this.props.cities) {
    //         this.saving()
    //     }
    // }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, }}>
                    <View style={{ marginLeft: wp('0%') }}>
                        <Text style={style.irea}>{g.IREA}</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={async () => {
                                await this.setState({
                                    showRegion: !this.state.showRegion
                                })
                                if (this.state.showRegion) {
                                    this.setState({
                                        showCountry: false
                                    })

                                }
                            }}
                        >
                            <View style={[style.container, style.pouns, {
                                justifyContent: 'space-between', elevation: 2,
                                paddingHorizontal: 15,
                            }]}>
                                <Icon name={this.state.showRegion ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={[style.arrow, { marginTop: 0 }]}
                                />
                                <Text style={style.city}>{this.state.region}</Text>
                            </View>
                        </TouchableOpacity>

                        {this.state.showCountry ?
                            <View style={styleSignUp.staticHeight} />
                            : null}

                        {/****dropdown */}

                        {this.state.showRegion ?

                            <ScrollPicker
                                ref={(sp) => { this.sp = sp }}
                                dataSource={this.state.cityNameArray}
                                selectedIndex={0}
                                itemHeight={40}
                                wrapperHeight={100}
                                highlightColor={g.Light_Gray}
                                onValueChange={async (data, selectedIndex) => {
                                    await this.setState({
                                        region: data,
                                        //  showRegion: false,
                                        regionId: this.props.cities[selectedIndex].id
                                    })
                                    AsyncStorage.setItem('cityIdKey', String(this.props.cities[selectedIndex].id))
                                    await this._callApi()
                                }}
                            />

                            : null}
                    </View>












                    <View style={{ marginLeft: wp('5%') }}>
                        <Text style={[style.irea, { marginLeft: wp('22%') }]}>{g.CITY}</Text>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={async () => {

                                await this.setState({
                                    showCountry: !this.state.showCountry
                                })
                                if (this.state.showCountry) {
                                    this.setState({
                                        showRegion: false
                                    })

                                }
                            }}
                        >
                            <View style={[style.container, style.pouns, {
                                justifyContent: 'space-between', elevation: 2,
                                paddingHorizontal: 15,
                            }]}>
                                <Icon name={this.state.showCountry ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                    style={[style.arrow, { marginTop: 0 }]}

                                />
                                <Text style={[style.city]}>{this.state.country}</Text>
                            </View>
                        </TouchableOpacity>

                        {this.state.showRegion ?
                            <View style={styleSignUp.staticHeight} />
                            : null}

                        {this.state.showCountry ?
                            <ScrollPicker
                                ref={(sp) => { this.sp = sp }}
                                dataSource={this.state.countryNameArray}
                                selectedIndex={this.state.countryId - 1}
                                itemHeight={40}
                                wrapperHeight={100}
                                highlightColor={g.Light_Gray}
                                onValueChange={async (data, selectedIndex) => {
                                    this.setState({
                                        country: data,
                                        //  showCountry: false,
                                        countryId: this.props.countries[selectedIndex].id,

                                    })
                                    AsyncStorage.setItem('countryIdKey', String(this.props.countries[selectedIndex].id))
                                    await this.props.Get_City(this.props.countries[selectedIndex].id)
                                    await this.setState({
                                        regionId: this.props.cities[0].id,
                                        region: this.props.cities[0].cityNameAr,
                                        cityNameArray: []
                                    })
                                    this.props.cities.map(item => {
                                        this.state.cityNameArray.push(item.cityNameAr)

                                    })
                                    AsyncStorage.setItem('cityIdKey', String(this.props.cities[0].id))

                                    await this._callApi()
                                }}
                            />

                            : null}



                    </View>

                </View>



            </View>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.countries.countries,
        cities: state.cities.cities,

    };
};

export default connect(mapStateToProps, { Get_Country, Get_City })(
    withNavigation(CountryRegion),
);