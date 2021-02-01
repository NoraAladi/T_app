const INITIAL_STATE = { Dependants : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_Dependants_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_Dependants_SUCCESS':
                return {...INITIAL_STATE ,  Dependants : action.Dependants , loading  : false }
    
        
        default : 
            return state ;
    }
}