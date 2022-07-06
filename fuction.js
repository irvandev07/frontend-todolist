window.onload = function () {
  const todoForm = document.querySelector(".todo-form");
  todoForm.onsubmit = function (e) {
    e.preventDefault();
  };

  const clearButton = document.getElementsByClassName("clear"); 
  for(let i = 0; i < clearButton.length; i++){
    clearButton[i].onclick = function() {
      clearButton[i].style.visibility = "hidden";
      clearButton[i].style.display = "none"; 
    }
  };
  document.querySelector('#add--todo').onclick = function(){
    if((document.querySelector('#titleTodo').value.length == 0) || (document.querySelector('#descTodo').value.length == 0)){
        alert("Please Enter a Task")
    }
    else{
      // const TodaysDate = new Date().getDate();
      // const task = []
      const st = "06.06.2022";
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const dt = new Date(st.replace(pattern,'$3-$2-$1'));
      document.querySelector('#card').innerHTML += `
      <div class="card newCard" id="newCard">
        <span class="card__status--progress--show" id="progress">On progress</span>
        <div class="card__header">
          <h3 class="card__title" contentEditable="true" id="title" maxlength="20">${document.querySelector('#titleTodo').value}</h3>
        </div>
        <div class="card__body">
            <p class="card__text" style="color: #ccc; font-size:10px;">${dt.toDateString()}</p>
            <p class="card__text desc" contentEditable="true" id="desc" maxlength="120">${document.querySelector('#descTodo').value}</p>
        </div>
        <div class="card__footer">
          <div class="footer__item clearTags" id="clearTags">
              <span class="material-icons-outlined"> clear </span>
              blue
          </div>
        </div>
        <div class="card__dropdown">
            <div class="card__dropdown__toggler">
                <span class="material-icons-outlined"> more_horiz</span>
            </div>
            <div class="card__dropdown__menu">
                <div class="card__dropdown__form">
                  <div class="card__dropdown__form__group">
                      <a href="#" for="completeButtonCard" class="completeButtonCard" onclick="completed(git)">Complete</a>
                      <a href="#" for="deleteButtonCard" class="deleteButtonCard" onclick="deleted()">Delete</a>
                  </div>
                </div>
            </div>
        </div>
      </div>`;
      // const todoList = document.querySelectorAll(".newCard");
      // todoList.forEach(e => {
      //   let txtTitle = e.querySelector(".card__title");
      //   let txtDate = e.querySelector(".card__text");
      //   let txtDesc = e.querySelector(".desc");
      //   let spanProg = e.querySelector("#progress");
      //   let tags = e.querySelector("#clearTags");
      //   let btnDone = e.querySelector(".completeButtonCard");
      //   btnDone.addEventListener("click", () => {
      //     done();
      //   });
        
      //   function done() {
      //     for(let i=0; i<todoList.length; i++){
      //       todoList[i].onclick = function() {
      //         txtTitle.classList.toggle("checked");
      //         txtDate.classList.toggle("checked");
      //         txtDesc.classList.toggle("checked");
      //         tags.classList.toggle("checked");
      //         spanProg.classList.remove("card__status--progress--show");
      //         spanProg.textContent ="Completed";
      //         spanProg.classList.toggle("card__status--completed--show");
      //       }
      //     };
      //   }
      // });
      // const deleteCard = document.querySelector("div.newCard");
      // deleteCard.addEventListener("click", (e) => {
      //   if (e.target.classList.contains("deleteButtonCard")) {
      //     e.target.classList.style.display = "none"
      //   }
      // });
  
      // const current_tasks = document.querySelector(".newCard");
      // for(let i=0; i<current_tasks.length; i++){
      //   current_tasks[i].onclick = function() {
      //     if (current_tasks.classList.contains("completeButtonCard")) {
      //         document.querySelector(".card__title").classList.toggle("checked")
      //     }
      //   }
      // };
      
      const clearTags = document.getElementsByClassName("clearTags"); 
      for(let i = 0; i < clearTags.length; i++){
        clearTags[i].onclick = function() {
          clearTags[i].style.visibility = "hidden";
          clearTags[i].style.display = "none"; 
        }
      };
  
      function dropdownMenuHandler(dropdownMenu) {
        if (dropdownMenu.classList.contains("card__dropdown__menu")) {
          if (dropdownMenu.classList.contains("card__dropdown__menu--show")) {
            dropdownMenu.classList.remove("card__dropdown__menu--show");
          } else {
            dropdownMenu.classList.add("card__dropdown__menu--show");
          }
        }
      };
    
      // card-dropdown
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
    }
  }
  
};
function completed(){
  document.querySelector(".card__title").classList.toggle("checked");
  document.querySelector(".card__text").classList.toggle("checked");
  document.querySelector(".desc").classList.toggle("checked");
  document.querySelector("#progress").classList.remove("card__status--progress--show");
  document.querySelector("#progress").textContent ="Completed";
  document.querySelector("#progress").classList.toggle("card__status--completed--show");
  document.querySelector("#clearTags").classList.toggle("checked");
}

function deleted(){
  document.getElementById("newCard").remove()
}
