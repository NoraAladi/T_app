const INITIAL_STATE = { pharmacyOrderDetails : []  , loading : false }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'PharmacyOrderDetails_ATTEMPT':
            return {...state , loading  : true }
        
        case 'PharmacyOrderDetails_SUCCESS':
                return {...INITIAL_STATE ,  pharmacyOrderDetails : action.pharmacyOrderDetails , loading  : false }
    
        
        default : 
            return state ;
    }
}