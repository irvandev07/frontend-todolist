const form = document.getElementById('form');
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form);
    const user = data.get('username');
    const pass = data.get('password');
    // console.log(user, pass)
    if ((user == "") || (pass == "")){
        alert("Please insert Username and Password")
    }
    else{
        const url = "http://127.0.0.1:5000/login/",
        credentials = btoa(`${user}:${pass}`);
        // console.log(credentials)
        fetch (url, {
            method: 'POST',
            mode : 'cors',
            credentials: 'include',
            headers: {
            "Authorization": `Basic ${credentials}`
            }
        })
        .then((result) => {
            if (result.status != 201) { throw new Error("Bad Server Response"); }
            return result.json();
        })
        .then((response) => {
            // console.log(response)
            localStorage.setItem('token', response['token']);
            window.location.href = 'index.html';
        })
        .catch((error) => { console.log(error); });
        
        
    }
})