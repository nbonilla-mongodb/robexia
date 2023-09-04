exports = async function(authEvent) {
    
    //Extract API information from header    
    const apiKeyId = authEvent.user.identities.find(x=>x.provider_type==="api-key").id;
    //const apiKeyId = authEvent.user.identities[0].id;
    const nameApiKey=authEvent.user.data.name;

    //console.log(JSON.stringify(authEvent));
    
    //Compare API Key in collection api_calls current value against env variable THROTTLE_API
    const api_calls_collection = context.services.get("mongodb-atlas").db("atlive").collection("api_calls"); 
    const api_limit = context.environment.values.THROTTLE_API;
    //console.log(JSON.stringify(api_calls_collection));

    const query  = {"apiKeyId":apiKeyId,"name":nameApiKey};

    const options = {upsert:true};

    const update = {
      "$inc": { "calls": 1 }     
    };
    
    const result = await api_calls_collection.updateOne(query,update,options);
    //console.log(JSON.stringify(result));

    //extract current calls
    const stats_api = await api_calls_collection.find(query).toArray();
    const amount_calls = stats_api[0].calls;
    console.log("Amount of current calls ",amount_calls);
    
    //deshabilitar el API al MAX
    if(amount_calls>api_limit){
      
        await context.functions.execute("api_key_disable_function", apiKeyId );
    }

};
