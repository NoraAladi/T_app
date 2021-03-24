import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_LAB_RAD_PAHRMA_Search = (type, Filter, GovernorateId, CityId) => {

  console.log(
    'type: ' + type + '\n' +
    'Filter: ' + JSON.stringify(Filter) + '\n' +
    'GovernorateId: ' + GovernorateId + '\n' +
    'CityId: ' + CityId
  );
  return async (dispatch) => {
    //console.log(type);
    //   alert( Filter  + " " +  type  + " " +   GovernorateId  + " " +   CityId )
    dispatch({ type: 'GET_LAB_RAD_SEARCH_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');

    const countryId = await AsyncStorage.getItem('countryIdKey')
    const cityId = await AsyncStorage.getItem('cityIdKey')
    console.log(`/api/PatientServiceProviders/${type}?governorateId=${countryId}&cityId=${cityId}`)


    //call the backend 
    let response = await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/${type}?${countryId == 0 ? null : 'governorateId=' + countryId + '&cityId=' + cityId}&name=${Filter}&PageNumer=1&PageSize=10`,
    
      {
        headers:
        {
          'Authorization': `Bearer ${Token}`,
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
        }
      })

    console.log(response.data.results);
    // If request is good...
    onhandleResponse(dispatch, response)

  }

}
const onhandleResponse = (dispatch, data) => {
  onGetcategories(dispatch, data.data.results)
  console.log(data.data.results);
}

const onGetcategories = (dispatch, lab_rad) => {
  dispatch({ type: 'GET_LAB__RAD_SEARCH_SUCCESS', lab_rad })
}