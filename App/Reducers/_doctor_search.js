const INITIAL_STATE = { doctor: [], loading_doctor: false, totalPages: 1 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_DOCTOR_SEARCH_ATTEMPT':
            return { ...state, loading_doctor: true }

        case 'GET_DOCTOR_SEARCH_SUCCESS':
            return {
                ...INITIAL_STATE,
                doctor: action.doctor,
                loading_doctor: false,
                totalPages: action.totalPages

            }


        default:
            return state;
    }
}