function getTodo(){
  fetch('http://127.0.0.1:5000/todos/', {
  method: 'GET',
  credentials: 'include',
  })
  .then(response =>{
   return response.json()
  }
  )
  .then(json => {
    const getJson = json
		for(let i = 0; i < getJson.length; i++){
      const st = "06.06.2022";
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const dt = new Date(st.replace(pattern,'$3-$2-$1'));
      document.querySelector('#card').innerHTML += `
        <div class="card newCard" id="newCard">
          <span class="card__status--progress--show status" id="status">On progress</span>
            <div class="card__header">
              <h3 class="card__title" contentEditable="true" id="title" maxlength="20">${getJson[i]['name']}</h3>
            </div>
            <div class="card__body">
                <p class="card__text" style="color: #ccc; font-size:10px;">${dt.toDateString()}</p>
                <p class="card__text desc" contentEditable="true" id="desc" maxlength="120">${getJson[i]['description']}</p>
            </div>
            <div class="card__footer">
              <div class="footer__item clearTags" id="clearTags">
                  <span class="material-icons-outlined"> clear </span>
                  Tags
              </div>
            </div>
            <div class="card__dropdown">
                <div class="card__dropdown__toggler">
                    <span class="material-icons-outlined"> more_horiz</span>
                </div>
                <div class="card__dropdown__menu">
                    <div class="card__dropdown__form">
                      <div class="card__dropdown__form__group">
                          <a href="#" for="completeButtonCard" class="completeButtonCard">Complete</a>
                          <a href="#" for="deleteButtonCard" class="deleteButtonCard" onclick="deleteItem(${getJson[i]['id']})">Delete</a>
                      </div>
                    </div>
                </div>
            </div>
          </div>`

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
  })
  .catch((error) => {
    alert('Error:', error);
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
  .then(response => alert(response))
}

function addTodo() {
  const title = document.getElementById('titleTodo').value
  const desc = document.getElementById('descTodo').value
  const addTodo = { 
    name: title, 
    description :desc, 
    is_completed:false, 
    public_id:  uuidv4()
  };
  
  fetch('http://127.0.0.1:5000/todos/', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addTodo)
  })
  .then(response => response.json())
  .then(data => {
    alert('Successfully create todo', data);
  })
  .catch((error) => {
    alert('Error:', error);
  });
}

window.onload = function () {
	const todoForm = document.querySelector(".todo-form");
	todoForm.onsubmit = function (e) {
		e.preventDefault();
	};

  getTodo()

	document.querySelector('#add--todo').onclick = function(){
		if((document.querySelector('#titleTodo').value.length == 0) || (document.querySelector('#descTodo').value.length == 0)){
				alert("Please Enter a Task")
		}
		else{
      addTodo()
    }
	}
	
};





