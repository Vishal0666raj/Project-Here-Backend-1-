import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// for the req not for the cokies
app.use(express.json({limit: "16kb"}))   

// url has some special char which will be changed 
// into something like % or anything else to read 
// that we are using this 
app.use(express.urlencoded({extended: true,limit:"16kb"}))

app.use(express.static("Public"))


// Cookies are letters sent by the user in a 
// strange code.
// cookie-parser is a translator who opens each 
// letter and gives you the clear meaning.
app.use(cookieParser())


export { app }