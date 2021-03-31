import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'
var results = []

export const Get_Doctor_Search = (Filter, specialityId, page) => {

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

    try {
      let resp =await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/ClinicSearch?${countryId == 0 ? null : 'governorateId=' + countryId}&${cityId == 0 ? null : 'cityId=' + cityId}&${specialityId == 0 ? null : 'specialityId=' + specialityId}&doctorname=${Filter}&PageNumer=${page}&PageSize=4`,
        {
          headers:
          {
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
            'Authorization': `Bearer ${Token}`,
          }
        })
      // If request is good...
      console.log('--- DOCTOR API----');
      console.log(resp.data);
      if (page == 1)
        results = resp.data.results
      else
        results = [...results, ...resp.data.results]
      dispatch({ type: 'GET_DOCTOR_SEARCH_SUCCESS', doctor: results, totalPages: resp.data.totalNumberOfPages })

    } catch (error) {
      console.log(error.response);
    }
  }

}
