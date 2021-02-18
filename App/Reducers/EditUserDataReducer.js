const INITIAL_STATE = { status : 0  , Edit_loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'EDIT_USER_DATA_ATTEMPT':
            return {...state , Edit_loading  : true }
        
        case 'EDIT_USER_DATA_SUCCESS':
                return {...INITIAL_STATE ,  status : action.status , Edit_loading  : false }
    
        
        default : 
            return state ;
    }
}