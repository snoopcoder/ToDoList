$(document).ready(function() {
  $("form").submit(function(e) {
    var password = document.getElementById("inputPassword").value;
    var username = document.getElementById("inputUserName").value;
    var data, xhr;
    data = new FormData();
    data.append("username", username);
    data.append("password", CryptoJS.MD5(password));

    xhr = new XMLHttpRequest();

    xhr.open("POST", "/login", true);
    xhr.onreadystatechange = function(response) {};
    xhr.send(data);
  });
});

function _submitForm() {
  //можно обработать введеные пароли на сложность, а так же имя пользователя на валидность
}
