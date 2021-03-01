const INITIAL_STATE = { reportDetails : []  , loading : false }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_REPORT_DETAILS_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_REPORT_DETAILS_SUCCESS':
                return {...INITIAL_STATE ,  reportDetails : action.reportDetails , loading  : false }
    
        
        default : 
            return state ;
    }
}