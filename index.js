function handleFormSubmit(event){
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;


    const obj = {
        username: username,
        email: email,
        password:password
    }


    axios.post("http://localhost:7300/g", obj)
        .then((response) => {
            console.log('posted data')

           // showUserOnScreen(response.data.newuser)


            console.log(response.data)

        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Oops! something went wrong</h4>"
            console.log(err)
        })

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';


}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:7300/s")
        console.log('got our data')

        console.log(response)

       
    }
    catch (err) {
        console.log(err)
    }
})
