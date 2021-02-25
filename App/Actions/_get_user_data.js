import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_USER_DATA = (ID) => {
  return async (dispatch) => {
    const Token = await AsyncStorage.getItem('app_Token')

    dispatch({ type: 'GET_USER_DATA_ATTEMPT' });
    try {
      let res = await axios.get(`${g.BASE_URL}/api/PatientProfile/PersonalInfo`,
        {
          headers:
          {
            'Authorization': `Bearer ${Token}`,
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
          },
        })
      if (res.data) {
        onhandleResponse(dispatch, res)
        console.log('GET USER DATA');
        console.log(res.data);
      }
    } catch (error) {

    }
    //call the backend 

  }

}
const onhandleResponse = (dispatch, data) => {
  onGetcategories(dispatch, data.data)

}

const onGetcategories = (dispatch, user_d) => {
  dispatch({ type: 'GET_USER_DATA_SUCCESS', user_d })
}