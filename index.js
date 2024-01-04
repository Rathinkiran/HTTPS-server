const express=require("express");

const app=express();

var users =[{
    name:"john",
    kidneys:[{
        healthy:false
},]
}];

app.use(express.json());

app.get("/", function(req,res){
    const johnkidneys=users[0].kidneys;
    console.log(johnkidneys);
    const numberofkidneys=johnkidneys.length;
    let numberofhealthykidneys=0;
    for(i=0;i<johnkidneys.length;i++)
    {
        if(johnkidneys[i].healthy){
            numberofhealthykidneys=numberofhealthykidneys+1;
        }
    }
    let numberofunhealthykidneys=numberofkidneys-numberofhealthykidneys;
    res.json({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    })
})

app.post("/", function(req,res){
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy:ishealthy 
    })
    res.json({
        msg:"Done!"
    })
})

app.put("/",function(req,res){
    for (let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy=true;
    }
    res.json({});
})

app.delete("/",function(req,res){
    if(isthereatleastoneunhealthykidneys()){
    const newkidneys=[];
    for (let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newkidneys.push({
                healthy:true
            })
        }
    }
    users[0].kidneys=newkidneys;
    res.json({
        msg:"Done!"});

    }else{
        res.status(411).json({
            msg:"you have no bad kidneys"
        });
    }
})

function isthereatleastoneunhealthykidneys(){
    let atleastonehealthykidney=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            atleastonehealthykidney=true;
        }
    }
    return atleastonehealthykidney
}

app.listen(3005);