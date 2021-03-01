const INITIAL_STATE = { Prescribed : {}  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'Prescribed_ATTEMPT':
            return {...state , loading  : true }
        
        case 'Prescribed_SUCCESS':
                return {...INITIAL_STATE ,  Prescribed : action.Prescribed , loading  : false }
    
        
        default : 
            return state ;
    }
}