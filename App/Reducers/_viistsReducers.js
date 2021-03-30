const INITIAL_STATE = { visit : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_VISITS_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_VISITS_SUCCESS':
                return {...INITIAL_STATE ,  visit : action.visit , loading  : false }
    
        
        default : 
            return state ;
    }
}