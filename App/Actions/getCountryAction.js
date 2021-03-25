import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_Country = () => {
    return async (dispatch) => {
      //  const Token = await AsyncStorage.getItem('app_Token');
        dispatch({ type: 'GET_COUNTRIES_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/PublicMasterData/Governorates`,
                {
                    headers:
                    {
        //                'Authorization': `Bearer ${Token}`,
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                    }
                })
            console.log('______Country______');
            console.log(resp.data);
            onhandleResponse(dispatch, resp.data)

        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }

    }

}
const onhandleResponse = (dispatch, data) => {
    onGetCountries(dispatch, data)

}

const onGetCountries = (dispatch, countries) => {
    dispatch({ type: 'GET_CONTRIES_SUCCESS', countries })
}