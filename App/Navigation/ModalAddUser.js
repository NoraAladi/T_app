import styleLogin from '../Screens/LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, StyleSheet,
    Image, FlatList
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../App/Gloabal';
import Modal from 'react-native-modalbox';
import { Get_Dependants } from '../Actions/getDependantsAction';
import { connect } from 'react-redux'

class ModalAddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
    }

    async componentDidMount() {
        await this.props.Get_Dependants()
        //   alert(JSON.stringify(this.props.Dependants))
    }

    renderListHeader = () => {
        return (
            <TouchableOpacity

                onPress={() => {
                    this.props.closeModel()
                    // this.setState({
                    //     modal:!this.state.modal
                    // })
                    this.props.navigation.navigate('NewUserScreen')

                }}>
                <View style={styles.center}>
                    <View style={styles.circle}>
                        <Icon name='plus' type='AntDesign' style={{ fontSize: 44, color: g.Blue }} />
                    </View>
                    <Text style={[styleLogin.txt_btn, styles.activeTxt]}>{g.ADD_NEW_USER}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    isOpen={this.state.modal}
                    swipeToClose={true}
                    backButtonClose={true}
                    coverScreen={true}
                    style={{
                        width: g.windowWidth,
                        height: g.windowHeight,
                        backgroundColor: '#00000020',
                    }}
                    onClosed={() => {
                        this.props.closeModel()
                    }}
                >

                    <View>
                        <View style={{
                            backgroundColor: g.white, height: g.windowHeight / 2,
                            borderTopLeftRadius: 20, borderTopRightRadius: 20,
                            marginTop: g.windowHeight - (g.windowHeight / 2),
                        }}>
                            <View


                                style={{
                                    height: 6.5, backgroundColor: g.Light_Gray, width: 80,
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
                                    {g.SELECT_USER}
                                </Text>

                                <Icon name='close' type='Ionicons'
                                    style={{ fontSize: 24, marginTop: 24, }}
                                    onPress={() => {
                                        this.props.closeModel()
                                        // this.setState({
                                        //     modal: !this.state.modal
                                        // })
                                    }}
                                />
                            </View>


                            <View style={{
                                marginTop: hp('5'), paddingHorizontal: 15,
                                width: g.windowWidth, flexDirection: 'row'
                            }}>


                                <FlatList
                                    //  snapToInterval={g.windowWidth}
                                    ListHeaderComponent={this.renderListHeader}

                                    ///   pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    nestedScrollEnabled
                                    onEndReachedThreshold={.1}
                                    onEndReached={() => { console.log('saad') }}
                                    data={this.props.Dependants}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity>
                                            <View>
                                                <View style={styles.circle}>
                                                    <Image source={item.personalPhoto ? { uri: item.personalPhoto } : require('../Images/notFoundImage.png')}

                                                        style={{ width: 84, height: 84, borderRadius: 42 }} />
                                                </View>
                                                <Text style={[styleLogin.txt_btn, styles.activeTxt, { fontFamily: g.Regular, color: 'black' }]}>
                                                    {item.fullNameEn}
                                                </Text>
                                                <Text style={[styleLogin.txt_btn, styles.activeTxt, {
                                                    color: 'black', marginTop: -5
                                                }]}>
                                                    {item.code}
                                                </Text>

                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>


                        </View>
                    </View>

                </Modal>


            </View>

        );
    }
}


const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle:
    {
        width: 88, height: 88, borderRadius: 44, alignItems: 'center',
        borderWidth: 2, borderColor: g.Blue, justifyContent: 'center', margin: 5,
    }
    ,
    activeTxt: {
        textAlign: 'center', color: g.Blue, fontSize: 14, width: 100
    },
});

const mapStateToProps = state => {
    return {
        loading: state.Dependants.loading,
        Dependants: state.Dependants.Dependants,
    }
}

export default connect(mapStateToProps, { Get_Dependants })(withNavigation(ModalAddUser));
