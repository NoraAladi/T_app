import axios from 'axios';
import g from "../Gloabal";

export const Get_PatientCode = (code,mobile) => {
    var status = 0
        , message = ''
    return async (dispatch) => {
        dispatch({ type: 'PATIENT_CODE_ATTEMPT' });
        try {
            //   alert('code : ' + code + '\n')

            const response = await axios({
                method: 'GET',
                url: `${g.BASE_URL}/api/Accounts/verify-patientcode?patientCode=${code}&mobileNumber=${mobile}`,
                headers: {
                    'accept': '*/*',
                    'authorizationKey': g.authorizationKey,

                },
            })
            if (response.data) {
                console.log('--- PATIENT CODE ----');
                console.log(response.data.message);
                status = response.status
                message = response.data.message
                dispatch({ type: 'PATIENT_CODE_SUCCESS', status, message })
            }
        } catch (err) {
            console.log(err.response);
            if (err.response) {
                //  console.log(err.response.message);
                status = err.response.status
                message = err.response.data.message
                dispatch({ type: 'PATIENT_CODE_FAIL', status, message })

            }

        }
    }
}