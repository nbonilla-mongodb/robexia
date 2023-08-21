exports = async function(apiKeyId){

  console.log("Invoking getInfoApp");
  const context_data = context.functions.execute("api_key_getInfoApp");
  console.log("End of getInfoApp");
  
  const bearer_token = context_data.bearer_token;
 

  //DISABLE API KEY 
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#tag/apikeys/operation/adminDisableApiKey

  let endpoint = "https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps/{appId}/api_keys/{apiKeyId}/disable";
  endpoint = endpoint.replace("{groupId}",context_data.GROUP_ID);
  endpoint = endpoint.replace("{appId}",context_data.APP_ID);
  endpoint = endpoint.replace("{apiKeyId}",apiKeyId);
  
  response = await context.http.put(
    {
      url: endpoint,
      headers: {
        Authorization: [bearer_token]
      },
      encodeBodyAsJSON: true
    }
  );
  
  result = JSON.parse(response.body.text());
  console.log(JSON.stringify(result));

}