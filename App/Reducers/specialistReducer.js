const INITIAL_STATE = { specialist : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_SPECIALIST_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_SPECIALIST_SUCCESS':
                return {...INITIAL_STATE ,  specialist : action.specialist , loading  : false }
    
        
        default : 
            return state ;
    }
}