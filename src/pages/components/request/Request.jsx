// function options(body,method){
//     return{
    
//         method,
//         headers:{
//             "Content-type": "application/json",
//         },
//         ...(body && {body: JSON.stringify(body)}),
       
//     }
// }
// function http(url,body,method){
//     return new promise((resolve, reject) =>{
//         fetch(url ,options(body, method)).then(r =>r.json()).then(resolve).catch(reject)
//     })
// }
// const request={
//     get:(url)=>http(url,null,'GET'),
//     post:(url,body)=> http(url,body,'POST')
// }