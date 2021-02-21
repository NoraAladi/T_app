const INITIAL_STATE = { relation : [] , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_RELATION_ATTEMPT':
            return {...state , loading : true}
        
        case 'GET_RELATION_SUCCESS':
                return {...INITIAL_STATE , loading : false ,  relation : action.relation  }
    
        
        default : 
            return state ;
    }
}