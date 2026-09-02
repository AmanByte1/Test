const myevent=require("events");

const myEmitter =new myevent();

myEmitter.on("waterfull1",()=>{
    console.log("waterfull event is occured reminder")
})

myEmitter.on("waterfull",()=>{
    console.log("waterfull event is occured")
})
myEmitter.emit("waterfull")
myEmitter.emit("waterfull1")