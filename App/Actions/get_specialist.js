import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_Specialist = () => {
  return async (dispatch) => {
    dispatch({ type: 'GET_SPECIALIST_ATTEMPT' });
    const token = await AsyncStorage.getItem('app_Token')
    //call the backend 
    let res = await axios.get(`${g.BASE_URL}/api/MasterData/Specialties`,
      {
        headers:
        {
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
          'Authorization': `Bearer ${token}`,
        }
      })

        // If request is good...
        console.log('----- Specialist -----');
        console.log(res.data);
        dispatch({ type: 'GET_SPECIALIST_SUCCESS', specialist:res.data })

  }

}
