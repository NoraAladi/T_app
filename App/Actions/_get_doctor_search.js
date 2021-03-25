import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_Doctor_Search = (Filter, specialityId, GovernorateId, CityId) => {

  return async (dispatch) => {
    dispatch({ type: 'GET_DOCTOR_SEARCH_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    const countryId = await AsyncStorage.getItem('countryIdKey')
    const cityId = await AsyncStorage.getItem('cityIdKey')
    console.log('filter: ' + Filter + '\n' +
      'specialityId: ' + specialityId + '\n' +
      'GovernorateId: ' + countryId + '\n' +
      'CityId: ' + cityId + '\n'
    );
    //call the backend 
    //&specialityId=${specialityId}
    console.log(`${g.BASE_URL}/api/PatientServiceProviders/ClinicSearch?${countryId == 0 ? null : 'governorateId=' + countryId + '&cityId=' + cityId}&${specialityId == -1 ? null : 'specialityId=' + specialityId}&doctorname=${Filter}&PageNumer=1&PageSize=10`);
    axios.get(`${g.BASE_URL}/api/PatientServiceProviders/ClinicSearch?${countryId == 0 ? null : 'governorateId=' + countryId + '&cityId=' + cityId}&${specialityId == -1 ? null : 'specialityId=' + specialityId}&doctorname=${Filter}&PageNumer=1&PageSize=10`,
      {
        headers:
        {
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
          'Authorization': `Bearer ${Token}`,
        }
      })
      .then(response => {
        // If request is good...
        console.log('--- DOCTOR API----');
        console.log(response.data.results);
        onhandleResponse(dispatch, response)
      })
  }

}
const onhandleResponse = (dispatch, data) => {
  onGetcategories(dispatch, data.data.results)

}

const onGetcategories = (dispatch, doctor) => {
  dispatch({ type: 'GET_DOCTOR_SEARCH_SUCCESS', doctor })
}