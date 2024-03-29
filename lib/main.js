// window.addEventListener('load', function() {
//     console.log('fetching posts');
//     fetch('/posts')
//     .then(res => res.json())
//     .then(data => {populatePosts(data)});
//   });

  const populatePosts = posts => {
    console.log(posts);
      const container = document.getElementById('posts-container');
      for (let i = posts.length - 1; i >= 0; i--) {
        const postContainer = document.createElement('DIV');
        postContainer.className = 'post-container';
        postContainer.appendChild(contactInfo(posts[i]));
        postContainer.appendChild(imgContainer(posts[i]));
        container.appendChild(postContainer);
      }
      document.getElementById('spinner-container').style.display = 'none';
  }

const contactInfo = info => {
    const container = document.createElement('DIV');
    container.className = 'contact-info-container';
    container.innerHTML = `<div><b>Name: </b>${info.name}</div><div><b>Email: </b>${info.email}</div>`
    return container;
}

const imgContainer = info => {
    const container = document.createElement('DIV');
    container.className = 'user-image-container';
    container.style.backgroundImage = `url(/user_images/${info.img})`;
    container.style.backgroundPosition = info.img_position;
    return container;
}
