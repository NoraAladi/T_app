const INITIAL_STATE = { jobs: [], loading: true, totalNumberOfPages: 1 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_JOBS_ATTEMPT':
            return { ...state, loading: true, totalNumberOfPages: 1 }

        case 'GET_JOBS_SUCCESS':
            return { ...INITIAL_STATE, jobs: action.jobs, loading: false, totalNumberOfPages: action.totalNumberOfPages }


        default:
            return state;
    }
}