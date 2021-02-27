
import axios from 'axios';
import g from '../Gloabal';

export const Put_MicroInfo = (
    id,
    fullNameEn,
    fullNameAr,
    email,
    dateofBirth,
    password,
    confirmPassword

) => {
    return async (dispatch) => {
        dispatch({ type: 'PUT_MICRO_INFO_ATTEMPT' });
        try {
            console.log('id:' + id + '\n' +
                'fullNameEn : ' + fullNameEn + '\n' +
                'fullNameAr : ' + fullNameAr + '\n' +
                'email : ' + email + '\n' +
                'dateofBirth : ' + dateofBirth + '\n' +
                'password : ' + password + '\n' +
                'confirmPassword : ' + confirmPassword + '\n'

            )

            const data = {
                'id': id,
                'fullNameEn': fullNameEn,
                'fullNameAr': fullNameAr,
                'email': email,
                'dateofBirth': dateofBirth,
                'password': password,
                'confirmPassword': confirmPassword,
            }

            let resp = await axios.put(`${g.BASE_URL}/api/Accounts/MicroPersonalInfo`, data,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json',
                        'authorizationKey': g.authorizationKey,

                    }
                })
            console.log('______ PUT_MICRO_INFO_API ______');
            console.log(resp.data);
            dispatch({ type: 'PUT_MICRO_INFO_SUCCESS', status: resp.status, microInfo_updated: resp.data })

        } catch (error) {
            console.log(error);
            if (error.response) {
                dispatch({ type: 'PUT_MICRO_INFO_FAIL', status: error.response.status })
                console.log(error.response.status);
            }
        }

    }

}
