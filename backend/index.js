require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Jwt = require('jsonwebtoken');
const User = require('./model/User');
const Job = require("./model/Job")
const jwtKey = 'sandeep';
const app = express();
require('./db/conn')
app.use(express.json());
app.use(cors());


const PORT=process.env.PORT

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-job", async (req, resp) => {
    let job = new Job(req.body);
    let result = await job.save();
    resp.send(result);
});

app.get("/job", async (req, resp) => {
    const jobs = await Job.find();
    if (jobs.length > 0) {
        resp.send(jobs)
    } else {
        resp.send({ result: "No Job found" })
    }
});

app.delete("/job/:id", async (req, resp) => {
    let result = await Job.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

    app.get("/job/:id", async (req, resp) => {
        let result = await Job.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })

app.put("/job/:id", async (req, resp) => {
    let result = await Job.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/job/:id", async (req, resp) => {
    let result = await Job.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    let result = await Job.find({
        "$or": [
            {
                company: { $regex: req.params.key }  
            },
            {
                job: { $regex: req.params.key }
            },
            {
                salary: { $regex: req.params.key }
            }
        ]
    });
    resp.send(result);
})


app.listen(PORT, function () {
    console.log(`server is running on port ${PORT}`);
  });




