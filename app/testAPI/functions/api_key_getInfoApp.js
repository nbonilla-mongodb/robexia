exports = async function(){

  //--------Get Access Token
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#section/Get-Authentication-Tokens
  let endpoint = 'https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login';
  const username_projectApiKey = context.values.get("value_username_projectApiKey");
  const apiKey_project = context.values.get("value_apiKey_project");
  const body_data = {
    "username": username_projectApiKey,
    "apiKey":  apiKey_project
  };

  console.log(JSON.stringify(body_data));
  
  let response = await context.http.post(
    {
      url: endpoint,
      body: body_data,
      encodeBodyAsJSON: true
    }
  );
  
  let result = JSON.parse(response.body.text());  
  const ACCESS_TOKEN = result.access_token;
  const bearer_token = 'Bearer '.concat(ACCESS_TOKEN);

  //console.log(bearer_token);

  //-------Get AppID
  //https://www.mongodb.com/docs/atlas/app-services/admin/api/v3/#tag/apps/operation/adminListApplications
  const PROJECT_ID = context.app.projectId;
  const APP_NAME = context.app.clientAppId;
 


  endpoint = "https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps";
  endpoint = endpoint.replace("{groupId}",PROJECT_ID);

  response = await context.http.get(
    {
      url: endpoint,
      headers: {
        Authorization: [bearer_token]
      },
      body: body_data,
      encodeBodyAsJSON: true
    }
  );
  

  result = JSON.parse(response.body.text());  
  //console.log(JSON.stringify(result));

  const app_result = result.find(x=>x.client_app_id===APP_NAME);
  const APP_ID = app_result._id;
  const GROUP_ID = app_result.group_id;

  const return_data = {
    "APP_ID":APP_ID,
    "GROUP_ID":GROUP_ID,
    "bearer_token":bearer_token
  }
  console.log(JSON.stringify(return_data));
  return return_data;

}