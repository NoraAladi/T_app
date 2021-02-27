import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const Get_GenericHealthProfile = (type) => {
    return async (dispatch) => {
        const ID = await AsyncStorage.getItem('LOGIN_ID');
        const Token = await AsyncStorage.getItem('app_Token');

        dispatch({ type: 'GenericHealthProfile_ATTEMPT' });
        try {

            const response = await axios({
                method: 'GET',
                url: `${g.BASE_URL}/api/PatientMedicalFile/${type}`,
                headers: {
                    'accept': 'text/plain',
                    'authorizationKey': g.authorizationKey,
                    'Authorization': `Bearer ${Token}`,


                },
            })
            if (response.data) {
                console.log('--- GenericHealthProfile API ----');
                console.log(response.data);
                dispatch({ type: 'GenericHealthProfile_SUCCESS', GenericHealthProfile: response.data })
            }
        } catch (err) {
            console.log(err.response);
            dispatch({ type: 'GenericHealthProfile_SUCCESS', GenericHealthProfile: [] })

        }
    }
}