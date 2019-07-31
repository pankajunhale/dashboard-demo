'use strict';
/*
* Start the Server
* Listen to the port
* Add Dependencies
*/

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const { parse } = require('querystring');
const router = require('./lib/handler');
const config = require('./lib/config');
const _fileService = require('./lib/file.service');
//
const server = http.createServer(function(req,res){
    
    const parsedUrl = url.parse(req.url,true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'');
    //get method
    const method = req.method.toUpperCase();
    //get query string object
    const queryStringObject = parsedUrl.query;
    const headers = req.headers;
    console.log("\n-- Headers ---");
    for (let item in headers) {
     //  console.log(`\n${item} : ${headers[item]}`);        
    }
    console.log("\n-- Querystring ---");
    for (let item in queryStringObject) {
        console.log(`\n${item} : ${queryStringObject[item]}`);        
    }
    //read the payload if any
    const decoder = new StringDecoder('utf-8');
    let payload = "";
    req.on("data",(buffer)=>{
        payload += decoder.write(buffer);
    });
    req.on("end",()=>{
        payload += decoder.end();  
        payload = parse(payload);            
        //choose handler
        let myHandler = getHanlder(trimmedPath);
        //construt data
        const data = getConstructDataObject(trimmedPath,queryStringObject,method,headers,payload);
        // send response
        myHandler(data,function(statusCode,result){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200; 
            result = typeof(result) == 'object'? result : {};
            const stringify_result = JSON.stringify(result);
            res.setHeader('Content-Type','appication/json');
            res.writeHead(statusCode);
            res.end(stringify_result); 
            console.log(`\n some log info...`,stringify_result);        
        });
        //log 
    });
   
    //log requested resource
    console.log(`\nRequested Resource : ${trimmedPath} with method : ${method}`);
   
});

//start the server 
server.listen(3000,()=>{
    console.log('The server is listeninig on port 3000');
});

//
function getHanlder(trimmedPath){
    return typeof(router.handler[trimmedPath]) !== 'undefined' ? router.handler[trimmedPath] : router.handler.notFound; 
}

function getConstructDataObject(trimmedPath,queryStringObject,method,headers,payload){
    return {
        'trimmedPath':trimmedPath,
        'queryStringObject':queryStringObject,
        'method':method,
        'headers':headers,
        'payload':payload
    }
}

function mock_CreateFile(){
    const fileName = `temp-config-${Date.now()}.json`;
    const dirName = "config";
    const data = {Id:1,Name:"Pankaj M Unhale"}
    //dirName,fileName,data,callback
    _fileService.create(dirName,fileName,data,function(result){
        console.log(result);
    })
}
function mock_deleteFile(){

}

