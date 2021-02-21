import axios from 'axios';
import g from '../Gloabal'

export const Get_Relation = () => {
  return async (dispatch) => {
    dispatch({ type: 'GET_RELATION_ATTEMPT' });
    try {

      let res = await axios.get(`${g.BASE_URL}/api/MasterData/RelationTypes`,
        {
          headers:
          {
            'authorizationKey': g.authorizationKey,
            'accept': 'text/plain',
          }
        })
      if (res.data) {
        console.log('----- RELATION -----');
        console.log(res.data);

        var relation = []
        relation = res.data
        dispatch({ type: 'GET_RELATION_SUCCESS', relation })
      }
    } catch (error) {
      console.log(error.response);
    }
  }
}
