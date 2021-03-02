const INITIAL_STATE = { putPersonalResponse : {}  }
export default ( state = INITIAL_STATE , action ) =>
{
    switch( action.type)
    {
        case 'Put_DependentPersonal_ATTEMPT':
            return {...state  }
        
        case 'Put_DependentPersonal_SUCCESS':
                return {...INITIAL_STATE ,  putPersonalResponse : action.putPersonalResponse  }
    
        
        default : 
            return state ;
    }
}