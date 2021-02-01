import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput, Image, FlatList,
    TouchableOpacity, Platform, AppState, ImageBackground, I18nManager
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import HeaderNav from '../../Navigation/HeaderNav';

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <View>
                <HeaderNav title={g.USER_MANAGEMENT} />

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
                        data={[1, 1, 1, 1, 1, 1]}
                        renderItem={({ item, index }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                                <View style={styles.box}>
                                    <Icon name='edit' type='MaterialIcons' style={[styles.icon, { marginLeft: 'auto', }]}
                                    />
                                    <Image style={[styles.img, { borderRadius: wp('50'), }]}
                                        resizeMode="contain"
                                        source={require('../../Images/user.png')}
                                    />
                                    <Text style={[styles.txtBold, { fontSize: 16, marginTop: -5, }]}>اسم المستخدم</Text>
                                    <Text style={[styles.txtBold, { fontSize: 12, marginTop: -5, }]}>SA877832</Text>

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
            </View>
        );

    }
}
export default withNavigation(UserManagement);


