import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const Cancel_Order = (id) => {
    //  alert( email + "  "  )
    return async (dispatch) => {
        dispatch({ type: 'CANCEL_ORDER_ATTEMPT' });
        const Token = await AsyncStorage.getItem('app_Token');

        try {
            console.log('id:' + id + '\n')

            const data = {
                'id': id,
            }

  
                let response = await axios(`${g.BASE_URL}/api/PatientServiceProviders/CancelPharmacyOrder?orderId=${id}`,
                {
                    method: 'PUT',
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': '574BECE6-E24F-4F94-AF08-FF578A64D782',
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('---Cancel Order-------');
            console.log(response);
            dispatch({ type: 'CANCEL_ORDER_SUCCESS', cancelOrder: response })

        } catch (err) {
            // Handle Error Here
            console.log(err.response);

        }
    }
}

