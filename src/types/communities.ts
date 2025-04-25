export interface community {
    id: string,
    name: string,
    description: string,
    ownerId: string,
    members: member[],
}

export type member = {
    uid: string,
    firstName: string,
    lastName: string,
    imgUrl: string,                    
}

export interface collabsState {
    loading: boolean,
    error: string | null,
    collabs: community[]
}

export interface collabState {
    loading: boolean,
    error: string | null,
    collab: community | null
}