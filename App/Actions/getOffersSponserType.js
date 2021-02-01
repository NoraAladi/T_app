import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_offer_Types = (GovernorateId, CityId, typeId, page) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_OFFERS_TYPE_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    //  alert(Token)
    //call the backend 
    console.log('type:' + typeId);
    axios.get(`${g.BASE_URL}/api/Offers/AllOffers?GovernorateId=${GovernorateId}&CityId=${CityId}&SponserTypeId=${typeId}&PageNumer=${page}&PageSize=5`,
      {
        headers:
        {
          'accept': 'text/plain',
          'authorizationKey': g.authorizationKey,
          'Authorization': `Bearer ${Token}`,

        }
      })
      .then(response => {
        console.log('__ offresType ___');
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

const onGetcategories = (dispatch, offersType) => {
  dispatch({ type: 'GET_OFFERS_TYPE_SUCCESS', offersType })
}