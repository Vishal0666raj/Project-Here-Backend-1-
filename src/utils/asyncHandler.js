const aysncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}

export {aysncHandler}


// this is for the try and catch that async throw 
// if errors occur