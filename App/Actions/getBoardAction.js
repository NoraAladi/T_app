import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_Board = () => {
   return async (dispatch) => {
      dispatch({ type: 'GET_BOARD_ATTEMPT' });
      //  alert(Token)
      try {
         let response = await axios.get(`${g.BASE_URL}/api/PublicMasterData/CarouselItems?origin=patient&page=home`,
            {
               headers:
               {
                  'accept': 'text/plain',
                  'authorizationKey': g.authorizationKey,
               }
            })
         console.log('__ on Board ___');
         console.log(response.data );
         // console.log(response.data);
         // If request is good...
         dispatch({ type: 'GET_BOARD_SUCCESS', onBoard: response.data })

      } catch (error) {
         console.log(error);
      }


   }

}
