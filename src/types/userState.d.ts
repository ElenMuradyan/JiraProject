export interface stateInterface {
    loading: boolean,
    error: string | null,
    authUserInfo: {
        isAuth: boolean,
        userData: userData | null
    }
}

export interface userData  {
    uid: string,
    imgUrl: string,
    firstName: string,
    lastName: string,
    email: string,
    collabIds: string[],
    phone?: string,
}
