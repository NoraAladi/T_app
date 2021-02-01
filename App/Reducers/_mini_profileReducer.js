const INITIAL_STATE = { mini : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_MINI_PROFILE_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_MINI_PROFILE_SUCCESS':
                return {...INITIAL_STATE ,  mini : action.mini , loading  : false }
    
        
        default : 
            return state ;
    }
}