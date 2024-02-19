async function handle(event){
    event.preventDefault();
    const email = event.target.email.value;
    
  
    const obj = {
  
      email: email,
     
    };
  
    try {
      const result = await axios.post("http://localhost:5566/password/forgotpassword", obj)
     
  
      console.log(result)
  
      console.log('posted data')
      
  
      // showUserOnScreen(response.data.newuser)
      console.log(result.data)
  
  
  
      document.getElementById('email').value = '';
      
      
  
      
  
  
    }
    catch (err) {
  
    
      console.log(err,'error from forgot-password')
     
  
  
  
    }
}