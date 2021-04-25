import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const forget_pass  = ({ email }) => {
   //  alert( email + "  "  )
    return async (dispatch) => {
        dispatch({ type: 'FORGETPASS_ATTEMPT' });

        //call the backend 
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/Accounts/forgot-password`,
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,
                },
                data:
                {
                    email: email,
                },
            })
            if (response.data) {
            
             onhandleResponse(dispatch, response)  
            }
          } catch (err) {
            // Handle Error Here
            if( err.response.data.message)
            {
                dispatch({ type: 'FOGERT_NOT', error: err.response.data.message })
                console.log(err.response.data.message );
            }
            else 
            {
                dispatch({ type: 'FOGERT_NOT', error:  Object.values(err.response.data.errors)[0][0] })
                console.log( Object.values(err.response.data.errors)[0][0]);
            }
              
        }
        }
}

const onhandleResponse = (dispatch, data) => {
    onLoginSuccess(dispatch, data.data )
    console.log("FORGET");
    console.log(data.data);
}

const onLoginSuccess = (dispatch, forget  ) => {
            dispatch({ type: 'FORGET_SUCCESS', forget })
}