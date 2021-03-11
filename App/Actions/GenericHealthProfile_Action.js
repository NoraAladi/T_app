import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';
var isDependent = ''

export const Get_GenericHealthProfile = (type) => {
    console.log('type: '+type);
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        const dependentId = await AsyncStorage.getItem('dependentId');
        console.log('----- Generic api call -----');
        console.log('dependentId: ' + dependentId);
        if (dependentId) {
          isDependent = `?dependantId=${dependentId}`
        }
        else {
          isDependent = ''
        }
        dispatch({ type: 'GenericHealthProfile_ATTEMPT' });
        try {

            const response = await axios({
                method: 'GET',
                url: `${g.BASE_URL}/api/PatientMedicalFile/${type}${isDependent}`,
                headers: {
                    'accept': 'text/plain',
                    'authorizationKey': g.authorizationKey,
                    'Authorization': `Bearer ${Token}`,


                },
            })
            if (response.data) {
                console.log('--- GenericHealthProfile API  ----');
                console.log(response.data);
                dispatch({ type: 'GenericHealthProfile_SUCCESS', GenericHealthProfile: response.data })
            }
        } catch (err) {
            console.log(err.response);
            dispatch({ type: 'GenericHealthProfile_SUCCESS', GenericHealthProfile: [] })

        }
    }
}