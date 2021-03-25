const INITIAL_STATE = { cancelOrder : null  , cancelLoading : false }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'CANCEL_ORDER_ATTEMPT':
            return {...state , cancelLoading  : true }
        
        case 'CANCEL_ORDER_SUCCESS':
                return {...INITIAL_STATE ,  cancelOrder : action.cancelOrder , cancelLoading  : false }

        default : 
            return state ;
    }
}