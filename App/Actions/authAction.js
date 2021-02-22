import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const loginuser = ({ email, password }) => {
    // alert( email + "  " + password )
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_ATTEMPT' });

        //call the backend 
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/Accounts/Login`,
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,
                },
                data:
                {
                    email: email,
                    password: password
                },
            })
            if (response.data) {
                console.log('----- Login Success -----');
                console.log(response.data);
                AsyncStorage.setItem('patientCode', response.data.patient.code)
                onhandleResponse(dispatch, response)
            }
        } catch (err) {
            // Handle Error Here
            if (err.response.data.message) {
                dispatch({ type: 'LOGIN_NOT', error: err.response.data.message })

            }
            else
                dispatch({ type: 'LOGIN_NOT', error: Object.values(err.response.data.errors)[0][0] })
        }
    }
}

const onhandleResponse = (dispatch, data) => {
    onLoginSuccess(dispatch, data.data, data.data.jwtToken, data.data.role, data.data.id)
    //  console.log(data.data)
}

const onLoginSuccess = (dispatch, user, jwtToken, role, id) => {
    AsyncStorage.setItem('app_Token', jwtToken)
        .then(() => {
            dispatch({ type: 'LOGIN_SUCCESS', user })
        });

    AsyncStorage.setItem('ROLE', role)
    AsyncStorage.setItem('LOGIN_ID', String(id))


}