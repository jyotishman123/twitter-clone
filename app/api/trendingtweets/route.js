import axios from 'axios';

export const GET = async (request)=>{
     

const options = {
  method: 'GET',
  url: 'https://twitter154.p.rapidapi.com/lists/tweets',
  params: {
    list_id: '1591033111726391297',
    limit: '40'
  },
  headers: {
    'X-RapidAPI-Key': '051f936670msh5a067f1a4690e6cp19e46fjsn8afc38966b87',
    'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
  }
};


  

try {

 
	const response = await axios.request(options);
  console.log(response)
  const limitData = await response?.data?.results.slice(0,20) || [];

  return new Response(JSON.stringify({tweetData:limitData}))
 
     
} catch (error) {
	console.error(error);
}
}