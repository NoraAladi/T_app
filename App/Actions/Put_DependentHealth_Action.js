import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Put_DependentHealth = (
    id,
    height,
    weight,
    smoker,
    married,
    healthProfile,

) => {
    return async (dispatch) => {
        dispatch({ type: 'Put_DependentHealth_ATTEMPT' });
        const Token = await AsyncStorage.getItem('app_Token');

        try {
            console.log('id:' + id + '\n' +
                'height : ' + height + '\n' +
                'weight : ' + weight + '\n' +
                'smoker : ' + smoker + '\n' +
                'married : ' + married + '\n' +
                'healthProfile : ' + JSON.stringify(healthProfile)

            )

            const data = {
                'id': id,
                'height': height,
                'weight': weight,
                'smoker': smoker,
                'married': married,
                'healthProfile': healthProfile,
                
            }

            let resp = await axios.put(`${g.BASE_URL}/api/PatientProfile/editdependant-medical`, data,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,


                    }
                })
            console.log('______ Put_DependentHealth_API ______');
            console.log(resp.data);
            dispatch({ type: 'Put_DependentHealth_SUCCESS', putHealthResponse: resp, })

        } catch (error) {
            console.log(error);
            dispatch({ type: 'Put_DependentHealth_SUCCESS', putHealthResponse: error.response, })

            
        }

    }

}
