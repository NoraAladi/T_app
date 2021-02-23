import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_Reportes  = (page)=> 
{
   return async (dispatch) =>
   {
     const Token = await AsyncStorage.getItem('app_Token');

    dispatch({ type : 'GET_REPORTES_ATTEMPT'});
    
    //call the backend 
      axios.get(`${g.BASE_URL}/api/PatientMedicalFile/AllReports?PageNumer=${page}&PageSize=10`,
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
          console.log('__ Reports ___');
          console.log(response.data.results);        
          onhandleResponse( dispatch , response) 

       })
   }
   
}
const onhandleResponse = ( dispatch , data) =>
{
    onGetcategories( dispatch , data.data.results )
    // console.log('OFFERS');
    // console.log(data.data );
}

const onGetcategories= ( dispatch , reportes    ) => 
{
        dispatch({ type : 'GET_REPORTES_SUCCESS' , reportes  }) 
}