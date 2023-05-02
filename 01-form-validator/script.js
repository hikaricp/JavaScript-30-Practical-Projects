// get element
let form = document.getElementById("form");
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");

// show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// check email
function checkEmail(input) {
  const re = /^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/;
  if (re.test(String(input.value.trim()))) {
    showSuccess(input);
  } else {
    showError(input, "邮箱格式错误");
  }
}

// check required input
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getKeyWords(input)}为必填项`);
    } else {
      showSuccess(input);
    }
  });
}

// get key words
function getKeyWords(input) {
  return input.placeholder.slice(3);
}

// check length
function checkLength(input, min, max) {
  if (input.value.trim().length < min) {
    showError(input, `${getKeyWords(input)}至少${min}个字符`);
  } else if (input.value.trim().length > max) {
    showError(input, `${getKeyWords(input)}大于${max}个字符`);
  } else {
    showSuccess(input);
  }
}

// check password match
function checkPasswordsMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "密码不匹配");
  }
}

// event listener
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, confirmPassword]);

  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
