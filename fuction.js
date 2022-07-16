window.onload = function () {
	const todoForm = document.querySelector(".todo-form");
	todoForm.onsubmit = function (e) {
		e.preventDefault();
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
				<span class="card__status--progress--show status" id="status">On progress</span>
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
											<a href="#" for="completeButtonCard" class="completeButtonCard">Complete</a>
											<a href="#" for="deleteButtonCard" class="deleteButtonCard">Delete</a>
									</div>
								</div>
						</div>
				</div>
			</div>`;
			const statusProgress = document.getElementsByClassName("completeButtonCard")
			for(let i = 0; i < statusProgress.length; i++){
				statusProgress[i].onclick = function() {
					if(document.getElementsByTagName("SPAN")[i].innerText == "On progress"){
						document.getElementsByClassName("card__title")[i].classList.toggle("checked")
						document.getElementsByClassName("card__text")[i].classList.toggle("checked");
						document.getElementsByClassName("desc")[i].classList.toggle("checked");
						document.getElementsByClassName("status")[i].classList.remove("card__status--progress--show");
						document.getElementsByClassName("status")[i].textContent ="Completed";
						document.getElementsByClassName("status")[i].classList.toggle("card__status--completed--show");
						document.getElementsByClassName("clearTags")[i].classList.toggle("checked");
					}
					else if(document.getElementsByTagName("SPAN")[i].innerText == "Completed"){
						document.getElementsByClassName("card__title")[i].classList.toggle("checked")
						document.getElementsByClassName("card__text")[i].classList.toggle("checked");
						document.getElementsByClassName("desc")[i].classList.toggle("checked");
						document.getElementsByClassName("status")[i].classList.remove("card__status--completed--show");
						document.getElementsByClassName("status")[i].textContent ="On progress";
						document.getElementsByClassName("status")[i].classList.toggle("card__status--progress--show");
						document.getElementsByClassName("clearTags")[i].classList.toggle("checked");
					}
				}
			};

			let close = document.getElementsByClassName("deleteButtonCard");
			for (i = 0; i < close.length; i++) {
				close[i].onclick = function() {
					this.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
				}
			}
			
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
	// document.querySelector(".card__title").classList.toggle("checked")
	document.querySelector(".card__text").classList.toggle("checked");
	document.querySelector(".desc").classList.toggle("checked");
	document.querySelector(".status").classList.remove("card__status--progress--show");
	// document.querySelector(".status").textContent ="Completed";
	document.querySelector(".status").classList.toggle("card__status--completed--show");
	document.querySelector(".clearTags").classList.toggle("checked")
	dropzone.appendChild(draggableElement);


	event
    .dataTransfer
    .clearData();
}
function searchItem() {
	// Declare variables
	var input, filter, cardContainer, elemen, a, i, txtValue;
	input = document.getElementById('search-todo');
	filter = input.value.toUpperCase();
	cardContainer = document.getElementById("cardContainer");
	cardComp = document.getElementById("cardCompleted");
	elemen = cardContainer.getElementsByTagName('div');
	// a = li.getElementsByTagName(''); 
	console.log(elemen)
  
	// Loop through all list items, and hide those who don't match the search query
	for (i = 0; i < elemen.length; i++) {
		var text = ("textContent" in document) ? "textContent" : "innerText";
		a = elemen[i].getElementsByTagName("H3")[0];
		txtValue = a.textContent;
		console.log(a)
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			elemen[i].style.display = "";
		} else {
			elemen[i].style.display = "none";
		}
	}
}
