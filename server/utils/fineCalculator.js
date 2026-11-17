export const calculateFine = (dueDate)=>{
    const finePerHour = 0.1;
    const today = new Date();
    if(today > dueDate) {
        const lastHours = Math.celi((today-dueDate)/(1000*60*60));
        const fine = lastHours*finePerHour;
        return fine;

    }
    return 0;
}