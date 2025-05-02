export interface MemberCardProps {
    member: member;
    isOwner: boolean;
    onStartChat: () => void;
    onDelete: () => void;
    amIOwner: boolean;
} 