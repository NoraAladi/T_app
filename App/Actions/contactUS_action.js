import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const contact_us = (supportCaseTypeId, supportCaseMessage) => {
    console.log(
        'supportCaseTypeId: ' + supportCaseTypeId + '\n' +
        'supportCaseMessage: ' + supportCaseMessage
    );
    return async (dispatch) => {
        const Token = await AsyncStorage.getItem('app_Token');
        dispatch({ type: 'CONTACT_ATTEMPT' });
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/PatientProfile/contactus`,
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json-patch+json',
                    'Authorization': `Bearer ${Token}`,
                    'authorizationKey': g.authorizationKey,

                },
                data:
                {
                    supportCaseTypeId: supportCaseTypeId,
                    supportCaseMessage: supportCaseMessage
                },
            })
            console.log('-- CONTACT API --');
            console.log(response.data);
            dispatch({ type: 'CONTACT_SUCCESS', contactResponse: response.data });

        } catch (err) {
            // Handle Error Here
            console.log('--- contact - catch');
            console.log(err);
            dispatch({ type: 'CONTACT_FAIL', contactResponse: err.response })


        }
    }
}

