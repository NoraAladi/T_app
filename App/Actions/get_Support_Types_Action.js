import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_supportTypes = () => {
  return async (dispatch) => {
    dispatch({ type: 'GET_SUPPORT_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    try {

      let res = await axios.get(`${g.BASE_URL}/api/MasterData/SupportTypes`,
        {
          headers:
          {
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
            'Authorization': `Bearer ${Token}`,

          }
        })
      if (res.data) {
        console.log('----- Get_supportTypes API -----');
        console.log(res.data);

        dispatch({ type: 'GET_SUPPORT_SUCCESS', supportTypes: res.data })
      }
    } catch (error) {
      console.log(error.response);
    }
  }
}
