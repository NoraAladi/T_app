const INITIAL_STATE = { status: 0, complete_loading: false, user_completed: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COMPLETE_SIGN_UP_ATTEMPT':
            return { ...state, complete_loading: true }

        case 'COMPLETE_SIGN_UP_SUCCESS':
            return { ...INITIAL_STATE, status: action.status, complete_loading: false ,user_completed: action.user_completed }

        case 'COMPLETE_SIGN_UP_ERROR':
            return { ...INITIAL_STATE, status: action.status, complete_loading: false }


        default:
            return state;
    }
}