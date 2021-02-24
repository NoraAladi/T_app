
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';
export const completeRegisterDependent = (
    id,
    height,
    weight,
    married,
    smoker,
    healthProfile,


) => {
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        const ID = await AsyncStorage.getItem('LOGIN_ID')

        dispatch({ type: 'COMPLETE_SIGN_UP_DEPENDENT_ATTEMPT' });
        try {
            console.log(
                'parentID : ' + ID + '\n' +
                'id:' + id + '\n' +
                'height : ' + height + '\n' +
                'weight : ' + weight + '\n' +
                'married : ' + married + '\n' +
                'smoker : ' + smoker + '\n' +
                'healthProfile : ' + JSON.stringify(healthProfile) + '\n'
            )

            const data = {
                "id": id,
                "height": height,
                "weight": weight,
                "married": married,
                "smoker": smoker,
                "healthProfile": healthProfile
            }

            let resp = await axios.put(`${g.BASE_URL}/api/PatientProfile/completeregister-newdependant?parentId=${ID}`, data,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json',

                    }
                })
            console.log('______ COMPLETE_SIGN_UP_API ______');
            console.log(resp.data);
            var status = resp.status
            dispatch({ type: 'COMPLETE_SIGN_UP_DEPENDENT_SUCCESS', status, userDependent_completed: resp.data })

        } catch (error) {
            console.log(error);
            if (error.response) {
                var status = error.response.status
                dispatch({ type: 'COMPLETE_SIGN_UP_DEPENDENT_ERROR', status })
            }
        }

    }

}
