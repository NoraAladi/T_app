import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_Social  = ()=> 
{
   return  async (dispatch) =>
   {
    dispatch({ type : 'GET_SOCIAL_ATTEMPT'});
     const Token = await AsyncStorage.getItem('app_Token');
   //  alert(Token)

      axios.get(`${g.BASE_URL}/api/MasterData/SocialChannels`,
      {  
       headers:
       { 
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
          'Authorization' : `Bearer ${Token}` ,

      }
       })
        .then(response => {
          console.log('__ SOCIAL ___');
         // console.log(response.data);
          // If request is good...
          onhandleResponse( dispatch , response) 

       })
   }
   
}
const onhandleResponse = ( dispatch , data) =>
{
    onGetcategories( dispatch , data.data )
    // console.log('OFFERS');
     console.log(data.data );
}

const onGetcategories= ( dispatch , social    ) => 
{
        dispatch({ type : 'GET_SOCIAL_SUCCESS' , social  }) 
}