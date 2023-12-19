const fs=require("fs");
let readData=""
fs.readFile("clean.txt","utf-8",function(error,data){
    readData=data;
    readData=readData.replace(/\s+/g," ");
    fs.writeFile("clean.txt",data=readData,function(){
        console.log("success");
    });
});



