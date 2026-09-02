const http=require("http");

const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader("conntent-type","text/html")

    res.end("<h1>hellow world</h1><p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>")


})
server.listen(3000)
// zgKLbFkxOLXF2BX9