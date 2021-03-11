import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, Image, FlatList,
    TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import HeaderNav from '../../Navigation/HeaderNav';
import { Get_Dependants } from '../../Actions/getDependantsAction';
import { connect } from 'react-redux'
import Spinner from '../../Navigation/Spinner'
import { delete_dependent } from '../../Actions/Del_Dependent_Action';

import Toast from 'react-native-easy-toast'
import AsyncStorage from '@react-native-community/async-storage';

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Dependants: [],
            userLoginId:0,
        };
        AsyncStorage.getItem('LOGIN_ID').then(val => {
            this.setState({
                userLoginId:val
            })
            
        })
    }
    async componentDidMount() {

        await this.props.Get_Dependants()
        this.setState({ Dependants: this.props.Dependants })
    }


    render() {
        return (
            <View>
                <HeaderNav title={g.USER_MANAGEMENT} />
                {this.props.loading ?
                    <View style={{ marginTop: hp('35%') }} >
                        <Spinner />
                    </View>
                    : this.props.Dependants == '' || this.props.Dependants.length==1?
                        <View style={{
                            height: 200,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={styles.noData}>
                                {'لم يتم اضافة مستخدمين بعد'}
                            </Text>
                        </View>
                        :
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: g.windowWidth,
                        }}>
                            <FlatList
                                style={{
                                    height: '88%'
                                }}
                                key={(item) => { item.id }}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={.1}
                                onEndReached={() => { console.log('saad') }}
                                data={this.state.Dependants}
                                renderItem={({ item, index }) => (
                                <>
                                    {this.state.userLoginId!=item.id ?

                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <View style={styles.box}>
                                            <Icon name='edit' type='MaterialIcons'
                                                style={[styles.icon, { marginLeft: 'auto', }]}
                                                onPress={() => {
                                                    this.props.navigation.navigate('NewUserScreen',
                                                        {
                                                            'edit': 'edit',
                                                            'dependentId': item.id
                                                        })
                                                }}
                                            />
                                            <Image style={[styles.img, { borderRadius: wp('50'), }]}
                                                resizeMode="contain"
                                                source={require('../../Images/user.png')}
                                            />
                                            <Text style={[styles.txtBold, { fontSize: 16, marginTop: -5, }]}>{item.fullNameAr}</Text>
                                            <Text style={[styles.txtBold, { fontSize: 12, marginTop: -5, }]}>{item.code}</Text>

                                            <TouchableOpacity style={[
                                                {
                                                    width: wp('45'), backgroundColor: '#FFDBDB80',
                                                    padding: 10, alignItems: 'center', marginTop: 15,
                                                    justifyContent: 'center', marginBottom: -15,
                                                    borderBottomLeftRadius: 10,
                                                    borderBottomRightRadius: 10,
                                                }
                                            ]}
                                                onPress={async () => {
                                                    await this.props.delete_dependent(item.id)
                                                    // alert(this.props.status)
                                                    if (this.props.status == 200) {
                                                        this.toast.show(`تم مسح ${item.fullNameAr} بنجاح`, 10000)
                                                        await this.props.Get_Dependants()
                                                        this.setState({ Dependants: this.props.Dependants })
                                                    }
                                                    else
                                                        this.toast.show('حدث خطأ حاول مرة اخرى', 10000)

                                                }}

                                            >
                                                <Text style={[styles.txt_btn, { color: '#E02020' }]}>
                                                    {g.DELETE}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :null}
                                    </>
                                )} />
                        </View>
                }

                <Toast
                    ref={(toast) => this.toast = toast}
                    style={{ backgroundColor: '#000' }}
                    positionValue={200}
                    fadeInDuration={1000}
                    fadeOutDuration={1000}
                    textStyle={{ color: 'white', fontFamily: g.Regular }}
                />
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.Dependants.loading,
        Dependants: state.Dependants.Dependants,

        loading_del: state.delDependent.loading_del,
        status: state.delDependent.status,

        user: state.auth.user
    }
}

export default connect(mapStateToProps, { Get_Dependants, delete_dependent })(withNavigation(UserManagement));
