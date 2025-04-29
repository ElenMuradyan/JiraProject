export async function updateCollabs(uid: string, collaborations: string[]) {
    try{
        const res = await fetch('/api/updateCollabs', {
            method: 'POST',
            body: JSON.stringify({uid, collaborations}),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!res.ok){
            throw new Error('Couldnt manage to update cookies.');
        };
        
    }catch{
        console.log('Couldnt manage to update cookies.');
    }
}