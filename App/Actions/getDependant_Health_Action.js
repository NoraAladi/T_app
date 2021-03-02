import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const Get_Dependant_Health = (type,id) => {

    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');

        dispatch({ type: 'Dependant_Health_ATTEMPT' });
        try {
            console.log('id : ' + id + '\n'
            +'type : ' + type )

            
                let response = await axios.get(`${g.BASE_URL}/api/PatientProfile/Dependant-health?${type}=${id}`,

                {
                    headers:
                    {
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,
                        'accept': 'text/plain',

                    }
                })
                
            if (response.data) {
                console.log('--- Dependant_Health  API ----');
                console.log(response.data);
                dispatch({ type: 'Dependant_Health_SUCCESS', dependantHealth : response.data })
            }
        } catch (err) {
            console.log(err);
        }
    }
}