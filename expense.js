//const Razorpay = require("razorpay");

function handleFormSubmit(event) {
    event.preventDefault();
    const exp = event.target.exp.value;
    const des = event.target.des.value;
    const select = event.target.select.value;



    const obj = {
        exp: exp,
        des: des,
        select: select,
        //  userId:1


    }

    //post detail on crud
    const token = localStorage.getItem('token')
    console.log('token>', token)

    axios.post("http://localhost:5566/expense/add-expense", obj, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
        }
    })
        .then((response) => {
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

    const selectElement = document.getElementById('select');
    selectElement.selectedIndex = 0;

}
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
//retrieve from crud
window.onload = async () => {
    const token = localStorage.getItem('token')
    const decodetoken = parseJwt(token)
    const ispremiumuser = decodetoken.ispremiumuser;
    if (ispremiumuser) {
        const messageElement = document.createElement('div');
        //  const button =document.createElement('button')
        //  button.innerText='leaderboard button'
        messageElement.setAttribute('id', 'message')
        messageElement.innerText = 'YOU ARE A PREMIUM MEMBER.';
        messageElement.style.color = 'white';
        messageElement.style.fontWeight = 'bold';
        // messageElement.appendChild(button)

        const parentElement = document.getElementById('rzp-button').parentNode;


        parentElement.replaceChild(messageElement, document.getElementById('rzp-button'));
      //  showLeaderboard();
    }
    console.log(decodetoken, 'jwt token>>>>>>>>>>>>>>>')
    console.log('token>>>', token)

    const headers = {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
    }

    try {
        const response = await axios.get("http://localhost:5566/expense/get-expense", {
            headers: headers
        })
        console.log('got our data')
        console.log('headers>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', headers)


        console.log(response.data)

        for (var i = 0; i < response.data.alluser.length; i++) {
            showUserOnScreen(response.data.alluser[i])
        }
    }

    catch (err) {
        console.log(err)
    }

}

//print detail on screen
function showUserOnScreen(obj) {
    const tableBody = document.getElementById('listofitems');
    const currentDate = new Date().toLocaleDateString();
    //<td>${currentDate}</td>
    // Create HTML for a new row
    const newRowHTML = `
        <tr id="${obj.id}">
            <td>${currentDate}</td>
            <td>${obj.exp}</td>
            <td>${obj.des}</td>
            <td>${obj.select}</td>
            <td><button style="color:red" onclick="DeleteUser('${obj.id}')">Delete expense</button></td>
            <td><button style="color:green" onclick="editUserDetails('${obj.id}','${obj.exp}','${obj.des}','${obj.select}')">Edit expense</button></td>
        </tr>
    `;

    // Append the new row HTML to the table body
    tableBody.innerHTML += newRowHTML;
}

//edit users detail
function editUserDetails(id, exp, des, select) {

    document.getElementById('exp').value = exp;
    document.getElementById('des').value = des;
    document.getElementById('select').value = select;

    DeleteUser(id)

}

//delete from crud
async function DeleteUser(id) {

    console.log(typeof id)
    console.log(id)
    const token = localStorage.getItem('token')

    try {
        const res = await axios.delete(`http://localhost:5566/expense/delete-expense/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`,
            }
        })
        console.log('deleted successfully')

        removeUserFromScreen(id)
    }
    catch (err) {
        console.log(err)
        console.log('cant delete')
    }
}

//delete from screen
function removeUserFromScreen(id) {
    console.log(typeof id)
    const parentNode = document.getElementById('listofitems')
    const ChildNodeToBeRemoved = document.getElementById(id)

    if (ChildNodeToBeRemoved) {
        parentNode.removeChild(ChildNodeToBeRemoved)

    }

}


document.getElementById('rzp-button').onclick = async function (e) {
    const token = localStorage.getItem('token');
    console.log(token, 'token from razorpay>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    const response = await axios.get('http://localhost:5566/premiummember', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwODA2OTUwNX0.5DBBLTUeW-H5KuV0oABdokMPVQmzKecdZ1rqiqgh4Os',
        }
    })


    console.log(response);
    var options =
    {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            const res = await axios.post('http://localhost:5566/updatetransactionstatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            if (res.status === 202) {
                alert('YOU ARE A PREMIUM MEMBER.');
                const messageElement = document.createElement('div');
                // const button =document.createElement('button')
                //  button.innerText='leaderboard button'
                messageElement.setAttribute('id', 'message')
                messageElement.innerText = 'YOU ARE A PREMIUM MEMBER.';
                messageElement.style.color = 'white';
                messageElement.style.fontWeight = 'bold';
                // messageElement.appendChild(button);

                const parentElement = document.getElementById('rzp-button').parentNode;


                parentElement.replaceChild(messageElement, document.getElementById('rzp-button'));
                localStorage.setItem('token', res.data.token)
                console.log(res.data.token, 'res recived from backend<<<<<')
                showLeaderboard();

                return;
            }
            else {
                alert('SOMETHING WENT WRONG');

            }

        }
    }

    // alert('YOU ARE A PREMIUM USER NOW')

    const rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();


}
//document.addEventListener('DOMContentLoaded', async () => {
//async function showleaderboard() {
/* const inputelement = document.createElement('button')
 
inputelement.appendChild(link)
inputelement.innerText = 'leaderboard button'
 inputelement.status = 'show leaderboard';

 
 //const div = document.createElement('ul')
// div.setAttribute('id', 'leaderboard')
 // inputelement.appendChild('div')
 inputelement.onclick = async () => {
     const token = localStorage.getItem('token');
     const userleaderboardarray = await axios.get('http://localhost:5566/premium/showleaderboard ', {
         headers: {
             'Content-Type': 'application/json',
             "Authorization": `Bearer ${token}`
         }
     })
     //window.location.href='leaderboard.html'
   //  console.log(userleaderboardarray, '>>>>>>>>>>>>>>userleaderboard')
   //  const leaderboardelm = document.getElementById('leaderboard');
   //  leaderboardelm.innerHTML = `<h1>LEADER BOARD</h1>`;
    // userleaderboardarray.data.forEach((user) => {
      //   const li = document.createElement('li');
       //  li.innerHTML = `NAME::--${user.Name}-------EXPENSE AMOUNT::--${user.Amount}`;
       //  leaderboardelm.appendChild(li);
   //  });*/

   
 // document.addEventListener('DOMContentLoaded', () => {
async function showLeaderboard() {
   
    const token = localStorage.getItem('token');
    const userleaderboardarray = await axios.get('http://localhost:5566/premium/showleaderboard', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const leaderboardModal = document.getElementById('leaderboard-modal');
    const leaderboardList = document.getElementById('leaderboard-list');

    leaderboardList.innerHTML = '';
    let count = 1;
    userleaderboardarray.data.forEach((user) => {
        const li = document.createElement('li');
        li.innerHTML =`<${count}>--|||-NAME::)>${user.username}____EXPENSE AMOUNT::)>${user.totalExpenses}|||<br><br>`;
        leaderboardList.appendChild(li);
        count++;
    });

    leaderboardModal.style.display = 'block';
    leaderboardModal.style.color = 'black';
    leaderboardModal.style.borderColor = 'purple';
    leaderboardModal.style.width = '600px'; 
    leaderboardModal.style.height = '900px'; 
    leaderboardModal.style.position = 'fixed';
    leaderboardModal.style.transform = 'translate(-60%, 20%)';
    leaderboardModal.style.overflow = 'auto';
    
    leaderboardModal.style.top = '0';
    //leaderboardModal.style.right = '-300px';

    const closeButton = document.getElementsByClassName('close')[0];
    closeButton.onclick = () => {
        leaderboardModal.style.display = 'none';
        

    };

    window.onclick = (event) => {
        if (event.target === leaderboardModal) {
            leaderboardModal.style.display = 'none';
        }
    };
   // leaderboardModal.style.transition = 'none';
}


const inputelement = document.createElement('button');
inputelement.innerText = 'leaderboard';
inputelement.status = 'show leaderboard';
inputelement.onclick = showLeaderboard;

inputelement.style.position = 'fixed';
inputelement.style.top = '0';
inputelement.style.right = '0';


document.body.appendChild(inputelement)

  