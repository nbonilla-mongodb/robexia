const axios = require('axios');

function callRobexia() {
  const API_KEY = "7g9bunOiTP0nd4lrZPqdt9QEQLVTLi91qMalb6kdvhfarrmkbGIyy3ox0MHYjcYv"; // Replace with your API key

  // Define the request headers
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  // Make a GET request to the API endpoint
  axios.get('https://eu-central-1.aws.data.mongodb-api.com/app/robexiaapi-vjexe/endpoint/candlelast', { headers })
    .then((response) => {
      // Handle the successful response here
      const data = response.data;
      console.log(data);
    })
    .catch((error) => {
      // Handle errors here
      console.error('Error:', error);
    });
}

// Call the function to make the API request
callRobexia();
