
import axios from 'axios';
import g from '../Gloabal';
import AsyncStorage from '@react-native-community/async-storage';

export const delete_dependent = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'DELETE_DEPENDENT_ATTEMP' });
        const Token = await AsyncStorage.getItem('app_Token');
        try {
            console.log('id:' + id)
            let resp = await axios(`${g.BASE_URL}/api/PatientProfile/delete-dependant?dependantId=${id}`,
                {
                    method: 'PUT',
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': '574BECE6-E24F-4F94-AF08-FF578A64D782',
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ DELETE_DEPENDENT_API ______');
            console.log(resp.data);
            dispatch({ type: 'DELETE_DEPENDENT_SUCCESS', status: resp.status })

        } catch (error) {
            console.log(error);
            console.log('______ DELETE_DEPENDENT_catch______');

            if (error.response) {
                dispatch({ type: 'DELETE_DEPENDENT_FAIL', status: error.response.status })
                console.log(error.response.status);
            }
        }

    }

}
