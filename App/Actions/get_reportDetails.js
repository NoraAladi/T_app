import axios from 'axios';
import g from '../Gloabal'

export const get_reportDetails = (type,id) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_REPORT_DETAILS_ATTEMPT' });
    try {

      let res = await axios.get(`${g.BASE_URL}/api/PatientMedicalFile/${type}ReportsDetails?ReportsIds=${id}`,
        {
          headers:
          {
            'authorizationKey': g.authorizationKey,
            'accept': 'text/plain',
          }
        })
      if (res.data) {
        console.log('----- get_reportDetails API-----');
        console.log(res.data);

        dispatch({ type: 'GET_REPORT_DETAILS_SUCCESS', reportDetails: res.data })
      }
    } catch (error) {
      console.log(error.response);
    }
  }
}
