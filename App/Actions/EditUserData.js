
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Edit_UserData = (
    fullNameAr,
    dateofBirth,
    gender,
    mobileNumber,
    profession,
    jobFieldId,
    cityId,
    addressDetails,
    email,

) => {
    return async (dispatch) => {
        const id = await AsyncStorage.getItem('LOGIN_ID')

        dispatch({ type: 'EDIT_USER_DATA_ATTEMPT' });
        try {
            // alert( 'id:'+ id+'\n'+
            //     'fullNameAr : '+ fullNameAr+'\n'+
            //     'dateofBirth : '+ dateofBirth+'\n'+
            //     'gender : '+ gender+'\n'+
            //     'mobileNumber : '+ mobileNumber+'\n'+
            //     'profession : '+ profession+'\n'+
            //     'jobFieldId : '+ jobFieldId+'\n'+
            //     'cityId : '+ cityId+'\n'+
            //     'addressDetails : '+ addressDetails+'\n'+
            //     'email : ' + email)
            
            const data = {
                'id': id,
                'fullNameAr': fullNameAr,
                'dateofBirth': dateofBirth,
                'gender': gender,
                'mobileNumber': mobileNumber,
                'profession': profession,
                'jobFieldId': jobFieldId,
                'cityId': cityId,
                'addressDetails': addressDetails,
                'email': email,
            }
            let resp = await axios.put(`${g.BASE_URL}/api/PatientProfile/editprofile-personal`,data,

                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,

                    }
                })
            console.log('______ EDIT USER DATA CALL ______');
            console.log(resp.data);
            var status = resp.status
            dispatch({ type: 'EDIT_USER_DATA_SUCCESS', status })

        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }

    }

}
