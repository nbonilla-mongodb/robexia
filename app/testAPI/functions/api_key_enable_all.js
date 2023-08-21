exports = async function(){

  const context_data = await context.functions.execute("api_key_getInfoApp");
  const bearer_token = context_data.bearer_token;
  //console.log("context data in return ",JSON.stringify(context_data));
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#tag/apikeys/operation/adminListApiKeys
  let endpoint = "https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/api_keys";
  endpoint = endpoint.replace("{groupId}",context_data.GROUP_ID);
  endpoint = endpoint.replace("{appId}",context_data.APP_ID);
  let response = await context.http.get(
    {
      url: endpoint,
      headers: {
        Authorization: [bearer_token]
      },
      encodeBodyAsJSON: true
    }
  );
  console.log(response.body.text());
  let result = JSON.parse(response.body.text());
  

  console.log(JSON.stringify(result));

  //ENABLE API KEY 
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#tag/apikeys/operation/adminEnableApiKey
  
  let disabled_api_keys = result.filter(x=>x.disabled===true);
  
  
  console.log("Disabled keys", JSON.stringify(disabled_api_keys));
 

  for (let i = 0; i < disabled_api_keys.length; i++) {  
    
    const disabled_key = disabled_api_keys[i];
    
    console.log("Using EnableApiKey with ",disabled_key._id);
    let endpoint = "https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/api_keys/{apiKeyId}/enable";
    endpoint = endpoint.replace("{groupId}",context_data.GROUP_ID);
    endpoint = endpoint.replace("{appId}",context_data.APP_ID);
    endpoint = endpoint.replace("{apiKeyId}",disabled_key._id);
    
    const response = await context.http.put(
      {
        url: endpoint,
        headers: {
          Authorization: [bearer_token]
        },
        encodeBodyAsJSON: true
      }
    );
    if(response.status==204){
      console.log("API KEY Enabled")
    }
  }


  const api_calls_collection = context.services.get("mongodb-atlas").db("atlive").collection("api_calls"); 
  api_calls_collection.deleteMany({});
}
