const INITIAL_STATE = { doctor : []  , loading_doctor : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_DOCTOR_SEARCH_ATTEMPT':
            return {...state , loading_doctor  : true }
        
        case 'GET_DOCTOR_SEARCH_SUCCESS':
                return {...INITIAL_STATE ,  doctor : action.doctor , loading_doctor  : false }
    
        
        default : 
            return state ;
    }
}