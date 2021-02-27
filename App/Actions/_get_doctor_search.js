import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_Doctor_Search = (Filter, specialityId, GovernorateId, CityId) => {
  console.log('filter: ' + Filter + '\n' +
    'specialityId: ' + specialityId + '\n' +
    'GovernorateId: ' + GovernorateId + '\n' +
    'CityId: ' + CityId + '\n'
  );
  return async (dispatch) => {
    dispatch({ type: 'GET_DOCTOR_SEARCH_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    //call the backend 
    //&specialityId=${specialityId}
    axios.get(`${g.BASE_URL}/api/PatientServiceProviders/ClinicSearch?governorateId=${GovernorateId}&cityId=${CityId}&specialityId=${specialityId}&doctorname=${Filter}&PageNumer=1&PageSize=10`,
      {
        headers:
        {
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
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