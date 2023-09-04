

function robexiaCall(){
  const https = require('https');

  const API_KEY = "7g9bunOiTP0nd4lrZPqdt9QEQLVTLi91qMalb6kdvhfarrmkbGIyy3ox0MHYjcYv"; // Replace with your API key
  
  // Define the request headers
  const headers = {
    
    'apiKey': API_KEY
  };
  
  const options = {
    hostname: 'eu-central-1.aws.data.mongodb-api.com',
    path: '/app/robexiaapi-vjexe/endpoint/candlelast',
    method: 'GET',
    headers: headers,
  };
  
  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
  
    let data = '';
  
    res.on('data', chunk => {
      data += chunk;
    });
  
    res.on('end', () => {
      console.log(data);
    });
  });
  
  req.on('error', error => {
    console.error(error);
  });
  
  // Send the request
  req.end();

  return data;
}