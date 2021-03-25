
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';

export const Get_City = (id) => {
    return async (dispatch) => {
      //  const Token = await AsyncStorage.getItem('app_Token');

        dispatch({ type: 'GET_CITY_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/PublicMasterData/Cities?governorateId=${id}`,
                {
                    headers:
                    {
        //                'Authorization': `Bearer ${Token}`,
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,

                    }
                })
            console.log('______ CITY ______');
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
    onGetCities(dispatch, data)

}

const onGetCities = (dispatch, cities) => {
    dispatch({ type: 'GET_CITY_SUCCESS', cities })
}