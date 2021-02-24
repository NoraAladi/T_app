const INITIAL_STATE = { supportTypes : [] , loading : false }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_SUPPORT_ATTEMPT':
            return {...state , loading : true}
        
        case 'GET_SUPPORT_SUCCESS':
                return {...INITIAL_STATE , loading : false ,  supportTypes : action.supportTypes  }
    
        
        default : 
            return state ;
    }
}