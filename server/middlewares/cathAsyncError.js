export const  catchAsyncError = (theFuncation) =>{
    //  these will receive the function as an argument  if there is to then it run or it is catch the error and pass it to the next middleware
    // in tha app.js then from there it will call the errorMiddleware and it will handle the error and send the response to the client
    return (req, res, next) =>{
        Promise.resolve(theFuncation(req, res, next)).catch(next);
    }
}

