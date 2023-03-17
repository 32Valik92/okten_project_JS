// Дістаємо наше посилання та id
let pageLocation = new URL(location.href),
    userId = pageLocation.searchParams.get('userId'),
    postId = +pageLocation.searchParams.get('postId'),
    postName = pageLocation.searchParams.get('postName');

document.querySelector('h3').innerText = `"${postName}"`; // Заголовок нашого поста

const showInfoPost = (posts) => {
    const currentPost = posts.find(post => post.id === postId); // Знаходимо саме той пост на який натиснули

    document.querySelector('#p01').innerHTML += `${currentPost.userId}`;
    document.querySelector('#p02').innerHTML += `${currentPost.id}`;
    document.querySelector('#p03').innerHTML += `${currentPost.title}`;
    document.querySelector('#p04').innerHTML += `${currentPost.body}`;
};

const showComments = (comments) => {
    comments.forEach((comment, index) => {
        document.querySelector(`#p1${index + 1}1`).innerHTML += `${comment.postId}`;
        document.querySelector(`#p1${index + 1}2`).innerHTML += `${comment.id}`;
        document.querySelector(`#p1${index + 1}3`).innerHTML += `${comment.name}`;
        document.querySelector(`#p1${index + 1}4`).innerHTML += `${comment.email}`;
        document.querySelector(`#p1${index + 1}5`).innerHTML += `${comment.body}`;
    });
};

// Перший fetch виводить нам інформацію про пост, який ми вибрали
fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(posts => posts.json())
    .then(posts => {
        showInfoPost(posts);
        // Другий fetch показує всі коментарі до поста
        return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    })
    .then(comments => comments.json())
    .then(comments => {
        showComments(comments);
    });

