import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, Image, FlatList,
    TouchableOpacity, Modal, ScrollView
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
            userLoginId: 0,
            ModalAlert: false,
            deleteObj: {}
        };
        AsyncStorage.getItem('LOGIN_ID').then(val => {
            this.setState({
                userLoginId: val
            })

        })
    }
    async componentDidMount() {

        await this.props.Get_Dependants()
        this.setState({ Dependants: this.props.Dependants })
    }

    async deleteDpendant() {
        this.setState({ ModalAlert: false })
        await this.props.delete_dependent(this.state.deleteObj.id)
        // alert(this.props.status)
        if (this.props.status == 200) {
            this.toast.show(`تم مسح ${this.state.deleteObj.fullNameAr} بنجاح`, 3000)
            await this.props.Get_Dependants()
            this.setState({ Dependants: this.props.Dependants })
        }
        else
            this.toast.show('حدث خطأ حاول مرة اخرى', 3000)

    }
    render() {
        return (
            <View>
                <HeaderNav title={g.USER_MANAGEMENT} />
                {this.props.loading ?
                    <View style={{ marginTop: hp('35%') }} >
                        <Spinner />
                    </View>
                    : this.props.Dependants == '' || this.props.Dependants.length == 1 ?
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

                                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={styles.box}>
                                                <Icon name='edit' type='MaterialIcons'
                                                    style={[styles.icon, { marginLeft: 'auto', }]}
                                                    onPress={() => {
                                                        if (this.state.userLoginId == item.id) {
                                                            this.props.navigation.navigate('EditProfileScreen', {
                                                                'id': item.id
                                                            })

                                                        }
                                                        else {
                                                            this.props.navigation.navigate('NewUserScreen',
                                                                {
                                                                    'edit': 'edit',
                                                                    'dependentId': item.id
                                                                })
                                                        }
                                                        AsyncStorage.setItem('gender', String(item.gender))

                                                    }}
                                                />
                                                <Image style={[styles.img, { borderRadius: wp('50'), }]}
                                                    resizeMode="contain"
                                                    source={item.personalPhoto ? { uri: item.personalPhoto } : require('../../Images/noUser.png')}
                                                />
                                                <Text style={[styles.txtBold, { fontSize: 16, marginTop: -5, }]}>{item.fullNameAr}</Text>
                                                <Text style={[styles.txtBold, { fontSize: 12, marginTop: -5, }]}>{item.code}</Text>
                                                {this.state.userLoginId != item.id ?

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
                                                            this.setState({
                                                                deleteObj: item,
                                                                ModalAlert: true
                                                            })
                                                        }}>
                                                        <Text style={[styles.txt_btn, { color: '#E02020' }]}>
                                                            {g.DELETE}</Text>
                                                    </TouchableOpacity>
                                                    : <View style={[
                                                        {
                                                            width: wp('45'), height: hp('6.5')
                                                        }
                                                    ]} />}
                                            </View>
                                        </View>
                                    </>
                                )} />

                            <Modal
                                //   animationType="slide"
                                transparent={true}
                                visible={this.state.ModalAlert}
                            >

                                <View style={{
                                    flex: 1,
                                    backgroundColor: '#00000090',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <View
                                        elevation={4}
                                        style={{
                                            width: g.windowWidth - 80,
                                            height: g.windowHeight / 3,
                                            borderRadius: 10,
                                            backgroundColor: 'white',
                                            alignItems: 'center',
                                            justifyContent: 'center',

                                        }}>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            <Image
                                                style={{
                                                    width: 50, height: 50,
                                                    marginRight: 'auto',
                                                    marginLeft: 'auto', marginTop: 25,
                                                }}
                                                resizeMode='contain'
                                                source={require('../../Images/caution.png')} />

                                            <Text style={{
                                                fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, fontSize: 16,
                                                textAlign: 'center',
                                            }}>
                                                {'هل انت متأكد من حذف '+this.state.deleteObj.fullNameAr+'؟'}
                                            </Text>
                                            <Text style={{
                                                fontFamily: g.Regular, fontSize: 14,
                                                textAlign: 'center', width: g.windowWidth - 100,
                                            }}>
                                                {`في حالة حذف ${this.state.deleteObj.fullNameAr} ، لن يتمكن من إعادة استرجاع البيانات الخاصة به.`}
                                            </Text>
                                        </ScrollView>

                                        <View
                                            elevation={5}
                                            style={{
                                                width: g.windowWidth - 80,
                                                height: 60,
                                                justifyContent: 'space-around',
                                                flexDirection: 'row-reverse', alignItems: 'center',
                                                paddingHorizontal: 20,

                                            }}>
                                            <Text
                                                onPress={async () => {
                                                    //callApi    
                                                    this.deleteDpendant()

                                                }}
                                                style={{
                                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, fontSize: 16,
                                                    textAlign: 'center',
                                                    width: (g.windowWidth - 80) / 2,
                                                    color: '#E02020'
                                                }}>
                                                {g.CONTINUE}
                                            </Text>
                                            <View style={{ height: 35, width: 2, backgroundColor: g.Light_Gray }} />
                                            <Text
                                                onPress={() => {
                                                    this.setState({
                                                        ModalAlert: false
                                                    })
                                                }}

                                                style={{
                                                    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, fontSize: 16,
                                                    textAlign: 'center',
                                                    width: (g.windowWidth - 80) / 2,
                                                    color: g.Blue
                                                }}>
                                                رجوع
                                </Text>
                                        </View>

                                    </View>

                                </View>
                            </Modal>

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
