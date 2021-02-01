
import axios from 'axios';
import g from '../Gloabal';

export const Get_City = (token,id) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_CITY_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/MasterData/Cities?governorateId=${id}`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${token}`,

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