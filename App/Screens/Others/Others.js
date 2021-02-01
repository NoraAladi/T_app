import styles from './style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView, TextInput,
    TouchableOpacity, Platform, ImageBackground,
    I18nManager, Modal, KeyboardAvoidingView, FlatList, Dimensions
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';
import {

    UIActivityIndicator,
} from 'react-native-indicators';
import Header from '../DealsScreen/header';
import UserFooter from '../../Navigation/UserFooter';
class Others extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header title={g.SERVICES} />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={{ zIndex: -1 }}>
                        <View style={{ height: 15 }} />

                        <View
                            style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}
                            onStartShouldSetResponder={() => {
                                this.props.navigation.navigate('JobsScreen')
                            }}
                        >
                            <Text style={styles.txtBold}>
                                {g.JOBS}
                            </Text>

                            <Icon name='left' type='AntDesign' style={styles.icon} />
                        </View>

                        <View
                            style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}
                            onStartShouldSetResponder={() => {
                                this.props.navigation.navigate('EmergencyScreen')
                            }}>
                            <Text style={styles.txtBold}>
                                {g.EMERGENCY}
                            </Text>
                            <Icon name='left' type='AntDesign' style={styles.icon} />
                        </View>
                        <View
                            style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}
                            onStartShouldSetResponder={() => {
                                this.props.navigation.navigate('AboutScreen')
                            }}
                        >
                            <Text style={styles.txtBold}>
                                {g.ABOUT}
                            </Text>

                            <Icon name='left' type='AntDesign' style={styles.icon} />
                        </View>


                        <View
                            style={[styles.card, { justifyContent: 'space-between', alignItems: 'center' }]}
                            onStartShouldSetResponder={() => {
                                this.props.navigation.navigate('ContactScreen')
                            }}
                        >
                        <Text style={styles.txtBold}>
                                {g.CONTACT}
                            </Text>

                            <Icon name='left' type='AntDesign' style={styles.icon} />
                        </View>


                    </View>
                </ScrollView>
                <UserFooter tab={5} />
            </View>
        );

    }
}
export default withNavigation(Others);
