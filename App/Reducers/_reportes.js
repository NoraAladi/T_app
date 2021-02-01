const INITIAL_STATE = { reportes : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_REPORTES_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_REPORTES_SUCCESS':
                return {...INITIAL_STATE ,  reportes : action.reportes , loading  : false }
    
        
        default : 
            return state ;
    }
}