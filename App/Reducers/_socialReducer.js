const INITIAL_STATE = { social : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_SOCIAL_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_SOCIAL_SUCCESS':
                return {...INITIAL_STATE ,  social : action.social , loading  : false }
    
        
        default : 
            return state ;
    }
}