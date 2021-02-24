const INITIAL_STATE = { status: 0, loading: false, userDependent_completed: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'COMPLETE_SIGN_UP_DEPENDENT_ATTEMPT':
            return { ...state, loading: true }

        case 'COMPLETE_SIGN_UP_DEPENDENT_SUCCESS':
            return { ...INITIAL_STATE, status: action.status, loading: false, userDependent_completed: action.userDependent_completed }

        case 'COMPLETE_SIGN_UP_DEPENDENT_ERROR':
            return { ...INITIAL_STATE, status: action.status, loading: false }


        default:
            return state;
    }
}