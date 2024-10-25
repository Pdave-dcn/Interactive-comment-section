async function getData() {
  const response = await fetch("data/data.json");

  const data = await response.json();

  return data;
}

function createCommentElement(comment) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  commentElement.innerHTML = `
  <div class="user-info">
    <img src="${comment.user.image.png}" alt="${comment.user.username}" />
    <span>${comment.user.username}</span>
    <span>${comment.createdAt}</span>
  </div>
  <p>${comment.content}</p>
  <span>Score: ${comment.score}</span>
  `;

  return commentElement;
}

function displayUser(userData) {
  const userElement = document.querySelector(".js-current-user");

  userElement.innerHTML = `
  <div class="current-user">
    <img src="${userData.image.png}" alt="${userData.username}" />
    <textarea name="user-comment-input" id="user-comment-input" placeholder="Add comment..."></textarea>
    <input type="submit" value="SEND"></input>
  </div>
  `;
}

async function displayComments() {
  const data = await getData();

  const commentsContainer = document.querySelector(".js-comments-container");

  data.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsContainer.appendChild(commentElement);

    if (comment.replies.length > 0) {
      comment.replies.forEach((reply) => {
        const replyElement = createCommentElement(reply);
        replyElement.classList.add("reply");
        commentElement.appendChild(replyElement);
      });
    }
  });

  displayUser(data.currentUser);
}

document.addEventListener("DOMContentLoaded", displayComments());
