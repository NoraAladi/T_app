import style from './style';
import React, { Component } from 'react';
import {
     View, Image , Text 
} from 'react-native';
import { withNavigation } from 'react-navigation';
import i18n from '../../i18n';
import { Icon } from 'native-base';
import g from '../../Gloabal';

class header extends Component {
   
    render() {
        return (
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
                    <Text style={style.offer}>{i18n.t(g.offer)}</Text>
                </View>
        );

    }
}
export default withNavigation(header);
