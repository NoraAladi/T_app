import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_visit_Details  = (ID)=> 
{
   return async (dispatch) =>
   {
     const Token = await AsyncStorage.getItem('app_Token');
    
    dispatch({ type : 'GET_VISITS_DETAILS_ATTEMPT'});
    
    //call the backend 
      axios.get(`${g.BASE_URL}/api/PatientMedicalFile/ClinicVisitDetails?clinicVisitId=${ID}`,
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
    // console.log('OFFERS');
    // console.log(data.data );
}

const onGetcategories= ( dispatch , visit_details   ) => 
{
        dispatch({ type : 'GET_VISITS_DETAILS_SUCCESS' , visit_details  }) 
}