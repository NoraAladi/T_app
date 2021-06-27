import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_Social = () => {
   return async (dispatch) => {
      dispatch({ type: 'GET_SOCIAL_ATTEMPT' });
      const Token = await AsyncStorage.getItem('app_Token');
      //  alert(Token)
      try {
         let response = await axios.get(`${g.BASE_URL}/api/MasterData/SocialChannels`,
            {
               headers:
               {
                  'accept': 'text/plain',
                  'authorizationKey': g.authorizationKey,
                  'Authorization': `Bearer ${Token}`,

               }
            })
         console.log('__ SOCIAL ___');
          console.log(response.data);
         // If request is good...
         dispatch({ type: 'GET_SOCIAL_SUCCESS', social: response.data })

      } catch (error) {
         console.log(error);
      }


   }

}
