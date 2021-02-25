import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const Get_PharmacyOrderDetails = (id) => {

    return async (dispatch) => {
        const ID = await AsyncStorage.getItem('LOGIN_ID');

        dispatch({ type: 'PharmacyOrderDetails_ATTEMPT' });
        try {
            console.log('id : ' + id + '\n')

            const response = await axios({
                method: 'GET',
                url: `${g.BASE_URL}/api/PatientServiceProviders/PharmacyOrderDetails?patientId=${ID}&orderId=${id}`,
                headers: {
                    'accept': 'text/plain',
                    'authorizationKey': g.authorizationKey,

                },
            })
            if (response.data) {
                console.log('--- PharmacyOrderDetails API ----');
                console.log(response.data.pharmacyOrderDetails);
                dispatch({ type: 'PharmacyOrderDetails_SUCCESS', pharmacyOrderDetails: response.data.pharmacyOrderDetails })
            }
        } catch (err) {
            console.log(err.response);
        }
    }
}