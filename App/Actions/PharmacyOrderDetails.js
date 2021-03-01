import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const Get_PharmacyOrderDetails = (id) => {

    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');

        dispatch({ type: 'PharmacyOrderDetails_ATTEMPT' });
        try {
            console.log('id : ' + id + '\n')

            
                let response = await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/PharmacyOrderDetails?orderId=${id}`,

                {
                    headers:
                    {
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,
                        'accept': 'text/plain',

                    }
                })
                
            if (response.data) {
                console.log('--- PharmacyOrderDetails API ----');
                console.log(response.data);
                dispatch({ type: 'PharmacyOrderDetails_SUCCESS', pharmacyOrderDetails: response.data.pharmacyOrderDetails })
            }
        } catch (err) {
            console.log(err);
        }
    }
}