const INITIAL_STATE = { Emergency : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_Emergency_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_Emergency_SUCCESS':
                return {...INITIAL_STATE ,  Emergency : action.Emergency , loading  : false }
    
        
        default : 
            return state ;
    }
}