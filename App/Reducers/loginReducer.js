const INITIAL_STATE = { user: null, loading: false, error: '', message: '', status: 0 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_ATTEMPT':
            return { ...state, loading: true }

        case 'LOGIN_NOT':
            return {
                ...INITIAL_STATE, loading: false, error: action.error,
                status: action.status
            }

        case 'LOGIN_SUCCESS':
            return {
                ...INITIAL_STATE, loading: false, user: action.user,
                 status: action.status
            }

        default:
            return state;
    }
}