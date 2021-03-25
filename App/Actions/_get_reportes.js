import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'
var isDependent = ''

export const Get_Reportes = (page,tab) => {
  return async (dispatch) => {
    const Token = await AsyncStorage.getItem('app_Token');
    const dependentId = await AsyncStorage.getItem('dependentId');
    console.log('----- Treatments api call -----');
    console.log('dependentId: ' + dependentId);
    if (dependentId) {
      isDependent = `dependantId=${dependentId}`
    }
    else {
      isDependent = ''
    }
   
    dispatch({ type: 'GET_REPORTES_ATTEMPT' });
    try {
      let resp = await axios.get(`${g.BASE_URL}/api/PatientMedicalFile/${tab?'AllReports':'WalkonAllReports'}?PageNumer=${page}&PageSize=10&${isDependent}`,
        {
          headers:
          {
            'Authorization': `Bearer ${Token}`,
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
          }
        })
      
      console.log('__ Reports ___');
      console.log(resp.data.results );
      dispatch({ type: 'GET_REPORTES_SUCCESS', reportes: resp.data.results })

    }
    catch (error) {
      console.log(error);
    }
    //call the backend

  }

}
