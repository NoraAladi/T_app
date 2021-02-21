
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Edit_MedicalData = (
    height,
    weight,
    married,
    smoker,
    healthProfile,


) => {
    return async (dispatch) => {
        const id = await AsyncStorage.getItem('LOGIN_ID')
        dispatch({ type: 'EDIT_MEDICAL_DATA_ATTEMPT' });
        try {
            // alert('id:' + id + '\n' +
            //     'height : ' + height + '\n' +
            //     'weight : ' + weight + '\n' +
            //     'married : ' + married + '\n' +
            //     'smoker : ' + smoker + '\n' +
            //     'healthProfile : ' + JSON.stringify(healthProfile) + '\n'
            // )

            const data = {
                'id': id,
                'height': height,
                'weight': weight,
                'married': married,
                'smoker': smoker,
                'healthProfile': healthProfile,
            }

            let resp = await axios.put(`${g.BASE_URL}/api/PatientProfile/editprofile-medical`, data,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Content-Type': 'application/json-patch+json'
                    }
                })
            console.log('______ EDIT MEDICAL DATA CALL ______');
            console.log(resp.data);
            var status = resp.status
            dispatch({ type: 'EDIT_MEDICAL_DATA_ERROR', status })

        } catch (error) {
            if (error.response) {
                var status = error.response.status
                dispatch({ type: 'EDIT_MEDICAL_DATA_', status })
                console.log(error.response.status);
            }
        }

    }

}
