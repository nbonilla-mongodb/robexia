exports = async function(){

  const context_data = context.functions.execute("api_key_getInfoApp");
  const headers_data = {
  
	  "Authorization": [bearer_token]	
	}
  console.log("context data in return ",JSON.stringify(context_data));
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#tag/apikeys/operation/adminListApiKeys
  let endpoint = "https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/api_keys";
  endpoint = endpoint.replace("{groupId}",context_data.GROUP_ID);
  endpoint = endpoint.replace("{appId}",context_data.APP_ID);
  response = await context.http.put(
    {
      url: endpoint,
      headers: headers_data,
      encodeBodyAsJSON: true
    }
  );
  
  result = JSON.parse(response.body.text());

  console.log(JSON.stringify(result));

  //ENABLE API KEY 
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#tag/apikeys/operation/adminEnableApiKey
  
  const disabled_api_keys = result.find(x=>x.disabled===true);


  for (let i = 0; i < disabled_api_keys.length; i++) {
    await EnableApiKey(context.GROUP_ID,context.APP_ID,disabled_api_keys[i]._id);
    //text += cars[i] + "<br>";
  }

}

async function EnableApiKey(GROUP_ID,APP_ID,apiKeyId){
  endpoint = "https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/api_keys/{apiKeyId}/enable";
  endpoint = endpoint.replace("{groupId}",GROUP_ID);
  endpoint = endpoint.replace("{appId}",APP_ID);
  endpoint = endpoint.replace("{apiKeyId}",apiKeyId);
  
  response = await context.http.put(
    {
      url: endpoint,
      headers: headers_data,
      encodeBodyAsJSON: true
    }
  );
  
  result = JSON.parse(response.body.text());
  console.log(JSON.stringify(result));
} 