import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_offer_Types = (GovernorateId, CityId, typeId, page) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_OFFERS_TYPE_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    const countryId = await AsyncStorage.getItem('countryIdKey')
    const cityId = await AsyncStorage.getItem('cityIdKey')
    //  alert(Token)
    //call the backend 
    console.log('type:' + typeId + '\n' +
      'GovernorateId:' + countryId + '\n' +
      'CityId:' + cityId
    );
    try {
      let response = await axios.get(`${g.BASE_URL}/api/Offers/AllOffers?${countryId == 0 ? null : 'governorateId=' + countryId + '&cityId=' + cityId}&SponserTypeId=${typeId}&PageNumer=1&PageSize=10`,
        {
          headers:
          {
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
            'Authorization': `Bearer ${Token}`,

          }
        })
      console.log('__ offresType ___');
      console.log(response.data.results);
      dispatch({ type: 'GET_OFFERS_TYPE_SUCCESS', offersType: response.data.results })


    } catch (error) {
      console.log('Catch Api');
      console.log(error);
    }

  }

}
