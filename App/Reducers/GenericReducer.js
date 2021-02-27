const INITIAL_STATE = { GenericHealthProfile : {}  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GenericHealthProfile_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GenericHealthProfile_SUCCESS':
                return {...INITIAL_STATE ,  GenericHealthProfile : action.GenericHealthProfile , loading  : false }
    
        
        default : 
            return state ;
    }
}