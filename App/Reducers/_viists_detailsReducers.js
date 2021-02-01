const INITIAL_STATE = { visit_details : []  , loading_details : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_VISITS_DETAILS_ATTEMPT':
            return {...state , loading_details  : true }
        
        case 'GET_VISITS_DETAILS_SUCCESS':
                return {...INITIAL_STATE ,  visit_details : action.visit_details , loading_details  : false }
    
        
        default : 
            return state ;
    }
}