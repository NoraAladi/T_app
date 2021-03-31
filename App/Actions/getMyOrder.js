
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';
var results = []

export const Get_MyOrder = (page) => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        const ID = await AsyncStorage.getItem('LOGIN_ID');
        dispatch({ type: 'GET_MyOrder_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/PharmacyOrders?dependentId=${ID}&PageNumer=${page}&PageSize=5`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ MyOrder ______');
            console.log(resp.data);
            if (page == 1)
                results = resp.data.results
            else
                results = [...results, ...resp.data.results]
            dispatch({ type: 'GET_MyOrder_SUCCESS', MyOrder: results, totalPages: resp.data.totalNumberOfPages })


        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }

    }

}
