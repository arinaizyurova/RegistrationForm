const form = document.getElementById("registration");
const result = document.getElementById("result");

// Каждое поле проверяется своим регулярным выражением.
const rules = {
    fullname: {
        regex: /^[A-Za-zА-Яа-яЁё]+ +[A-Za-zА-Яа-яЁё]+ +[A-Za-zА-Яа-яЁё]+$/,
        error: "Введите фамилию, имя и отчество через пробел. Разрешены только буквы."
    },
    login: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=(?:\D*\d){3})(?=.*[^A-Za-z0-9\s])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-]{15,}$/,
        error: "Нужны латинские буквы обоих регистров, минимум 3 цифры, 1 спецсимвол и длина от 15 символов."
    },
    email: {
        regex: /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/,
        error: "Введите email с @ и доменом, например name@example.com. Кириллица и пробелы запрещены."
    },
    age: {
        regex: /^(1[89]|[2-9][0-9])$/,
        error: "Введите целое число от 18 до 99."
    },
    password: {
        regex: /^(?=.*[а-яё])(?=.*[А-ЯЁ])(?=(?:\D*\d){3})(?=.*[^А-Яа-яЁё0-9\s])[А-Яа-яЁё0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-]{15,}$/,
        error: "Нужны русские буквы обоих регистров, минимум 3 цифры, 1 спецсимвол и длина от 15 символов. Латиница запрещена."
    }
};

form.addEventListener("submit", function(event) {
    // Останавливаем отправку: для задания нужен только показ результата.
    event.preventDefault();
    let valid = true;
    let firstError = null;

    for (const name in rules) {
        const input = document.getElementById(name);
        const error = document.getElementById(name + "-error");
        const correct = rules[name].regex.test(input.value);

        error.textContent = correct ? "" : rules[name].error;
        input.classList.toggle("invalid", !correct);
        input.setAttribute("aria-invalid", String(!correct));

        if (!correct) {
            valid = false;
            if (firstError === null) firstError = input;
        }
    }

    if (valid) {
        result.textContent = "Форма заполнена правильно! Все проверки пройдены.";
        result.style.color = "#35633b";
    } else {
        result.textContent = "Исправьте ошибки в отмеченных полях.";
        result.style.color = "#a52a2a";
        firstError.focus();
    }
});

// После изменения данных старое сообщение об успехе убирается.
form.addEventListener("input", function() {
    result.textContent = "";
});
