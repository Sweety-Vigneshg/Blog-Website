document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    // Function to add a new post to the DOM
    function addPost(title, content) {
        const postSection = document.createElement('section');
        postSection.classList.add('post');

        const postTitle = document.createElement('h2');
        postTitle.textContent = title;

        const postDate = document.createElement('p');
        postDate.classList.add('date');
        const date = new Date();
        postDate.textContent = `Posted on ${date.toDateString()}`;

        const postContent = document.createElement('p');
        postContent.classList.add('content');
        postContent.textContent = content;

        const readMoreLink = document.createElement('a');
        readMoreLink.href = '#';
        readMoreLink.classList.add('read-more');
        readMoreLink.textContent = 'Read More';

        postSection.appendChild(postTitle);
        postSection.appendChild(postDate);
        postSection.appendChild(postContent);
        postSection.appendChild(readMoreLink);

        postsContainer.appendChild(postSection);
    }

    // Handle form submission
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = postForm.title.value;
        const content = postForm.content.value;

        addPost(title, content);

        // Clear the form
        postForm.reset();
    });
});
