import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'
var isDependent = ''
var results = []

export const Get_visit = (page) => {
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
    dispatch({ type: 'GET_VISITS_ATTEMPT' });

    //call the backend 
    let res = await axios.get(`${g.BASE_URL}/api/PatientMedicalFile/ClinicVisits?PageNumer=${page}&PageSize=5&${isDependent}`,
      {
        headers:
        {
          'Authorization': `Bearer ${Token}`,
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
        }
      })
    // If request is good...
    console.log('__ Visits ___');
    console.log(res.data);
    if (page == 1)
      results = res.data.results
    else
      results = [...results, ...res.data.results]
    dispatch({ type: 'GET_VISITS_SUCCESS', visit: results, totalPages: res.data.totalNumberOfPages })



  }

}
