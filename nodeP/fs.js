const fs=require("fs");

fs.readFile('file.txt','utf-8',(err,data)=>{
    console.log(err,data)
    console.log(data)

})

fs.writeFile('file.txt',"This is a file which contain info",()=>{
    console.log("done")

})
fs.appendFile("file.txt"," hello",()=>{
    console.log("perfecto")
})