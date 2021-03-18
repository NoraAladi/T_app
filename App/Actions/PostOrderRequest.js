import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const Post_order = (
    pharmacyId,
    additionalItems,
    deliveryAddress,
    clinicVisitId,
    callMe,
    pharmacyOrderDetail
) => {
    console.log(
        'pharmacyId: ' + pharmacyId + '\n' +
        'additionalItems: ' + additionalItems + '\n' +
        'deliveryAddress: ' + deliveryAddress + '\n' +
        'clinicVisitId: ' + clinicVisitId + '\n' +
        'callMe: ' + callMe + '\n' +
        'pharmacyOrderDetail: ' + JSON.stringify(pharmacyOrderDetail)
    );
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        dispatch({ type: 'Post_order_ATTEMPT' });
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/PatientServiceProviders/PharmacyOrder`,
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${Token}`,
                    'authorizationKey': g.authorizationKey,

                },
                data:
                {
                    pharmacyId: pharmacyId ,
                    additionalItems: additionalItems ,
                    deliveryAddress: deliveryAddress ,
                    clinicVisitId:  clinicVisitId ,
                    callMe: callMe ,
                    pharmacyOrderDetail:  pharmacyOrderDetail
                },
            })
            console.log('-- POST ORDER API --');
            console.log(response.data);
            dispatch({ type: 'Post_order_SUCCESS', orderResponse: response });

        } catch (err) {
            // Handle Error Here
            console.log('--- post order - catch');
           // console.log(err);
            console.log(err.response);
            dispatch({ type: 'Post_order_FAIL', orderResponse: err.response })


        }
    }
}

