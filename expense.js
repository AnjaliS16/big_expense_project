function handleFormSubmit(event) {
    event.preventDefault();
    const exp = event.target.exp.value;
    const des = event.target.des.value;
    const select = event.target.select.value;

   

    const obj = {
        exp: exp,
        des: des,
        select:select,
      //  userId:1
        
        
    }

    //post detail on crud
    const token=localStorage.getItem('token')
    console.log('token>',token)
    
      axios.post("http://localhost:4681/expense/add-expense", obj,{
        headers:{
     'Content-Type': 'application/json',
      "Authorization":`Bearer ${token}`,
    }})
     .then((response)=>{
     console.log('posted data')
     
  
     
        showUserOnScreen(response.data.newuser);
        console.log('Data posted successfully:', response.data);
       
       // console.log('Error from backend:', response.data.error);
      
    
          
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h4>Oops! something went wrong</h4>"
            console.log(err)
        })

    document.getElementById('exp').value = '';
    document.getElementById('des').value = '';
    document.getElementById('select').value = '';
   
  

}

//retrieve from crud
window.onload= async() => {
    const token=localStorage.getItem('token')
    console.log('token>>>',token)
   
     const headers={
        'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}`,
    }
    
    try{
   const response= await axios.get("http://localhost:4681/expense/get-expense",{
    headers:headers})
   console.log('got our data')
   console.log('headers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',headers)
    
        
            console.log(response.data)

            for (var i = 0; i < response.data.alluser.length; i++) {
                showUserOnScreen(response.data.alluser[i])
            }
        }
    
      catch(err)  {
            console.log(err)
        }
    
    }

//print detail on screen
function showUserOnScreen(obj) {

    const parentNode = document.getElementById('listofitems');

    const childnode = `<li id=${obj.id}> ${obj.exp} -${obj.des} -${obj.select}
                <button style="color:red"onclick="DeleteUser('${obj.id}')" >Delete expense</button>
                <button style="color:green"onclick="editUserDetails('${obj.id}','${obj.exp}','${obj.des}','${obj.select}')">Edit expense</button>
                
                </li> `
    parentNode.innerHTML = parentNode.innerHTML + childnode
}


//edit users detail
function editUserDetails(id, exp, des,select) {

    document.getElementById('exp').value = exp;
    document.getElementById('des').value = des;
    document.getElementById('select').value = select;
   
    DeleteUser(id)

}

//delete from crud
async function DeleteUser(id) {
    
    console.log( typeof id)
    console.log(id)
     const token=localStorage.getItem('token')
    
    try{
  const res=await axios.delete(`http://localhost:4681/expense/delete-expense/${id}`,{
    headers:{
        'Content-Type': 'application/json',
         "Authorization":`Bearer ${token}`,
       }
  })
  console.log('deleted successfully')
        
            removeUserFromScreen(id)
        }
    catch(err) {
            console.log(err)
            console.log('cant delete')
        }
}

//delete from screen
function removeUserFromScreen(id) {
    console.log( typeof id)
    const parentNode = document.getElementById('listofitems')
    const ChildNodeToBeRemoved = document.getElementById(id)
    
    if (ChildNodeToBeRemoved) {
    parentNode.removeChild(ChildNodeToBeRemoved)
    
    }
  
}