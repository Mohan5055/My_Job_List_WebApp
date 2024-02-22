const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: String,
    job: String,
    salary: String,
    userId:String,
});

module.exports = mongoose.model("jobData", jobSchema);