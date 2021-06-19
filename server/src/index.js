require('dotenv').config();
const express = require("express")
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

const middlewares = require('./middlware');
const router = require('./api/logs');

const app = express() ;
app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(express.json())


mongoose.connect(process.env.DATABASE_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB atlas connected.")).catch(e => console.log(e))

app.get('/', (req, res) => {
    res.status(404)
    res.send('Hello world')
})

app.use("/api/logs" , router )

//not found error handling middlware
app.use(middlewares.notFound )

app.use(middlewares.errorHandler);

const port = process.env.PORT || 1338

app.listen(port, () => console.log("Server started on port" , `${port}`))