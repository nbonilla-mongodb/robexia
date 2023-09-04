 function callRobexia(){
		const API_KEY = "7g9bunOiTP0nd4lrZPqdt9QEQLVTLi91qMalb6kdvhfarrmkbGIyy3ox0MHYjcYv";  // Reemplaza con tu API key

		fetch('https://eu-central-1.aws.data.mongodb-api.com/app/robexiaapi-vjexe/endpoint/candlelast', {
			  method: 'GET', 
			  headers: {
					'Content-Type': 'application/json',
					'access_token': `Bearer ${API_KEY}`,
                    
				}
                //,mode: 'cors',  // Asegúrate de que el modo sea 'cors'
			})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(error => console.error('Error:', error));

}