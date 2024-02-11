function handleFormSubmit(event) {
    event.preventDefault();
    const exp = event.target.exp.value;
    const des = event.target.des.value;
    const select = event.target.select.value;

   

    const obj = {
        exp: exp,
        des: des,
        select:select
    }

    //post detail on crud
    
      axios.post("http://localhost:3600/expense/add-expense", obj)
     .then((response)=>{
     console.log('posted data')
           // const data = await response.data.newuser;
            showUserOnScreen(response.data.newuser)
           // console.log()
            
            console.log(response)
          
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
window.addEventListener("DOMContentLoaded", async() => {
    try{
   const response= await axios.get("http://localhost:3600/expense/get-expense")
   console.log('got our data')
        
            console.log(response)

            for (var i = 0; i < response.data.alluser.length; i++) {
                showUserOnScreen(response.data.alluser[i])
            }
        }
        catch(err)  {
            console.log(err)
        }
})

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
    
    try{
  const res=await axios.delete(`http://localhost:3600/expense/delete-expense/${id}`)
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