import style from './style';
import React, { Component } from 'react';
import {
     View, Image , Text, TouchableOpacity 
} from 'react-native';
import { withNavigation } from 'react-navigation';
import i18n from '../../i18n';
import { Icon } from 'native-base';
import g from '../../Gloabal';
import ModalAddUser from '../../Navigation/ModalAddUser' ;


class header extends Component {
   constructor()
   {
       super()
       this.state = {
           Flag : false 
       }
   }

   _close_model ()
   {
     this.setState({
        Flag : false
       })
   }
    render() {
        return (
           <View 
           style={style.container}>
               
                    <View 
                    style={{ flexDirection: 'row', margin: 20 }}>
                        <TouchableOpacity onPress = {  ()=>{
                             this.setState({
                                Flag : true 
                            })
                         
                        }}>

                       
                        <Icon name="arrow-drop-down" type="MaterialIcons"
                            style={style.arrow} />
                             </TouchableOpacity>
                             <TouchableOpacity  style = {{ flexDirection : 'row'}} onPress = {()=>{
                                 this.props.navigation.navigate('ProfileScreen')
                             }}>
                        <Image source={require('../../Images/profile.png')}
                            style={style.userimg} />
                        <View style={style.view1}>
                            <Text style={style.username}> هشام مهدي </Text>
                            <Text style={style.code}>SA877832  </Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={style.offer}>{this.props.title}</Text>
                    {
                   this.state.Flag ? 
                   <ModalAddUser  closeModel = {()=>this._close_model()} /> : null 
               }
                </View>
                
        );

    }
}
export default withNavigation(header);
