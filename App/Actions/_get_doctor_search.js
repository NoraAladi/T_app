import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_Doctor_Search  = ( Filter ,  specialityId ,  GovernorateId ,  CityId )=> 
{
   return async (dispatch) =>
   {
   //  alert( Filter  + " " +  specialityId  + " " +   GovernorateId  + " " +   CityId )
    dispatch({ type : 'GET_DOCTOR_SEARCH_ATTEMPT'});
    const Token = await AsyncStorage.getItem('app_Token');
    //call the backend 
      axios.get(`${g.BASE_URL}/api/PatientServiceProviders/ClinicSearch?governorateId=${GovernorateId}&cityId=${CityId}&specialityId=${specialityId}&doctorname=${Filter}`,
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
    onGetcategories( dispatch , data.data )
      console.log('DOCTOR ________________');
     console.log(data.data );
}

const onGetcategories= ( dispatch , doctor    ) => 
{
        dispatch({ type : 'GET_DOCTOR_SEARCH_SUCCESS' , doctor  }) 
}