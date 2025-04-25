export const setFullNameLetter = ({ firstName, lastName }: Record<string, string>) => {
    if (firstName && lastName){
        return `${firstName[0]} ${lastName[0]}`;
    };
    return '-';
}