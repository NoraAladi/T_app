const INITIAL_STATE = { user_i : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_USER_INFO_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_USER_INFO_SUCCESS':
                return {...INITIAL_STATE ,  user_i : action.user_i , loading  : false }
    
        
        default : 
            return state ;
    }
}