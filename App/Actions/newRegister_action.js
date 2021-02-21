import axios from 'axios';
import g from "../Gloabal";
import AsyncStorage from '@react-native-community/async-storage';

export const newRegister = (
    { fullNameAr,
        dateofBirth,
        profession,
        relativeTypeId
    }
) => {
    var status = 0

    return async (dispatch) => {
        dispatch({ type: 'NEW_REGISTER_ATTEMPT' });
        const id = await AsyncStorage.getItem('LOGIN_ID')
        alert(
            'id : ' + id + '\n' +
            'fullNameAr : ' + fullNameAr + '\n' +
            'dateofBirth : ' + dateofBirth + '\n' +
            'profession : ' + profession + '\n' +
            'relativeTypeId : ' + relativeTypeId
    
        )
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/PatientProfile/register-newdependant?parentId=${id}`,
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
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
                status = response.status
                dispatch({ type: 'NEW_REGISTER_SUCCESS', status })
            }
        } catch (err) {
            // Handle Error Here
            console.log(err);
          //  status = err.response.status
         //   dispatch({ type: 'NEW_REGISTER_FAIL', status })

        }
    }
}