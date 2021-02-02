const INITIAL_STATE = { forget : null , loading : false , error : '' , message : ''}
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'FORGETPASS_ATTEMPT':
            return {...state , loading : true}
        
        case 'FOGERT_NOT':
                return {...INITIAL_STATE , loading : false  , error : action.error ,
                     }

         case 'FORGET_SUCCESS':
                    return {...INITIAL_STATE , loading : false , forget : action.forget , 
                        message : action.message }
                        
        default : 
            return state ;
    }
}