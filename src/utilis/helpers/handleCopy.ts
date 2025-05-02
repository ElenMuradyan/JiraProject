export const handleCopy = async (shareUrl: string) => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch(err: any) {
        console.log(err.message);
    }
};
