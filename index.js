require("dotenv").config()
const express=require("express")
const mongoose=require("mongoose")

const app=express()

app.use(express.urlencoded({ extended: true }));

const PORT=process.env.PORT
const db_url=process.env.DB_URL

mongoose.connect(db_url, {useNewUrlParser:true});

const blogSchema=new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    date: String
})

const Blog=mongoose.model("Blog", blogSchema);

app.post("/posts", (req, res)=>{
    const blog=new Blog({
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        date: new Date()
    })

    blog.save()
    res.sendStatus(200)
})

// app.get("/posts", (req, res)=>{
    
// })

app.listen(PORT, ()=>{
    console.log(`Listening at port number: ${PORT}...`)
})