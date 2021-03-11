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
                dispatch({ type: 'LOGIN_SUCCESS', user: response.data, status: response.status })

                await AsyncStorage.setItem('patientCode', response.data.patient.code)
                await AsyncStorage.setItem('patientName', response.data.patient.fullNameAr)

                await AsyncStorage.setItem('refreshToken', response.data.refreshToken)
                await AsyncStorage.setItem('user', JSON.stringify(response.data))
                AsyncStorage.removeItem('dependentId')
                await AsyncStorage.setItem('app_Token', response.data.jwtToken)
                await AsyncStorage.setItem('ROLE', response.data.role)
                await AsyncStorage.setItem('LOGIN_ID', String(response.data.id))


            }
        } catch (err) {
            // Handle Error Here
            console.log(err.response.data);
            if (err.response.data.message) {
                dispatch({ type: 'LOGIN_NOT', error: err.response.data.message, status: err.response.status })

            }
            else
                dispatch({ type: 'LOGIN_NOT', error: Object.values(err.response.data.errors)[0][0], status: err.response.status })
        }
    }
}
