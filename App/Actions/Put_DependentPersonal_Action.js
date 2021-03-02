import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Put_DependentPersonal = (
    id,
    fullNameAr,
    dateofBirth,
    profession,
    relativeTypeId,

) => {
    return async (dispatch) => {
        dispatch({ type: 'Put_DependentPersonal_ATTEMPT' });
        const Token = await AsyncStorage.getItem('app_Token');

        try {
            console.log('id:' + id + '\n' +
                'fullNameAr : ' + fullNameAr + '\n' +
                'dateofBirth : ' + dateofBirth + '\n' +
                'profession : ' + profession + '\n' +
                'relativeTypeId : ' + relativeTypeId 

            )

            const data = {
                'id': id,
                'fullNameAr': fullNameAr,
                'dateofBirth': dateofBirth,
                'profession': profession,
                'relativeTypeId': relativeTypeId,
                
            }

            let resp = await axios.put(`${g.BASE_URL}/api/PatientProfile/editdependant-personal`, data,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json-patch+json',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,


                    }
                })
            console.log('______ Put_DependentPersonal_API ______');
            console.log(resp.data);
            dispatch({ type: 'Put_DependentPersonal_SUCCESS', putPersonalResponse: resp, })

        } catch (error) {
            console.log(error);
            dispatch({ type: 'Put_DependentPersonal_SUCCESS', putPersonalResponse: error.response, })

            
        }

    }

}
