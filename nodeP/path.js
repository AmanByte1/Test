const p=require("path");

const a=p.basename("D:\\Test\\nodeP")
console.log(a)

const b=p.dirname("D:\\Test\\nodeP")
console.log(b)


const b1=p.extname(__filename)
console.log(b1)
console.log(__filename)