

//  the belwo codw wil tell when to do after how many time you need to do

import cron from "node-cron";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Borrow } from "../models/borrowModel.js";


//  there is basiclly sheduling
export const notifyUsers= ()=>{
    cron.schedule("*/30 * * * *", async() =>{
        
        // 
        try{
            const oneDayAgo = new Date(Date.now()-24*60*60*1000);
            const borrowers = await Borrow.find({
                dueDate:{
                    $it: oneDayAgo,
                },
                returnDate:null,
                notified:false
            });
            for (const element of borrowers){
                if(element.user && element.user.email){
                    // const user = await User.findById(element.user.id)
                    sendEmail({
                        email:element.user.email,
                        subject:"Book return Reminder",
                        message:`Hello ${element.user.name},\n\n This is a reminder that the book you borrowe need to return otherwise you have to pay the fine `
                    })
                    element.notified=true;
                    await element.save()
                }
            }

        }
        catch(error){
            console.error("Some error occurd while nofigying users")
            
        }
    })
}