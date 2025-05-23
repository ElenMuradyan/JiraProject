import { 
    BugOutlined, 
    FlagOutlined, 
    CheckSquareOutlined,
    ArrowDownOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';

export const COLOR_TYPES: Record<string, string> = {
    RED: '#e44d42',
    ORANGE: '#e97f33',
    GREEN: '#65ba43',
    BLUE: '#4fade6'
};

export const taskStatuses: Record<string, { key: string, title: string }> = {
    TODO: {
        key: 'TODO',
        title: 'Todo'
    },
    IN_PROGRESS: {
        key: "IN_PROGRESS",
        title: 'In Progress'
    },
    TEST: {
        key: "TEST",
        title: 'Test'
    },
    DONE: {
        key: "DONE",
        title: 'Done'
    }
};

const ISSUE_TYPES: Record<string, string> = {
    BUG: 'bug',
    TASK: 'task',
    STORY: 'story'
};

export const ISSUE_OPTIONS: Record<string, {label: string, value: string, icon: React.ReactNode}> = {
    [ ISSUE_TYPES.BUG ]: {
        label: 'Bug',
        value: ISSUE_TYPES.BUG,
        icon: <BugOutlined style={{color: COLOR_TYPES.RED}} />
    },
    [ ISSUE_TYPES.TASK ]: {
        label: 'Task',
        value: ISSUE_TYPES.TASK,
        icon: <CheckSquareOutlined style={{color: COLOR_TYPES.BLUE}} />
    },
    [ ISSUE_TYPES.STORY ]: {
        label: 'Story',
        value: ISSUE_TYPES.STORY,
        icon: <FlagOutlined style={{color: COLOR_TYPES.GREEN}} />
    },
};

const ISSUE_PRIORITY: Record<string, string> = {
    HIGHEST: 'highest',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    LOWEST: 'lowest'
};

export const ISSUE_PRIORITY_OPTIONS: Record<string, {label: string, value: string, icon: React.ReactNode}> = {
    [ ISSUE_PRIORITY.HIGHEST ]: {
        label: 'Highest',
        value: ISSUE_PRIORITY.HIGHEST,
        icon: <ArrowUpOutlined style={{color: COLOR_TYPES.RED}} />
    },
    [ ISSUE_PRIORITY.HIGH ]: {
        label: 'High',
        value: ISSUE_PRIORITY.HIGH,
        icon: <ArrowUpOutlined style={{color: COLOR_TYPES.RED}} />
    },
    [ ISSUE_PRIORITY.MEDIUM ]: {
        label: 'Medium',
        value: ISSUE_PRIORITY.MEDIUM,
        icon: <ArrowUpOutlined style={{color: COLOR_TYPES.ORANGE}} />
    },
    [ ISSUE_PRIORITY.LOW ]: {
        label: 'Low',
        value: ISSUE_PRIORITY.LOW,
        icon: <ArrowDownOutlined style={{color: COLOR_TYPES.GREEN}} />
    },
    [ ISSUE_PRIORITY.LOWEST ]: {
        label: 'Lowest',
        value: ISSUE_PRIORITY.LOWEST,
        icon: <ArrowDownOutlined style={{color: COLOR_TYPES.GREEN}} />
    }
};