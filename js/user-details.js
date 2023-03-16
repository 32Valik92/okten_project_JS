// Дістаємо наше посилання та id
let pageLocation = new URL(location.href),
    userId = +pageLocation.searchParams.get('userId');

function renderInfo(objectUser, fatherElement) {
    let ul = document.createElement('ul');
    fatherElement.appendChild(ul);

    for (let key in objectUser) {
        let li = document.createElement('li');
        ul.appendChild(li);

        if (typeof objectUser[key] === 'object') { // Якщо наш об'єкт є вкладеним
            li.innerHTML = `<b><i>${key}:</i></b>`;
            renderInfo(objectUser[key], li); // Рекурсія
        } else {
            li.innerHTML = `<b><i>${key}:</i></b> ${objectUser[key]}`;
            ul.appendChild(li);
        }
    }
}

// Витягаю дані про нашого користувача
let userInfo = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(user => user.json());

// Витягаю дані про відповідні пости нашого користувача
let postsInfo = fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(posts => posts.json());

// В promise передаю об'єкт з наш двох комірок з даними
Promise.all([userInfo, postsInfo]).then(info => {
    let [user, posts] = info; // Деструктуризація на окремі змінні

    renderInfo(user, document.getElementsByClassName('divUserList')[0]); // викликаємо функцію, яка формує список з детальною інформацією користувача

    document.getElementsByTagName("h1")[0].innerText = `About ${user.name}`; // Заголовок для імені користувача

    let buttonShowHide = document.getElementsByClassName('buttonShowHide')[0]; // Кнопка, яка показує або приховує наші пости
    buttonShowHide.innerText = `Post of current ${user.name}`;

    // Подія на кнопку, яка буде показувати або приховувати наші пости
    buttonShowHide.addEventListener('click', function () {
        let divPosts = document.getElementsByClassName('divPosts')[0]; // Контейнер, де будуть міститися всі пости

        // Якщо текст кнопки такий, то показуємо пости
        if (buttonShowHide.textContent === `Post of current ${user.name}`) {

            posts.forEach((post, index) => {
                let divPost = document.getElementById(`post${index + 1}`), // Контейнер для кожного поста
                    title = document.createElement('p'), // Заголовок поста
                    buttonMore = document.createElement('button'); // Кнопка про детальну інформацію поста

                divPost.append(title, buttonMore);
                divPosts.appendChild(divPost);

                // Беру перші три слова заголовка, щоб не нагромаджувалося
                title.innerText = `${post.title.split(' ').slice(0, 3).join(' ')}`;
                buttonMore.innerText = 'More';

                // Подія на кнопці "More", яка переносить нас на сторінку з конкретним постом та інформацією про нього
                buttonMore.addEventListener('click', function () {
                    window.location.href = `post-details.html?userId=${userId}&postId=${post.id}&postName=${post.title}`;
                });
            });

            buttonShowHide.innerText = 'Hide posts'; // після виведення постів змінюємо кнопку

            // Перевірка для приховання постів після виведення
        } else {
            buttonShowHide.innerText = `Post of current ${user.name}`; // Змінюємо на той напис, який знову покаже пости

            let divPosts = document.querySelectorAll('.divPost');
            divPosts.forEach(post => {
                post.innerText = ''; // "Ховаємо" пости
            });
        }
    });
});