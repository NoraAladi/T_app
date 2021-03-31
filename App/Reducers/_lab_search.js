const INITIAL_STATE = { lab_rad: [], loading_lab: true, totalPages: 1 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_LAB_RAD_SEARCH_ATTEMPT':
            return { ...state, loading_lab: true }

        case 'GET_LAB__RAD_SEARCH_SUCCESS':
            return {
                ...INITIAL_STATE,
                lab_rad: action.lab_rad,
                loading_lab: false,
                totalPages: action.totalPages

            }


        default:
            return state;
    }
}