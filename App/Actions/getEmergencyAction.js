
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_Emergency = () => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        // const ID = await AsyncStorage.getItem('LOGIN_ID');
        dispatch({ type: 'GET_Emergency_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/MasterData/EmergencyNumbers`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ Emergency ______');
            console.log(resp.data);
            onhandleResponse(dispatch, resp.data)

        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }

    }

}
const onhandleResponse = (dispatch, data) => {
    onGetEmergency(dispatch, data)

}

const onGetEmergency = (dispatch, Emergency) => {
    dispatch({ type: 'GET_Emergency_SUCCESS', Emergency })
}