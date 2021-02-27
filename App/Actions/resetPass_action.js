import axios from 'axios';
import g from "../Gloabal";

export const Reset_Pass = (token, password, confirmPassword) => {
    console.log(
        'token: ' + token + '\n' +
        'password: ' + password + '\n' +
        'confirmPassword: ' + confirmPassword
    );
    return async (dispatch) => {
        dispatch({ type: 'RESET_ATTEMP' });
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/Accounts/reset-password`,
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,

                },
                data:
                {
                    token: token,
                    password: password,
                    confirmPassword: confirmPassword
                },
            })
            console.log('-- Reset Api --');
            console.log(response.data);
            dispatch({ type: 'RESET_SUCCESS', message: response.data.message });

        } catch (err) {
            // Handle Error Here
            console.log('--- RESET - catch');
            console.log(err.response);
            if (err.response.data.message)
                dispatch({ type: 'RESET_FAIL', message: err.response.data.message })
            else
            dispatch({ type: 'RESET_FAIL', message: Object.values(err.response.data.errors)[0][0] })

        }
    }
}

