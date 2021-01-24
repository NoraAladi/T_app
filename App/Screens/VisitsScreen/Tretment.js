import VisitsStyle from './VisitsStyle';
import styleLogin from '../LoginScreen/style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import Modal from 'react-native-modalbox';
import ModalTreatments from './ModalTreatments';

const colors = [g.Date1, g.Date1, g.Date1
    , g.Date2, g.Date2, g.Date3, g.Date4, g.Date4, g.Date4]

class Tretment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    closeModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

   
    render() {
        return (

            <View>
                <View style={{ height: hp('80%') }} >
                    <FlatList
                        key={(item) => { item.id }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                        data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                                <TouchableOpacity activeOpacity={1}
                                    onPress={() => {
                                        this.setState({
                                            modal: !this.state.modal
                                        })
                                    }}
                                >
                                    <View style={[VisitsStyle.card, {
                                        width: wp('60%'), height: hp('9%'),
                                        alignItems: 'center'
                                    }]}>
                                        <Icon name="left" type="AntDesign"
                                            style={[VisitsStyle.arrow, { fontSize: 18 }]} />
                                        <View style={{ flexDirection: 'column', marginLeft: 'auto' }}>
                                            <Text style={VisitsStyle.doctor_name}>
                                                د. محمد عبد الرازق خليفة </Text>
                                            <Text style={[VisitsStyle.txt, { fontSize: 12 }]}>
                                                أخصائي أمراض الباطنة
                                  </Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                                <View
                                    style={[VisitsStyle.date, { backgroundColor: colors[index % colors.length] }]}>

                                    <View
                                        elevation={4}

                                        style={{
                                            flexDirection: 'column', justifyContent: 'center'
                                            , alignItems: 'center',
                                        }}>
                                        <Text style={VisitsStyle.date_txt}>0 </Text>
                                        <Text style={VisitsStyle.month}> ديسمبر
                                 </Text>
                                        <Text style={VisitsStyle.month}>٢٠٢٠</Text>
                                    </View>

                                </View>
                                <View>
                                    <View style={{
                                        height: 20, width: 20, alignItems: 'center',
                                        margin: 11, padding: 5,
                                        borderRadius: 60, backgroundColor: g.Light_Gray
                                    }}>
                                        <View style={{
                                            height: 10, width: 10,
                                            borderRadius: 60, backgroundColor: g.Gray
                                        }} />
                                    </View>

                                    <View style={{
                                        flexDirection: 'column', justifyContent: 'center'
                                        , alignItems: 'center',
                                        height: hp('4'),
                                        marginTop: 0
                                    }}>


                                        <Text style={{
                                            width: 2, lineHeight: 10,
                                            transform: [{ rotate: '180deg' }]

                                        }}>|{'\n'}|{'\n'}|</Text>

                                    </View>
                                </View>
                            </View>
                        )} />
                </View>

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
                >

                    <View>
                        <View style={{
                            backgroundColor: g.white, height: g.windowHeight - 80,
                            borderTopLeftRadius: 35, borderTopRightRadius: 35,
                            marginTop: g.windowHeight - (g.windowHeight - 80),
                        }}>
                            <View

                                style={{
                                    height: 5, backgroundColor: g.Light_Gray, width: 100,
                                    marginTop: 15, marginRight: 'auto', marginLeft: 'auto'
                                    , borderRadius: 10
                                }} />

                            <ModalTreatments closeModal={this.closeModal} />
                        </View>
                    </View>

                </Modal>
            </View>
        );

    }
}
export default withNavigation(Tretment);
