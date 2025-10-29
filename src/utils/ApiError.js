class ApiError extends Error {
    constructor(
       statusCode,
       message= "Something went wrong",
       errors = [],
       stack = ""
    ){
       super(message)
       this.statusCode=statusCode
       this.data = null
       this.message = message
       this.success = false;
       this.errors = errors

       if(stack){
         this.stack = stack
       }
       else{
         Error.captureStackTrace(this, this.constructor)
       }
    }
}

export {ApiError}


//jab bhi apiError send kr rhe to we are sending 
// some extra information with it rather than 
// just a error message 


//here status code means -> either it is client error or server error 
//error[] = this will carry List of extra errors (optional)
// ["Invalid email", "Password too short"]
//stack will carry -> Shows where in the code the error happened


// This gives a structured error object:

// {
//   "statusCode": 404,
//   "success": false,
//   "message": "User not found",
//   "errors": []
// }