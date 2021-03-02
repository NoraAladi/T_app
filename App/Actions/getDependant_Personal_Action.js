import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const Get_Dependant_Personal = (type,id) => {

    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');

        dispatch({ type: 'Dependant_Personal_ATTEMPT' });
        try {
            console.log('id : ' + id + '\n'
            +'type : ' + type )

            
                let response = await axios.get(`${g.BASE_URL}/api/PatientProfile/Dependant-Personal?${type}=${id}`,

                {
                    headers:
                    {
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,
                        'accept': 'text/plain',

                    }
                })
                
            if (response.data) {
                console.log('--- Dependant_Personal  API ----');
                console.log(response.data);
                dispatch({ type: 'Dependant_Personal_SUCCESS', dependantPersonal : response.data })
            }
        } catch (err) {
            console.log(err);
        }
    }
}