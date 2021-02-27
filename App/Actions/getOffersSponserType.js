import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal'

export const Get_offer_Types = (GovernorateId, CityId, typeId, page) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_OFFERS_TYPE_ATTEMPT' });
    const Token = await AsyncStorage.getItem('app_Token');
    //  alert(Token)
    //call the backend 
    console.log('type:' + typeId + '\n' +
      'GovernorateId:' + GovernorateId + '\n' +
      'CityId:' + CityId
    );
    try {
      let response = await axios.get(`${g.BASE_URL}/api/Offers/AllOffers?GovernorateId=${GovernorateId}&CityId=${CityId}&SponserTypeId=${typeId}&PageNumer=1&PageSize=10`,
        {
          headers:
          {
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,

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
