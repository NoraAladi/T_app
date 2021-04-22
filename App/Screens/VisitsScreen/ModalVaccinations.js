import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, ScrollView,
    TouchableOpacity, Platform, FlatList, Image, _View
} from 'react-native';
import g from '../../Gloabal';
import VisitsStyle from './VisitsStyle';
import { ArabicNumbers } from 'react-native-arabic-numbers';
import { widthPercentageToDP } from 'react-native-responsive-screen';


export default class ModalVaccinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView nestedScrollEnabled>
                    <TouchableOpacity activeOpacity={1} >
                        {/**content1 */}
                        {this.props.vaccine == '' ?
                            <Text style={[VisitsStyle.txt, { marginLeft: widthPercentageToDP('40') }]}>
                                {'لا يوجد'}
                            </Text>
                            :
                            <View style=
                                {{ marginLeft: 'auto', paddingHorizontal: 40, marginTop: 10 }}>
                                {/**light title */}

                                {/**Dark Details */}

                                <FlatList
                                    key={(item) => {
                                        item.id;
                                    }}
                                    showsVerticalScrollIndicator={false}
                                    data={this.props.vaccine}
                                    //   horizontal={true}
                                    renderItem={({ item, index }) => (
                                        <View>
                                            <Text style={[VisitsStyle.txt, {
                                                fontSize: 12, color: g.Light_Gray,
                                            }]}>
                                                {item.childAge.ageValue + ' ' + item.childAge.ageTitle}
                                            </Text>
                                            <Text style={[VisitsStyle.txt]}>
                                                {item.vaccination.vaccenName}
                                            </Text>
                                        </View>
                                    )}
                                />

                            </View>
                        }
                       


                        <View style={{ height: 50 }}></View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        );
    }
}
