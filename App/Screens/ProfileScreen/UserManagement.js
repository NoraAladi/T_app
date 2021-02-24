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

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Dependants: []
        };
    }
    async componentDidMount() {
        await this.props.Get_Dependants()
        this.setState({ Dependants: this.props.Dependants })
    }
    // componentDidUpdate(prevProps) {
    //     console.log(prevProps);
    //     if (this.props.Dependants == prevProps.Dependants ) {
    //     }

    // }
    render() {
        return (
            <View>
                <HeaderNav title={g.USER_MANAGEMENT} />
                {this.props.loading ?
                    <View style={{ marginTop: hp('35%') }} >
                        <Spinner />
                    </View>
                    :
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center', width: g.windowWidth,
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
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={styles.box}>
                                        <Icon name='edit' type='MaterialIcons'
                                            style={[styles.icon, { marginLeft: 'auto', }]}
                                            onPress={() => {
                                               // this.props.navigation.navigate('EditProfileScreen',{'id':item.id,})
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
                                        >
                                            <Text style={[styles.txt_btn, { color: '#E02020' }]}>
                                                {g.DELETE}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )} />
                    </View>
                }
            </View>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.Dependants.loading,
        Dependants: state.Dependants.Dependants,
    }
}

export default connect(mapStateToProps, { Get_Dependants })(withNavigation(UserManagement));
