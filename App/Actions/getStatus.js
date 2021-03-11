import axios from 'axios';
import g from '../Gloabal'
import AsyncStorage from '@react-native-community/async-storage';
var isDependent = ''
export const getHealthStatus = () => {
  return async (dispatch) => {
    dispatch({ type: 'GET_STATUS_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    const dependentId = await AsyncStorage.getItem('dependentId');
    console.log('----- get status api call -----');
    console.log('dependentId: ' + dependentId);
    if (dependentId) {
      isDependent = `?dependantId=${dependentId}`
    }
    else {
      isDependent = ''
    }
    console.log(`${g.BASE_URL}/api/PatientMedicalFile/HealthProfileStatus${isDependent}`);
    try {
      let res = await axios.get(`${g.BASE_URL}/api/PatientMedicalFile/HealthProfileStatus${isDependent}`,
        {
          headers:
          {
            'Authorization': `Bearer ${Token}`,
            'authorizationKey': g.authorizationKey,
          }
        })
      console.log('----- get status api success -----');
      console.log(res.data);
      dispatch({ type: 'GET_STATUS_SUCCESS', healthStatus: res.data })

    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  }
}
