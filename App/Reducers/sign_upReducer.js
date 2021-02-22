const INITIAL_STATE = { status: 0, loading: false, message: '', id: 0 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SIGN_UP_ATTEMPT':
            return { ...state, loading: true }

        case 'SIGN_UP_SUCCESS':
            return {
                ...INITIAL_STATE, loading: false, message: action.message,
                status: action.status, id: action.id
            }

        case 'SIGN_UP_FAIL':
            return {
                ...INITIAL_STATE, loading: false, message: action.message,
                status: action.status,
            }

        default:
            return state;
    }
}