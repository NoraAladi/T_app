
import axios from 'axios';
import g from '../Gloabal';

export const completeRegister = (
    id,
    height,
    weight,
    married,
    smoker,
    healthProfile,


) => {
    return async (dispatch) => {
        dispatch({ type: 'COMPLETE_SIGN_UP_ATTEMPT' });
        try {
            console.log('id:' + id + '\n' +
                'height : ' + height + '\n' +
                'weight : ' + weight + '\n' +
                'married : ' + married + '\n' +
                'smoker : ' + smoker + '\n' +
                'healthProfile : ' + JSON.stringify(healthProfile) + '\n'
            )

            const data = {
                'id': id,
                'height': height,
                'weight': weight,
                'married': married,
                'smoker': smoker,
                'healthProfile': healthProfile,
            }

            let resp = await axios.put(`${g.BASE_URL}/api/Accounts/completeregister-newpatient`, data,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json',
                        'authorizationKey': g.authorizationKey,

                    }
                })
            console.log('______ COMPLETE_SIGN_UP_API ______');
            console.log(resp.data);
            var status = resp.status
            dispatch({ type: 'COMPLETE_SIGN_UP_SUCCESS', status, user_completed: resp.data })

        } catch (error) {
            if (error.response) {
                var status = error.response.status
                dispatch({ type: 'COMPLETE_SIGN_UP_ERROR', status })
                console.log(error.response.status);
            }
        }

    }

}
