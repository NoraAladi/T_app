import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_mini_Profile = () => {
  return async (dispatch) => {
    const Token = await AsyncStorage.getItem('app_Token')

    dispatch({ type: 'GET_MINI_PROFILE_ATTEMPT' });
    try {
      let response = await axios.get(`${g.BASE_URL}/api/PatientProfile/MiniProfile`,
        {
          headers:
          {
            'Authorization': `Bearer ${Token}`,
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
          },
        })
      // If request is good...
      console.log('--Mini Profile---');
      console.log(response.data);
      dispatch({ type: 'GET_MINI_PROFILE_SUCCESS', mini: response.data })

    } catch (error) {
      console.log(error);
    }
    //call the backend 

  }

}
