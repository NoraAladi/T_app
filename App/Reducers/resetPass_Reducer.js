const INITIAL_STATE = { message: '', loading: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RESET_ATTEMP':
            return { ...state, loading: true }

        case 'RESET_SUCCESS':
            return { ...INITIAL_STATE, message: action.message, loading: false }
        
        case 'RESET_FAIL':
            return { ...INITIAL_STATE, message: action.message, loading: false }


        default:
            return state;
    }
}