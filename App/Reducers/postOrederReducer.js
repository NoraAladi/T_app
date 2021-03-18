const INITIAL_STATE = { orderResponse : {}  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'PharmacyOrderDetails_ATTEMPT':
            return {...state , loading  : true }
        
        case 'Post_order_SUCCESS':
                return {...INITIAL_STATE ,  orderResponse : action.orderResponse , loading  : false }
    
                case 'Post_order_FAIL':
                    return {...INITIAL_STATE ,  orderResponse : action.orderResponse , loading  : false }
        
        default : 
            return state ;
    }
}