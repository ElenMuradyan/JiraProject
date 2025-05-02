export const useWindowWidth = () => {
    return typeof window !== 'undefined' && window.innerWidth > 1250
}