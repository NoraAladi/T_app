import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_USER_INFO   = ()=> 
{
   return  async  (dispatch) =>
   {
     const Token = await AsyncStorage.getItem('app_Token')
     const ID = await AsyncStorage.getItem('LOGIN_ID')

    dispatch({ type : 'GET_USER_INFO_ATTEMPT'});
    
    //call the backend 
      axios.get(`${g.BASE_URL}/api/PatientProfile/HealthInfo?patientId=${ID}`,
      {  
       headers:
       { 
        'Authorization' : `Bearer ${Token}` ,
        'accept': 'text/plain',
        'authorizationKey': g.authorizationKey,
      },
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

const onGetcategories= ( dispatch , user_i    ) => 
{
        dispatch({ type : 'GET_USER_INFO_SUCCESS' , user_i }) 
}