$("#sendMess").on("click", function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var tel = $('#tel').val();

    if (email == "") {
        $("#errorValid").text("Введите Email");
        return false;
    }else if (name == "") {
        $("#errorValid").text("Введите Имя и Фамилию");
        return false;
    }else if (tel == "") {
        $("#errorValid").text("Введите Телефон");
        return false;
    }
});

