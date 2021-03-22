import VisitsStyle from './VisitsStyle';
import React, { Component } from 'react';
import {
    Text, View, Image, FlatList,
    TouchableOpacity,

} from 'react-native';
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import g from '../../Gloabal';
import i18n from '../../i18n';




class RenderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

        console.log(this.props.title);
        console.log(this.props.show);
        console.log(this.props.data);
        console.log(this.props.image);

    }
    render() {
        return (

            <View>
                <View style={VisitsStyle.card}>
                    <Image source={this.props.image}
                        style={VisitsStyle.img} />
                    {
                        this.props.show == 'yes' ?
                            <View >
                                <Text style={VisitsStyle.title}>
                                    {this.props.title}
                                </Text>
                                <TouchableOpacity style={VisitsStyle.btn}
                                    onPress={() => {
                                        this.props.title == 'التطعيمات' ?
                                            this.props.openModal(true)
                                            : this.props.title == 'الأدوية المصروفة في الثلاث شهور الماضية' ?
                                                this.props.openModal(false)
                                                : null
                                    }}
                                >
                                    <Text style={VisitsStyle.offer}> {i18n.t(g.OFFER_BTN)} </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={VisitsStyle.title}>
                                    {this.props.title}
                                </Text>
                                {this.props.data == '' || this.props.data == null ?
                                    <Text style={VisitsStyle.txt}
                                    >
                                        {'لا يوجد'}
                                    </Text>
                                    : typeof (this.props.data) === 'string' ?
                                        <Text style={VisitsStyle.txt}
                                        >
                                            {this.props.data}
                                        </Text>
                                        :
                                        this.props.title == 'الأمراض المزمنة' ?
                                            this.props.data.map((item, index) => {
                                                return (
                                                    <Text style={VisitsStyle.txt}
                                                        key={index}
                                                    >
                                                        {item.diseaseName}
                                                    </Text>
                                                );
                                            })
                                            :
                                        this.props.title == 'الأدوية الممنوعة' ?
                                            this.props.data.map((item, index) => {
                                                return (
                                                    <Text style={VisitsStyle.txt}
                                                        key={index}
                                                    >
                                                        {item.medicineName}
                                                    </Text>
                                                );
                                            })
                                            :
                                            this.props.data.map((item, index) => {
                                                return (
                                                    <Text style={VisitsStyle.txt}
                                                        key={index}
                                                    >
                                                        {item}
                                                    </Text>
                                                );
                                            })

                                }
                            </View>
                    }

                </View>



            </View >
        );

    }
}


export default (withNavigation(RenderCard));

