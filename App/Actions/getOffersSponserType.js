import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

var results = []
export const Get_offer_Types = (typeId, page) => {
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
      let response = await axios.get(`${g.BASE_URL}/api/Offers/AllOffers?${countryId == 0 ? null : 'governorateId=' + countryId }&${cityId == 0 ? null : 'cityId=' + cityId }&SponserTypeId=${typeId}&PageNumer=${page}&PageSize=2`,
        {
          headers:
          {
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,
            'Authorization': `Bearer ${Token}`,

          }
        })
      console.log('__ offresType ___');
      console.log(response.data);
      if (page == 1)
        results = response.data.results
      else
        results = [...results, ...response.data.results]

      dispatch({ type: 'GET_OFFERS_TYPE_SUCCESS', offersType: results, totalPages: response.data.totalNumberOfPages })


    } catch (error) {
      console.log('Catch Api');
      console.log(error);
    }

  }

}
