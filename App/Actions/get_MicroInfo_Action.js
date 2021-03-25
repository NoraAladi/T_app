
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_MicroInfo = (code) => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        dispatch({ type: 'GET_MICRO_INFO_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/Accounts/MicroPersonalInfo?patientCode=${code}`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ GET_MICRO_INFO ______');
            console.log(resp.data);
            dispatch({ type: 'GET_MICRO_INFO_SUCCESS', microInfo: resp.data })

        } catch (error) {
            console.log(error);
        }

    }

}
