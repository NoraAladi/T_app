import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_offer  = ( GovernorateId ,  CityId )=> 
{
   return  (dispatch) =>
   {
    dispatch({ type : 'GET_OFFERS_ATTEMPT'});
    
    //call the backend 
      axios.get(`${g.BASE_URL}/api/Offers/AllOffers?GovernorateId=${GovernorateId}&CityId=${CityId}`,
      {  
       headers:
       { 
        'accept': 'text/plain',
        'authorizationKey': g.authorizationKey,
      }
       })
      .then(response => {
          // If request is good...
          onhandleResponse( dispatch , response) 

       })
   }
   
}
const onhandleResponse = ( dispatch , data) =>
{
    onGetcategories( dispatch , data.data )
    // console.log('OFFERS');
    // console.log(data.data );
}

const onGetcategories= ( dispatch , offers    ) => 
{
        dispatch({ type : 'GET_OFFERS_SUCCESS' , offers  }) 
}