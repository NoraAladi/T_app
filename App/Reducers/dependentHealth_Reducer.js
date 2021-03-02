const INITIAL_STATE = { dependantHealth : {}}
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'Dependant_Health_ATTEMPT':
            return {...state }
        
        case 'Dependant_Health_SUCCESS':
                return {...INITIAL_STATE ,  dependantHealth : action.dependantHealth  }
    
        
        default : 
            return state ;
    }
}