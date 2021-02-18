import axios from 'axios';
import g from '../Gloabal';
export const Get_Country = () => {
    return async (dispatch) => {
        dispatch({ type: 'GET_COUNTRIES_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/MasterData/Governorates`,
                {
                    headers:
                    {
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