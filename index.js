const express = require("express")

const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

//const server= express()
const server= require("./server")
const port = 4000

server.use(express.json())

//server.use(userRouter)
server.use("/users", userRouter)
server.use("/posts", postRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})