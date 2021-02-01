const INITIAL_STATE = { offer_detail : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_OFFERS_DETAILS_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_OFFERS_DETAILS_SUCCESS':
                return {...INITIAL_STATE ,  offer_detail : action.offer_detail , loading  : false }
    
        
        default : 
            return state ;
    }
}