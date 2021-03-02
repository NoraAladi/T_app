const INITIAL_STATE = { putHealthResponse : {}  }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'Put_DependentHealth_ATTEMPT':
            return {...state  }
        
        case 'Put_DependentHealth_SUCCESS':
                return {...INITIAL_STATE ,  putHealthResponse : action.putHealthResponse  }
    
        
        default : 
            return state ;
    }
}