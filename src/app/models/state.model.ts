export interface State {
    currentUser: {
        firstName: string,
        lastName: string,
        email: string,
        userId: number,
        isLoggedIn: boolean,
    },
    currentJob: {
        jobId: number,
    }
 };