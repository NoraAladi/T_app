import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, Image,
    FlatList,
    ActivityIndicator,Linking
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';

import { Get_Jobs } from '../../Actions/_JobsAction';
import { connect } from 'react-redux'

import HeaderNav from '../../Navigation/HeaderNav';
import Spinner from '../../Navigation/Spinner';

import CountryRegion from '../../Navigation/CountryRegion';

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            cityId: 1,
            countryId: 1,
            loadmore: false
        };
        this.page = 1
    }
    async componentDidMount() {
        await this.props.Get_Jobs(1, 1, 1, 0)
        this.setState({
            jobs: this.props.jobs
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.jobs !== this.props.jobs) {
            console.log('Jobs Updated')
            this.setState({
                jobs: this.props.jobs,
                //cities: this.props.cities[0].cityNameAr,
            });
        }
    }
    getCountryAndCityIds = async (countryId, cityId) => {
        await this.setState({
            cityId: cityId,
            countryId: countryId
        })
        await this.props.Get_Jobs(countryId, cityId, 1, 0)
    }


    // renderListHeader = () => {
    //     return (

    //     )
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderNav title={g.JOBS} />
                <CountryRegion callApi={this.getCountryAndCityIds} />
                <View style={{ zIndex: -1 }}>
                    {this.props.loading && !this.state.loadmore ?
                        <View style={{ marginTop: '70%' }}>
                            <Spinner />
                        </View>
                        :
                        this.props.jobs == '' ?
                            <Text style={styles.noFound}>لا توجد بيانات</Text>
                            :
                            <View>
                                <FlatList
                                    style={{ height: hp('70') }}
                                    key={(item) => { item.id }}
                                    showsVerticalScrollIndicator={false}
                                    onEndReachedThreshold={.01}
                                    onEndReached={() => {
                                        console.log('saad')
                                        if (this.page < this.props.totalNumberOfPages) {
                                            this.setState({
                                                loadmore: true
                                            })
                                            this.page = this.page + 1
                                            this.props.Get_Jobs(this.state.countryId, this.state.cityId, this.page, 1)
                                        }
                                    }}
                                    data={this.state.jobs}
                                    // ListHeaderComponent={this.renderListHeader}

                                    renderItem={({ item, index }) => (
                                        <View style={styles.card}>
                                            <View style={[styles.img, {
                                                alignItems: "center",
                                                justifyContent: 'center'
                                            }]} >
                                                <Image source={{ uri: item.placeLogo }}
                                                    // resizeMode={'contain'}
                                                    // style={{
                                                    //     width: 60, height: 60,
                                                    // }}
                                                    style={{
                                                        width: 75,
                                                        height: 75,
                                                        borderRadius: 50
                                                        , overflow: 'hidden'
                                                    }}
                                                />
                                            </View>

                                            <View style={{ paddingHorizontal: 10, width: wp('60') }}>
                                                <Text style={[styles.txtBold, { color: g.Blue }]}>
                                                    {item.titleEn}
                                                </Text>

                                                <Text style={[styles.txt, {}]}>
                                                    {item.placeNameAR}
                                                </Text>

                                                <Text style={[styles.txt, { color: g.Light_Gray, marginTop: 5, width: wp('55') }]}>
                                                    {item.descriptionEn}
                                                </Text>

                                                <Text
                                                    onPress={()=>{Linking.openURL(`mailto:?to=${item.contactEmail}`);}}
                                                    style={[styles.txtBold, { fontSize: 13, color: g.Blue }]}>
                                                            {item.contactEmail}
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
                                                            {item.salary}
                                                        </Text>
                                                    </View>

                                                    

                                                </View>

                                            </View>

                                        </View>


                                    )} />
                            </View>
                    }
                    {this.props.loading && this.state.loadmore ?
                        <ActivityIndicator size='small' color='gray' style={{ marginTop: -5 }} />
                        : null}



                </View>
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        jobs: state.jobs.jobs,
        loading: state.jobs.loading,
        totalNumberOfPages: state.jobs.totalNumberOfPages
    }
}
export default connect(mapStateToProps, { Get_Jobs })(withNavigation(Jobs));