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
    data: {[key: string]: issue[]} | null
}