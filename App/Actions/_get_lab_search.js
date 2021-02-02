import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_LAB_RAD_PAHRMA_Search  = (  type  ,   Filter  ,  GovernorateId ,  CityId )=> 
{
   return async (dispatch) =>
   {
     console.log(type);
   //  alert( Filter  + " " +  type  + " " +   GovernorateId  + " " +   CityId )
    dispatch({ type : 'GET_LAB_RAD_SEARCH_ATTEMPT'});
    const Token = await AsyncStorage.getItem('app_Token');
    //call the backend 
      axios.get(`${g.BASE_URL}/api/PatientServiceProviders/${type}?governorateId=${GovernorateId}&cityId=${CityId}&name=${Filter}&PageNumer=1&PageSize=5`,
      {  
       headers:
       { 
        'Authorization' : `Bearer ${Token}` ,
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
    onGetcategories( dispatch , data.data.results )
      console.log('type ________________ ');
     console.log(data.data.results );
}

const onGetcategories= ( dispatch , lab_rad    ) => 
{
        dispatch({ type : 'GET_LAB__RAD_SEARCH_SUCCESS' , lab_rad  }) 
}