import axios from 'axios';
import g from '../Gloabal'

export const Get_supportTypes = () => {
  return async (dispatch) => {
    dispatch({ type: 'GET_SUPPORT_ATTEMPT' });
    try {

      let res = await axios.get(`${g.BASE_URL}/api/MasterData/SupportTypes`,
        {
          headers:
          {
            'accept': 'text/plain',
            'authorizationKey': g.authorizationKey,

          }
        })
      if (res.data) {
        console.log('----- Get_supportTypes API -----');
        console.log(res.data);

        dispatch({ type: 'GET_SUPPORT_SUCCESS', supportTypes: res.data })
      }
    } catch (error) {
      console.log(error.response);
    }
  }
}
