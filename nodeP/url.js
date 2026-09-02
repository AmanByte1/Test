import url from "url";


const myurl =new URL("https://eample.org");

myurl.pathname='/a/b/c';
myurl.hash="#fgh";
myurl.search="?a=e"

console.log(myurl)
console.log(myurl.href)