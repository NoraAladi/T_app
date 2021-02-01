const INITIAL_STATE = { user_d : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_USER_DATA_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_USER_DATA_SUCCESS':
                return {...INITIAL_STATE ,  user_d : action.user_d , loading  : false }
    
        
        default : 
            return state ;
    }
}