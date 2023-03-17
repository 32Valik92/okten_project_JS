fetch('https://jsonplaceholder.typicode.com/users')
    .then(users => users.json())
    .then(users => {
        users.forEach((user, index) => {
            let divUser = document.querySelector(`#user${index + 1}`),
                h3 = document.createElement('h3'),
                button = document.createElement('button');

            h3.innerText = `Id: ${user.id} Name: ${user.name}`; // Значення нашого заголовка

            button.innerText = 'More about user'; // Напис на кнопці кожного користувача

            // Додаю подію на кнопку, яка перенаправляє нас на сторінку детальної інформації про користувача
            button.addEventListener('click', function () {
                window.location.href = `user-details.html?userId=${user.id}`; // Посилання куди перенаправляють
            });

            divUser.replaceChildren(h3, button);
        });
    });
