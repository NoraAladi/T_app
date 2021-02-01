const INITIAL_STATE = { offers : []  , loading : true }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'GET_OFFERS_ATTEMPT':
            return {...state , loading  : true }
        
        case 'GET_OFFERS_SUCCESS':
                return {...INITIAL_STATE ,  offers : action.offers , loading  : false }
    
        
        default : 
            return state ;
    }
}