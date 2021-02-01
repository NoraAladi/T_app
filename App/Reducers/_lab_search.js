const INITIAL_STATE = { lab : []  , loading_doctor : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_LAB_SEARCH_ATTEMPT':
            return {...state , loading_doctor  : true }
        
        case 'GET_LAB_SEARCH_SUCCESS':
                return {...INITIAL_STATE ,  lab : action.lab , loading_doctor  : false }
    
        
        default : 
            return state ;
    }
}