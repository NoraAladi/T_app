import style from './style';
import React, { Component } from 'react';
import {
    Text, View, FlatList, Image, ScrollView
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import UserFooter from '../../Navigation/UserFooter';
import i18n from '../../i18n';
import Doctor from './doctor';
import Lab from './lab';
import Rad from './rad';
import Pharma from './pharma';


const data = [
    { name: 'صيدلية', img: require('../../Images/pharma.png'), imgicon: require('../../Images/pharmacyIcon.png') },
    { name: 'مركز أشعة', img: require('../../Images/rad.png'), imgicon: require('../../Images/radIcon.png') },
    { name: 'معمل تحاليل', img: require('../../Images/lab.png'), imgicon: require('../../Images/labIcon.png') },
    { name: 'طبيب', img: require('../../Images/doctor.png'), imgicon: require('../../Images/doctorIcon.png') },

]

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'طبيب', imgIcon: require('../../Images/doctorIcon.png')
        }
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                {/* // Header  */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={style.container}>
                        <View style={{ flexDirection: 'row', margin: 20 }}>
                            <Icon name="arrow-drop-down" type="MaterialIcons"
                                style={style.arrow} />
                            <Image source={require('../../Images/profile.png')}
                                style={style.userimg} />
                            <View style={style.view1}>
                                <Text style={style.username}> هشام مهدي </Text>
                                <Text style={style.code}>SA877832  </Text>
                            </View>
                        </View>
                        <Text style={style.offer}> لوجو </Text>
                    </View>
                    <Text style={{
                        textAlign: 'right', fontFamily: g.Regular, fontSize: 20,
                        margin: 10
                    }}>
                        {i18n.t(g.WHAT_SEARCH)}
                    </Text>
                    <View style={{ height: hp('24%') }} >
                        <FlatList
                            key={(item) => { item.id }}
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled
                            data={data}
                            numColumns={4}
                            renderItem={({ item, index }) => (
                                <View style={{ marginLeft: 10 }}>
                                    <View
                                        onStartShouldSetResponder={() => {
                                            this.setState({
                                                name: item.name,
                                                imgIcon: item.imgicon
                                            })
                                        }}
                                        style={style.card}>
                                        <Image source={item.img}
                                            style={style.img} />
                                        <Text style={style.txt}>
                                            {item.name}
                                        </Text>
                                    </View>
                                    {
                                        this.state.name == item.name ?
                                            <Icon name="chevron-small-down" type="Entypo"
                                                style={style.arr} />
                                            : null
                                    }

                                </View>
                            )} />
                        <View style={{ flexDirection: 'row', marginRight: wp('4%'), }}>
                            <Text style={style.txt1}> {this.state.name}  </Text>
                            <Image source={this.state.imgIcon}
                                style={style.img1} />
                        </View>

                        <View>
                        </View>
                    </View>

                    {/* // content */}
                    {
                        this.state.name == "طبيب" ?
                            <Doctor />
                            :
                            this.state.name == "معمل تحاليل" ?
                                <Lab/>
                                :
                                this.state.name == "مركز أشعة" ?
                                 <Rad/>
                                    :
                                    this.state.name == "صيدلية" ?
                                       <Pharma/>
                                        : null

                    }
                </ScrollView>
                <UserFooter tab={3} />

            </View>
        );

    }
}
export default withNavigation(Search);
