const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // cek valid
  
      return token;
    }
    else{
      window.location.href = 'login.html';
    }

    return;
};
 
const getProfile = (token) => {
  // get profile dari backend menggunakan token
  // console.log(token)
  let tokens = token.split(".");
  const user = JSON.parse(atob(tokens[1]));
  document.getElementById('username').innerText = user['username'];
  // console.log(user['username'])
  return
};
 
document.addEventListener('DOMContentLoaded', () => {
  const token = checkToken();
  if (!token) {
    window.location.href = 'login.html';
  } else {
    getProfile(token);
  }
});

document.addEventListener('DOMContentLoaded', () =>{
  // console.log(checkToken('token'))
  fetch('http://127.0.0.1:5000/todos/', {
  method: 'GET',
  credentials: 'same-origin',
  headers : {
    'x-access-token' : checkToken('token')
  }})
  .then(response =>{
   return response.json()
  }
  )
  .then(json => {
    // console.log(json)
    const completedTask = []
    const onprogTask = []
    // console.log(completedTask.length)
		for(let i = 0; i < json.length; i++){
      if (json[i]["is_completed"] == true){
        completedTask.push(true)
      }
      else if(json[i]["is_completed"] == false){
        onprogTask.push(false)
      }
      const st = "06.06.2022";
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const dt = new Date(st.replace(pattern,'$3-$2-$1'));
      if (json[i]['is_completed'] == true){
        document.querySelector('#cardComplete').innerHTML += `
        <div class="card newCard" id="newCard" draggable="true" ondragstart="onDragStart(event)">
          <span class="card__status--progress--show status__index--`+i+`" id="status">On progress</span>
            <div class="card__header">
              <h3 class="card__title card__index__title--`+i+`" id="title" maxlength="20">${json[i]['name']}</h3>
            </div>
            <div class="card__body">
                <p class="card__text card__index__date--`+i+`" style="color: rgb(142, 142, 142); font-size:10px;">
                <span class="material-symbols-outlined" style="font-size: 10px; color:rgb(142, 142, 142);">flag</span>
                ${dt.toDateString()}
                </p>
                <p class="card__text card__index__desc--`+i+`" id="desc" maxlength="120">${json[i]['description']}</p>
            </div>
            <div class="card__footer">
              <div class="footer__item clearTags__index--`+i+`" id="clearTags">
                  ${json[i]['tags']}
              </div>
            </div>
            <div class="card__dropdown">
                <div class="card__dropdown__toggler">
                    <span class="material-icons-outlined" id="clear"> more_horiz</span>
                </div>
                <div class="card__dropdown__menu" id="${json[i]['id']}">
                    <div class="card__dropdown__form">
                      <div class="card__dropdown__form__group">
                          <a href="#" for="completeButtonCard" class="completeButtonCard--`+i+`" onclick="completeItem(${json[i]['id']}, `+i+`)">Complete</a>
                          <a href="#" for="editButtonCard" class="editButtonCard--`+i+`" onclick='openEditItem(${json[i]['id']}, "${json[i].name}", "${json[i].tags}", "${json[i].description}")'>Edit</a>
                          <a href="#" for="deleteButtonCard" class="deleteButtonCard" onclick="deleteItem(${json[i]['id']})">Delete</a>
                      </div>
                    </div>
                </div>
            </div>
        </div>`
      }
      else if(json[i]['is_completed'] == false){
        document.querySelector('#cardOnprog').innerHTML += `
          <div class="card newCard" id="newCard" draggable="true" ondragstart="onDragStart(event)">
            <span class="card__status--progress--show status__index--`+i+`" id="status">On progress</span>
              <div class="card__header">
                <h3 class="card__title card__index__title--`+i+`" id="title" maxlength="20">${json[i]['name']}</h3>
              </div>
              <div class="card__body">
                  <p class="card__text card__index__date--`+i+`" style="color: rgb(142, 142, 142); font-size:10px;">
                  <span class="material-symbols-outlined" style="font-size: 10px; color:rgb(142, 142, 142);">flag</span>
                  ${dt.toDateString()}
                  </p>
                  <p class="card__text card__index__desc--`+i+`" id="desc" maxlength="120">${json[i]['description']}</p>
              </div>
              <div class="card__footer">
                <div class="footer__item clearTags__index--`+i+`" id="clearTags">
                    ${json[i]['tags']}
                </div>
              </div>
              <div class="card__dropdown">
                  <div class="card__dropdown__toggler">
                      <span class="material-icons-outlined" id="clear"> more_horiz</span>
                  </div>
                  <div class="card__dropdown__menu" id="${json[i]['id']}">
                      <div class="card__dropdown__form">
                        <div class="card__dropdown__form__group">
                            <a href="#" for="completeButtonCard" class="completeButtonCard--`+i+`" onclick="completeItem(${json[i]['id']}, `+i+`)">Complete</a>
                            <a href="#" for="editButtonCard" class="editButtonCard--`+i+`" onclick='openEditItem(${json[i]['id']}, "${json[i].name}", "${json[i].tags}", "${json[i].description}")'>Edit</a>
                            <a href="#" for="deleteButtonCard" class="deleteButtonCard" onclick="deleteItem(${json[i]['id']})">Delete</a>
                        </div>
                      </div>
                  </div>
              </div>
          </div>`
      }

      if(json[i]['is_completed'] == true){
        document.querySelector(".card__index__title--"+i).classList.toggle("checked")
        document.querySelector(".card__index__date--"+i).classList.toggle("checked");
        document.querySelector(".card__index__desc--"+i).classList.toggle("checked");
        document.querySelector(".status__index--"+i).classList.remove("card__status--progress--show");
        document.querySelector(".status__index--"+i).textContent ="Completed";
        document.querySelector(".status__index--"+i).classList.toggle("card__status--completed--show");
        document.querySelector(".clearTags__index--"+i ).classList.toggle("checked");
        document.querySelector(".completeButtonCard--"+i).textContent ="Uncompleted";
        document.querySelector(".editButtonCard--"+i ).style.display = "none"
      }

      function dropdownMenuHandler(dropdownMenu) {
        if (dropdownMenu.classList.contains("card__dropdown__menu")) {
          if (dropdownMenu.classList.contains("card__dropdown__menu--show")) {
            dropdownMenu.classList.remove("card__dropdown__menu--show");
          } else {
            dropdownMenu.classList.add("card__dropdown__menu--show");
          }
        }
      };
        
      const cardDropdownToggler = document.querySelectorAll(
        ".card__dropdown__toggler"
      );
      cardDropdownToggler.forEach(function (item) {
        item.onclick = function () {
          const dropdownMenu = item.nextElementSibling;
          dropdownMenuHandler(dropdownMenu);
        };
      });
        
      const cardDropdownMenu = document.querySelectorAll(".card__dropdown__menu");
      cardDropdownMenu.forEach(function (item) {
        item.onclick = function (e) {
          if (e.srcElement.checked) {
            dropdownMenuHandler(e.currentTarget);
          }
        };
      });
		};
    // console.log(completedTask)
    // console.log(onprogTask)
    document.querySelector(".completed__taks").textContent += ` (`+completedTask.length+`)`
    document.querySelector(".onprogress__taks").textContent += ` (`+onprogTask.length+`)`

  })
  .catch((error) => {
    alert('Error:'+ error);
  });
})

function addItem(action, id, title, tags, desc) {
  if(action == 'create'){
    const inputTitle = document.getElementById('titleTodo').value
    const inputDesc = document.getElementById('descTodo').value
    const inputTags = document.getElementById('tagsTodo').value
    const addTodo = { 
      name: inputTitle, 
      tags: inputTags,
      description :inputDesc,
      is_completed:false,
      public_id:  uuidv4()
    };
    
    fetch('http://127.0.0.1:5000/todos/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token' : checkToken('token')
        },
        body: JSON.stringify(addTodo)
    })
    .then(response => response.json())
    .then(data => {
      alert('Successfully create todo', data);
      window.location.reload()
    })
    .catch((error) => {
      alert('Error:', error);
    });
  }
  else if(action == 'update'){
    const updateTodo = { 
      name: title, 
      tags: tags,
      description : desc
    };
    // console.log(updateTodo)
    fetch('http://127.0.0.1:5000/todos/data/'+id+'/', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodo)
    })
    .then(response => response.json())
    .then(data => {
      alert('Successfully update todo', data);
      window.location.reload()
    })
    .catch((error) => {
      alert('Error:', error);
    });
  }
}

function completeItem(id, index) { 
  const indexText = document.querySelector(".status__index--"+index).textContent
  let statusTodo = ""
  // console.log(indexText)
  if (indexText == "Completed"){
    statusTodo = JSON.stringify({
      'is completed': false
    })
  }
  else if (indexText == "On progress"){
    statusTodo = JSON.stringify({
      'is completed': true
    })
  }
  fetch('http://127.0.0.1:5000/todos/'+id+'/', {
    method: 'PUT',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: statusTodo
  })
  .then(response => response.json())
  .then(data => { 
    alert('Successfuly complete todo');
    window.location.reload(data)
    // update(data)
  })
  .catch(error => {
    alert('Error:'+ error.response);
  });
}

function deleteItem(id) {
  fetch('http://127.0.0.1:5000/todos/'+id+'/', {
    method: 'DELETE',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(response => {
    alert('Successfuly deleted todo', response)
    window.location.reload()
  })
}

function logout(){
  window.localStorage.removeItem('token');
  alert("Success Logout")
  window.location.reload()
}

function openModal() {
  const mdl = document.getElementById("open-modal");
  mdl.style.display="block";
};

function closeModal() {
  const mdl = document.getElementById("open-modal");
  mdl.style.display="none"
};

function onDragStart(event) {
	event
		.dataTransfer
		.setData('text/plain', event.target.id);
}
function onDragOver(event) {
	event.preventDefault();
}
function onDrop(event) {
	const id = event
      .dataTransfer
      .getData('text');
	const draggableElement = document.getElementById(id);
	const dropzone = event.target;
	// document.querySelector("#title").classList.toggle("checked");
	// document.querySelector("#desc").classList.toggle("checked");
	// document.querySelector("#status").classList.remove("card__status--progress--show");
	// document.querySelector("#status").classList.toggle("card__status--completed--show");
	// document.querySelector("#clearTags").classList.toggle("checked")
	dropzone.appendChild(draggableElement);


	event
    .dataTransfer
    .clearData();
}