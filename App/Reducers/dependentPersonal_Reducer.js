const INITIAL_STATE = { social : {}}
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'Dependant_Personal_ATTEMPT':
            return {...state }
        
        case 'Dependant_Personal_SUCCESS':
                return {...INITIAL_STATE ,  dependantPersonal : action.dependantPersonal  }
    
        
        default : 
            return state ;
    }
}