jQuery(document).ready(function ($) {
    var passwordBtnEl = $('#password-btn');
    var passwordDisplayEl = $('#password-display');
  
    function getPasswordCharacter() {
        return String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33);
    }
  
    function passwordGenerator(num) {
        var password = '';
        for (var i = 0; i < num; i++) {
            password += getPasswordCharacter();
        }
        return password;
    }
  
    passwordBtnEl.on('click', function () {
        var newPassword = passwordGenerator(15);
        passwordDisplayEl.text(newPassword);
    });
  });
  