const INITIAL_STATE = { countries : [] , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_COUNTRIES_ATTEMPT':
            return {...state , loading : true}
        
        case 'GET_CONTRIES_SUCCESS':
                return {...INITIAL_STATE , loading : false ,  countries : action.countries  }
    
        
        default : 
            return state ;
    }
}