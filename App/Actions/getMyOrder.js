
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_MyOrder = () => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        const ID = await AsyncStorage.getItem('LOGIN_ID');
        dispatch({ type: 'GET_MyOrder_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/PharmacyOrders?dependentId=${ID}&PageNumer=1&PageSize=5`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ MyOrder ______');
            console.log(resp.data.results);
            onhandleResponse(dispatch, resp.data.results)

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

const onGetEmergency = (dispatch, MyOrder) => {
    dispatch({ type: 'GET_MyOrder_SUCCESS', MyOrder })
}