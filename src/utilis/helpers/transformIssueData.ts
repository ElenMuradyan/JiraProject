import { issue } from "@/types/issues";
import { taskStatuses } from "../issues";

export async function transformIssueData (data: issue[]) {
    const container: { [key: string]: issue[]} = {};

    for(let i in taskStatuses){
        container[taskStatuses[i].key] = [];
    };

    const sortedArray = data.sort((a, b) => a.taskIndex - b.taskIndex);

    for(let item of sortedArray){
        if(container.hasOwnProperty(item.status)){
            container[item.status].push(item);
        }
    }
    return container;
}