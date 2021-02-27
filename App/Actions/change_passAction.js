import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const change_Pass = (
    oldpassword, password, confirmPassword
) => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        dispatch({ type: 'CHANGE_PASS_ATTEMPT' });
        //  alert(  oldpassword  + " " +   password     + " " +  confirmPassword   )
        const id = await AsyncStorage.getItem('LOGIN_ID')
        //call the backend 
        await axios({
            method: 'POST',
            url: `${g.BASE_URL}/api/PatientProfile/edit-password`,
            headers: {
                'accept': 'text/plain',
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${Token}`,
                'authorizationKey': g.authorizationKey,

            },
            data:
            {
                oldpassword: oldpassword,
                password: password,
                confirmPassword: confirmPassword,


            },
        }).then(resp => {
            console.log(resp.data);
            onhandleResponse(dispatch, resp)

        }).catch(err => {
            // alert( JSON.stringify(err.response.data) )

            console.log(err.response);
            if (err.response.data.message) {
                dispatch({ type: 'CHANGE_PASS_NOT', error: err.response.data.message })
                /// alert(err.response.data.message)
            }
            else
                dispatch({ type: 'CHANGE_PASS_NOT', error: Object.values(err.response.data.errors)[0][0] })
            ///   alert(Object.values(err.response.data.errors)[0][0] )

        })
    }
    // Handle Error Here


}

const onhandleResponse = (dispatch, data) => {
    onLoginSuccess(dispatch, data.data)
    //  console.log(data.data)
}

const onLoginSuccess = (dispatch, user) => {
    dispatch({ type: 'CHANGE_PASS_SUCCESS', user })
}