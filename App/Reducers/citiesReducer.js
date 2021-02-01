const INITIAL_STATE = { cities : [] , loadingCity : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_CITY_ATTEMPT':
            return {...state , loadingCity : true}
        
        case 'GET_CITY_SUCCESS':
                return {...INITIAL_STATE , loadingCity: false ,  cities : action.cities  }
    
        
        default : 
            return state ;
    }
}