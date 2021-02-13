const INITIAL_STATE = { user : null , loading : false , error : '' , message : ''}
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'SIGN_UP_ATTEMPT':
            return {...state , loading : true}
        
        case 'SIGN_UP_NOT':
                return {...INITIAL_STATE , loading : false  , error : action.error ,
                     }

         case 'SIGN_UP_SUCCESS':
                    return {...INITIAL_STATE , loading : false , user : action.user , 
                        message : action.message }
    
        default : 
            return state ;
    }
}