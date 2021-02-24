const INITIAL_STATE = { contactResponse: [], loading: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CONTACT_ATTEMPT':
            return { ...state, loading: true }

        case 'CONTACT_SUCCESS':
            return { ...INITIAL_STATE, contactResponse: action.contactResponse, loading: false }
      
        case 'CONTACT_FAIL':
            return { ...INITIAL_STATE, contactResponse: action.contactResponse, loading: false }


        default:
            return state;
    }
}