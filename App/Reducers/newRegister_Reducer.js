const INITIAL_STATE = { status : 0  , Edit_loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'NEW_REGISTER_ATTEMPT':
            return {...state , Edit_loading  : true }
        
        case 'NEW_REGISTER_SUCCESS':
            return { ...INITIAL_STATE, status: action.status, Edit_loading: false }
        
            case 'NEW_REGISTER_FAIL':
                return {...INITIAL_STATE ,  status : action.status , Edit_loading  : false }
                
        
        default : 
            return state ;
    }
}