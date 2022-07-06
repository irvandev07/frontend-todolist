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

  // const removeCard = document.getElementsByClassName("card__remove-icon"); 
  // for(let i = 0; i < removeCard.length; i++){
  //   removeCard[i].onclick = function() {
  //     const remove = document.getElementById("card");
  //     remove.style.display = "none";
  //   }
  // }

  document.querySelector('#add--todo').onclick = function(){
    if((document.querySelector('#titleTodo').value.length == 0) || (document.querySelector('#descTodo').value.length == 0)){
        alert("Please Enter a Task")
    }
    else{
      // const TodaysDate = new Date().getDate();
      var st = "26.04.2013";
      var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      var dt = new Date(st.replace(pattern,'$3-$2-$1'));
      document.querySelector('#card').innerHTML += `
      <div class="card newCard" id="newCard">
        <div class="card__header">
          <h3 class="card__title">${document.querySelector('#titleTodo').value}</h3>
          <div class="card__remove-icon">
              <span class="material-icons-outlined"> clear </span>
          </div>
        </div>
        <div class="card__body">
            <p class="card__text" style="color: #ccc; font-size:10px;">${dt.toDateString()}</p>
            <p class="card__text">${document.querySelector('#descTodo').value}</p>
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
                <form class="card__dropdown__form">
                  <div class="card__dropdown__form__group">
                      <a href="#" for="dropdownFilterColor1">Red</a>
                      <a href="#" for="dropdownFilterColor2">Blue</a>
                      <a href="#" for="dropdownFilterColor3">Green</a>
                      <a href="#" for="completeButton">Complete</a>
                      <a href="#" for="editButton">Edit</a>
                  </div>
                </form>
            </div>
        </div>
      </div>`;
      const current_tasks = document.getElementsByClassName("card__remove-icon");
      for(let i=0; i<current_tasks.length; i++){
        current_tasks[i].onclick = function() {
            const remove = document.getElementById("newCard");
            remove.style.display = "none";
        }
      };
      
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