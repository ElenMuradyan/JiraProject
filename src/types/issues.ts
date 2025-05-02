export interface issue {
    date: string,
    description: string,
    issueName: string,
    priority: string,
    status: string,
    taskId: string,
    taskIndex: number,
    type: string
}

export interface issueState {
    error: string | null,
    loading: boolean,
    data: data | null
}

export type data = {[key: string]: issue[]}