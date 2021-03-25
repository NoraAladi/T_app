import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_offer_details = (ID) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_OFFERS_DETAILS_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');

    //call the backend 
    axios.get(`${g.BASE_URL}/api/Offers/OfferDeatils?offerId=${ID}`,
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
        console.log(`--- offerId${ID} ---`);
        console.log(response.data);
        onhandleResponse(dispatch, response)

      }).catch(err => {
        console.log('error');
        console.log(err.response);
      })
  }

}
const onhandleResponse = (dispatch, data) => {
  onGetcategories(dispatch, data.data)
  // console.log('OFFERS');
  // console.log(data.data );
}

const onGetcategories = (dispatch, offer_detail) => {
  dispatch({ type: 'GET_OFFERS_DETAILS_SUCCESS', offer_detail })
}