const INITIAL_STATE = { status: 0, loading_del: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'DELETE_DEPENDENT_ATTEMP':
            return { ...state, loading_del: true }

        case 'DELETE_DEPENDENT_SUCCESS':
            return { ...INITIAL_STATE, status: action.status, loading_del: false }

        case 'DELETE_DEPENDENT_FAIL':
            return { ...INITIAL_STATE, status: action.status, loading_del: false }


        default:
            return state;
    }
}