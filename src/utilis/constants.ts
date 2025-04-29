export const regexpValidation = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,16}$/;

export const ROUTE_CONSTANTS={
    HOME: '/',
    LOGIN:'/sign-in?mode=signin',
    REGISTER:'/sign-up?mode=signup',
    CABINET:'/Cabinet',
    PROFILE:'/Cabinet/Profile',
    ADDCOMMUNITY:'/Cabinet/AddCommunity',
    JOINCOMMUNITY:'/Cabinet/JoinCommunity',
    COMMUNITY: '/Cabinet/Community',
    ISSUES: 'Issues',
    MEMBERS: 'Members',
    MESSAGES: 'Messages'
};
export const FIRESTORE_PATH_NAMES = {
    COLLABORATIONS: 'collaborations',
    REGISTERED_USERS: 'registered_users',
    ISSUES: 'issues',
}

export const STORAGE_PATH_NAMES = {
    PROFILE_IMAGES: 'profile_images'
}