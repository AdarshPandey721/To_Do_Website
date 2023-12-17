const express = require("express");
const path=require("path");
const app = express();
require("./conn");
const Register=require("./registers");

const port = process.env.PORT || 3000;

const static_path= path.join(__dirname, "/public");

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));


app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register");
})

app.get("/login",(req,res)=>{
    res.render("login");
})

//create a new user in our database
app.post("/register",async (req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password == cpassword){

            const member= new Register({

                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                password : password,
                confirmpassword : cpassword
            })
            
            const registered = await member.save();
            res.status(201).redirect("index.html");
    }else {
                res.send("Password are not matching")
        }
    }catch(error){
        res.status(400).send(error);
    }
})

//Log in validaton

app.post("/login", async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const useremail= await Register.findOne({email});
        
        //console.log(`${email} and Password is ${password}`);
        if(useremail.password==password){
            res.status(201).redirect("/src/index.html");
        }else{
            res.send("Invalid log in details");
        }

    } catch (error) {
        res.status(400).send("Invalid Email")
    }
})

//console.log(path.join(__dirname, "/public/src"));
app.listen(port,()=>{
    console.log(`Server is running at port no ${port}`);
})