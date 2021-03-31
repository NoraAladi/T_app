import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'
var results = []

export const Get_LAB_RAD_PAHRMA_Search = (type, Filter, page) => {


  return async (dispatch) => {

    dispatch({ type: 'GET_LAB_RAD_SEARCH_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');

    const countryId = await AsyncStorage.getItem('countryIdKey')
    const cityId = await AsyncStorage.getItem('cityIdKey')
    console.log(
      'type: ' + type + '\n' +
      'Filter: ' + JSON.stringify(Filter) + '\n' +
      'GovernorateId: ' + countryId + '\n' +
      'CityId: ' + cityId
    );

    //call the backend 
    let response = await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/${type}?${countryId == 0 ? null : 'governorateId=' + countryId}&${cityId == 0 ? null : 'cityId=' + cityId}&name=${Filter}&PageNumer=${page}&PageSize=4`,

      {
        headers:
        {
          'Authorization': `Bearer ${Token}`,
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
        }
      })

    console.log(response.data);
    if (page == 1)
      results = response.data.results
    else
      results = [...results, ...response.data.results]
    // If request is good...
    dispatch({ type: 'GET_LAB__RAD_SEARCH_SUCCESS', lab_rad: results, totalPages: response.data.totalNumberOfPages })

  }

}
