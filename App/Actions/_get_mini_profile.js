import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios' ;
import g from '../Gloabal'

export const Get_mini_Profile  = ()=> 
{
   return  async  (dispatch) =>
   {
     const Token = await AsyncStorage.getItem('app_Token')

    dispatch({ type : 'GET_MINI_PROFILE_ATTEMPT'});
    
    //call the backend 
      axios.get(`${g.BASE_URL}/api/PatientProfile/MiniProfile`,
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
        console.log('--Mini Profile---');
        console.log(response.data);
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

const onGetcategories= ( dispatch , mini    ) => 
{
        dispatch({ type : 'GET_MINI_PROFILE_SUCCESS' , mini  }) 
}