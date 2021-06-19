const express = require("express");
const router = express.Router();

const LogEntry = require('../models/LogEntry')

router.get('/' , async (req, res , next) => {
  try {
      const entries = await LogEntry.find()
      res.json(entries)
  } catch (error) {
      next(error)
  } 
})

router.post('/', async  (req,res,next) => {
  
    try {
        const logEntry = new LogEntry(req.body)
        const createdEntry = await logEntry.save();
        console.log(createdEntry);
        res.json(createdEntry)
    } catch (error) {
        console.log(error);
        if (error.name === 'ValidationError') res.status(402)
        next(error)
    }
})

module.exports = router