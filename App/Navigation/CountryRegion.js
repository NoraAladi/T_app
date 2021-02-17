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
import axios from 'axios';


class CountryRegion extends Component {

    state = {
        countries: [],
        country: '',
        countryId: 1,
        showCountry: false,

        cities: [],
        region: '',
        regionId: 1,
        showRegion: false
    }
    /*    async getCountry(token) {
           try {
               let resp = await axios.get(`${g.BASE_URL}/api/MasterData/Governorates`,
                   {
                       headers:
                       {
                           'accept': 'text/plain',
                           'authorizationKey': g.authorizationKey,
                           'Authorization': `Bearer ${token}`,
   
                       }
                   })
               console.log('______Country______');
               console.log(resp.data);
               this.setState({
                   countries: resp.data,
                   country: resp.data[0].nameAr
               })
   
           } catch (error) {
               if (error.response) {
                   console.log(error.response.status);
               }
           }
       }
   
       async getCity(token, id) {
           try {
               let resp = await axios.get(`${g.BASE_URL}/api/MasterData/Cities?governorateId=${id}`,
                   {
                       headers:
                       {
                           'accept': 'text/plain',
                           'authorizationKey': g.authorizationKey,
                           'Authorization': `Bearer ${token}`,
   
                       }
                   })
               console.log('______ City ______');
               console.log(resp.data);
               this.setState({
                   cities: resp.data,
                   region: resp.data[0].cityNameAr
               })
               await AsyncStorage.setItem('CityId', String(resp.data.id))
   
   
           } catch (error) {
               if (error.response) {
                   console.log(error.response.status);
               }
           }
       } */

    async _callApi() {
        // alert('country_id= ' + this.state.countryId + this.state.country + '\n' +
        //     'region_id= ' + this.state.regionId + this.state.region + '\n'
        // )

        this.props.callApi(this.state.countryId, this.state.regionId)

    }

    async componentDidMount() {
         AsyncStorage.getItem('app_Token').then(token => {
            this.props.Get_City(token, 1)
        })
        if (this.props.countries == '') {
             AsyncStorage.getItem('app_Token').then(token => {
                this.props.Get_Country(token)
            })
        }
        else {
            this.setState({
                region: this.props.cities[0].cityNameAr,
                country: this.props.countries[0].nameAr,

            });
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.countries !== this.props.countries) {
            this.setState({
                country: this.props.countries[0].nameAr,
                //cities: this.props.cities[0].cityNameAr,
            });
        }
        if (prevProps.cities !== this.props.cities) {
            this.setState({
                region: this.props.cities[0].cityNameAr,
            });

        }
        //alert(this.state.region+'\n'+this.state.countries)
    }

    render() {
        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 10, }}>
                    <View style={{ marginLeft: wp('0%') }}>
                        <Text style={style.irea}>{g.IREA}</Text>
                        <View style={[style.container, style.pouns, {
                            justifyContent: 'space-between', elevation: 2,
                            paddingHorizontal: 15,
                        }]}>
                            <Icon name={this.state.showRegion ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                style={[style.arrow, { marginTop: 0 }]}
                                onPress={async () => {
                                    await this.setState({
                                        showRegion: !this.state.showRegion
                                    })
                                    if (this.state.showRegion) {
                                        this.setState({
                                            showCountry: false
                                        })

                                    }
                                }} />
                            <Text style={style.city}>{this.state.region}</Text>
                        </View>
                        {this.state.showCountry ?
                            <View style={styleSignUp.staticHeight} />
                            : null}

                        {/****dropdown */}

                        {this.state.showRegion ?
                            <View style={[styleSignUp.dropDownView, {
                                marginTop: -18,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                height: 120,
                                width: wp('42.5')
                            }]}>
                                <FlatList
                                    ListFooterComponent={() => <Text>{ }</Text>}

                                    nestedScrollEnabled
                                    // showsVerticalScrollIndicator={false}
                                    style={{ padding: 10 }}
                                    data={this.props.cities}
                                    renderItem={({ item, index }) => (
                                        <View
                                        >
                                            <TouchableOpacity onPress={async () => {
                                                await this.setState({
                                                    region: item.cityNameAr,
                                                    showRegion: false,
                                                    regionId: item.id
                                                })
                                                await this._callApi()
                                            }}>
                                                <Text style={[styleSignUp.dropDownTxt, {
                                                    fontSize: 12,
                                                    //   color: g.Light_Gray,
                                                    textAlign: 'right'
                                                }]}>{item.cityNameAr}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                            : null}
                    </View>












                    <View style={{ marginLeft: wp('5%') }}>
                        <Text style={[style.irea, { marginLeft: wp('22%') }]}>{g.CITY}</Text>
                        <View style={[style.container, style.pouns, {
                            justifyContent: 'space-between', elevation: 2,
                            paddingHorizontal: 15,
                        }]}>
                            <Icon name={this.state.showCountry ? "arrow-drop-up" : "arrow-drop-down"} type="MaterialIcons"
                                style={[style.arrow, { marginTop: 0 }]}
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
                            />
                            <Text style={[style.city]}>{this.state.country}</Text>
                        </View>

                        {this.state.showRegion ?
                            <View style={styleSignUp.staticHeight} />
                            : null}

                        {this.state.showCountry ?
                            <View style={[styleSignUp.dropDownView, {
                                marginTop: -15,
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                height: 120,
                                width: wp('42.5')
                            }]}>
                                <FlatList
                                    ListFooterComponent={() => <Text>{ }</Text>}

                                    nestedScrollEnabled
                                    //   showsVerticalScrollIndicator={false}
                                    style={{ padding: 10, }}
                                    data={this.props.countries}
                                    renderItem={({ item, index }) => (
                                        <View >
                                            <TouchableOpacity onPress={async () => {
                                                this.setState({
                                                    country: item.nameAr,
                                                    showCountry: false,
                                                    countryId: item.id,

                                                })

                                                await AsyncStorage.getItem('app_Token').then(async (token) => {
                                                    await this.props.Get_City(token, item.id)
                                                })
                                                await this.setState({
                                                    regionId: this.props.cities[0].id
                                                })
                                                await this._callApi()

                                            }}>
                                                <Text style={[styleSignUp.dropDownTxt, {
                                                    fontSize: 12,
                                                    //color: g.Light_Gray,
                                                    textAlign: 'right'
                                                }]}>{item.nameAr}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
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