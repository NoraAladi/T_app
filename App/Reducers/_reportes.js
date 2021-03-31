const INITIAL_STATE = { reportes: [], loading: true, totalPages: 1 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_REPORTES_ATTEMPT':
            return { ...state, loading: true }

        case 'GET_REPORTES_SUCCESS':
            return {
                ...INITIAL_STATE,
                reportes: action.reportes,
                loading: false,
                totalPages: action.totalPages
            }


        default:
            return state;
    }
}