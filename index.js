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
    res.json({message: "Blog posted."})
})

app.get("/posts", async(req, res)=>{
    const blogs=await Blog.find({})
    res.json(blogs)
})

app.get("/posts/:id", async(req, res) => {
    const blog=await Blog.findById(req.params.id)
    res.json(blog)
})

app.patch("/posts/:id", async (req, res)=>{
    if(req.body.title) await Blog.updateOne({_id:req.params.id}, {title:req.body.title})
    if(req.body.content) await Blog.updateOne({_id:req.params.id}, {content:req.body.content})
    if(req.body.author) await Blog.updateOne({_id:req.params.id}, {author:req.body.author})

    res.json({message: "Blog updated."})
})

app.delete("/posts/:id", async(req, res)=>{
    await Blog.findByIdAndDelete(req.params.id)
    res.json({message:"Blog deleted."})
})

app.listen(PORT, ()=>{
    console.log(`Listening at port number: ${PORT}...`)
})