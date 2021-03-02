import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const new_Register = (
    fullNameAr,
    dateofBirth,
    profession,
    relativeTypeId

) => {
    var status = 0

    return async (dispatch) => {
        dispatch({ type: 'NEW_REGISTER_ATTEMPT' });
        const id = await AsyncStorage.getItem('LOGIN_ID')
        const Token = await AsyncStorage.getItem('app_Token');

        try {
            console.log(
                'fullNameAr : ' + fullNameAr + '\n' +
                'dateofBirth : ' + dateofBirth + '\n' +
                'profession : ' + profession + '\n' +
                'relativeTypeId : ' + relativeTypeId)

            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/PatientProfile/register-newdependant`,
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,
                    'Authorization': `Bearer ${Token}`,


                },
                data:
                {
                    fullNameAr: fullNameAr,
                    dateofBirth: dateofBirth,
                    profession: profession,
                    relativeTypeId: relativeTypeId,

                },
            })
            if (response.data) {
                console.log('--- newDependent ----');
                console.log(response.data);
                dispatch({ type: 'NEW_REGISTER_SUCCESS', newRegister:response.data })
            }
        } catch (err) {
            console.log(err);
          
        }
    }
}