
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_Dependants = () => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        const ID = await AsyncStorage.getItem('LOGIN_ID');
        dispatch({ type: 'GET_Dependants_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/PatientProfile/AllUsers`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ Dependants ______');
            console.log(resp.data);
            dispatch({ type: 'GET_Dependants_SUCCESS', Dependants: resp.data })

        } catch (error) {
            console.log(error);
            dispatch({ type: 'GET_Dependants_FAIL', Dependants: [] })

            if (error.response) {
                console.log(error.response.status);
            }
        }

    }

}
