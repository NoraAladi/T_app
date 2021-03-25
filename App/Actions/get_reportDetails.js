import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const get_reportDetails = (type, id, tab) => {
  console.log('type: ' + type + '\nids: ' + id + '\ntab: ' + tab);
  return async (dispatch) => {
    dispatch({ type: 'GET_REPORT_DETAILS_ATTEMPT' });
    try {
      const Token = await AsyncStorage.getItem('app_Token');

      let res = await axios.get(`${g.BASE_URL}/api/PatientMedicalFile/${tab ? type : 'Walkon' + type}ReportsDetails?ReportsIds=${id}`,
        {
          headers:
          {
            'authorizationKey': g.authorizationKey,
            'accept': 'text/plain',
            'Authorization': `Bearer ${Token}`,


          }
        })
      if (res.data) {
        console.log('----- get_reportDetails API-----');
        console.log(res.data);

        dispatch({ type: 'GET_REPORT_DETAILS_SUCCESS', reportDetails: res.data })
      }
    } catch (error) {
      console.log(error.response);
    }
  }
}
