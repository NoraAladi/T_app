import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_offer = (GovernorateId, CityId, page) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_OFFERS_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    const countryId = await AsyncStorage.getItem('countryIdKey')
    const cityId = await AsyncStorage.getItem('cityIdKey')
    //  alert(Token)
    console.log('offfers');
    console.log('countryId: '+countryId+'\ncityId: '+cityId);
    //call the backend 
    axios.get(`${g.BASE_URL}/api/Offers/AllOffers?${countryId == 0 ? null : 'governorateId=' + countryId + '&cityId=' + cityId}&PageNumer=1&PageSize=10`,
      {
        headers:
        {
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
          'Authorization': `Bearer ${Token}`,

        }
      })
      .then(response => {
        console.log('__ offres ___');
        console.log(response.data.results);
        // If request is good...
        onhandleResponse(dispatch, response)

      })
  }

}
const onhandleResponse = (dispatch, data) => {
  onGetcategories(dispatch, data.data.results)
  // console.log('OFFERS');
  // console.log(data.data );
}

const onGetcategories = (dispatch, offers) => {
  dispatch({ type: 'GET_OFFERS_SUCCESS', offers })
}