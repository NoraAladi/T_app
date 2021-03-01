
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_PrescribedPharmacyOrderDetails = (pharmacyId, ClinicVisitId) => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        dispatch({ type: 'Prescribed_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/PatientServiceProviders/PrescribedPharmacyOrderDetails?pharmacyId=${pharmacyId}&ClinicVisitId=${ClinicVisitId}`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ Prescribed_API ______');
            console.log(resp);
            dispatch({ type: 'Prescribed_SUCCESS', Prescribed: resp })

        } catch (error) {
            if (error.response) {
                console.log(error.response);
                dispatch({ type: 'Prescribed_SUCCESS', Prescribed: error.response })

            }
        }

    }

}
