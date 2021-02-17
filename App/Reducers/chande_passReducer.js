const INITIAL_STATE = { user : null , loading : false , error : '' , message : ''}
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'CHANGE_PASS_ATTEMPT':
            return {...state , loading : true}
        
        case 'CHANGE_PASS_NOT':
                return {...INITIAL_STATE , loading : false  , error : action.error ,
                     }

         case 'CHANGE_PASS_SUCCESS':
                    return {...INITIAL_STATE , loading : false , user : action.user , 
                        message : action.message }
    
        default : 
            return state ;
    }
}