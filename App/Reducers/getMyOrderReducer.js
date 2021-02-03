const INITIAL_STATE = { MyOrder : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_MyOrder_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_MyOrder_SUCCESS':
                return {...INITIAL_STATE ,  MyOrder : action.MyOrder , loading  : false }
    
        
        default : 
            return state ;
    }
}