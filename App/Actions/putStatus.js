import axios from 'axios';
import g from '../Gloabal'
import AsyncStorage from '@react-native-community/async-storage';
var isDependent = ''
export const putHealthStatus = (toggle) => {
  return async (dispatch) => {
    dispatch({ type: 'PUT_STATUS_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    const dependentId = await AsyncStorage.getItem('dependentId');
    console.log('----- put status api call -----');
    console.log('dependentId: ' + dependentId);
    if (dependentId) {
      isDependent = `?dependantId=${dependentId}`
    }
    else {
      isDependent = ''
    }
    console.log(`${g.BASE_URL}/api/PatientMedicalFile/HealthProfileStatus${isDependent}`);
    try {
      const data = {
        'hide': toggle,
      }
      let res = await axios.put(`${g.BASE_URL}/api/PatientMedicalFile/HealthProfileStatus${isDependent}`, data,
        {
          headers:
          {
            'Authorization': `Bearer ${Token}`,
            'authorizationKey': g.authorizationKey,
            'Content-Type': 'application/json-patch+json',

          }
        })
      console.log('----- put status api success -----');
      console.log(res.data);
      dispatch({ type: 'PUT_STATUS_SUCCESS', status: res.status })

    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }
}
