import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import g from '../Gloabal';
var jobs = []
export const Get_Jobs = (countryId, CityId, page, loadmore) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_JOBS_ATTEMPT' });
        const countryId = await AsyncStorage.getItem('countryIdKey')
        const cityId = await AsyncStorage.getItem('cityIdKey')
        const Token = await AsyncStorage.getItem('app_Token');

        try {
            let resp = await axios.get(`${g.BASE_URL}/api/Careers/PostedCareers?${countryId == 0 ? null : 'governorateId=' + countryId + '&cityId=' + cityId}&PageNumer=${page}&PageSize=${3}`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,
                        'Authorization': `Bearer ${Token}`,

                    }
                })
            console.log('______ JOBS ______');
            console.log(resp.data);
            var totalNumberOfPages = resp.data.totalNumberOfPages
            if (loadmore == 1) {
                jobs = [...jobs, ...resp.data.results]
            }
            else {
                jobs = resp.data.results
            }
            dispatch({ type: 'GET_JOBS_SUCCESS', jobs, totalNumberOfPages })

        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }
    }
}
