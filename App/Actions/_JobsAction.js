
import axios from 'axios';
import g from '../Gloabal';
var jobs = []
export const Get_Jobs = (countryId, CityId, page, loadmore) => {
    return async (dispatch) => {
        dispatch({ type: 'GET_JOBS_ATTEMPT' });
        try {
            let resp = await axios.get(`${g.BASE_URL}/api/Careers/PostedCareers?GovernorateId=${countryId}&CityId=${CityId}&jobfield=${1}&PageNumer=${page}&PageSize=${3}`,
                {
                    headers:
                    {
                        'accept': 'text/plain',
                        'authorizationKey': g.authorizationKey,

                    }
                })
            console.log('______ JOBS ______');
            console.log(resp.data);
            var totalNumberOfPages=resp.data.totalNumberOfPages
            if (loadmore == 1) {
                jobs = [...jobs, ...resp.data.results]
            }
            else {
                jobs=resp.data.results
            }
            dispatch({ type: 'GET_JOBS_SUCCESS', jobs, totalNumberOfPages })

        } catch (error) {
            if (error.response) {
                console.log(error.response.status);
            }
        }
    }
}
