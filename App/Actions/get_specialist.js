import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_Specialist = () => {
  return async (dispatch) => {
    dispatch({ type: 'GET_SPECIALIST_ATTEMPT' });
    const token = await AsyncStorage.getItem('app_Token')
    //call the backend 
    axios.get(`${g.BASE_URL}/api/MasterData/Specialties`,
      {
        headers:
        {
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => {
        // If request is good...
        console.log('----- Specialist -----');
        console.log(response.data);
        onhandleResponse(dispatch, response)

      })
  }

}
const onhandleResponse = (dispatch, data) => {
  onGetcategories(dispatch, data.data)
}

const onGetcategories = (dispatch, specialist) => {
  dispatch({ type: 'GET_SPECIALIST_SUCCESS', specialist })
}