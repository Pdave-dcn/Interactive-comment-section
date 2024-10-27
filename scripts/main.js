async function getData() {
  try {
    const response = await fetch("data/data.json");

    const data = await response.json();

    return data;
  } catch (error) {
    return console.error("Error: ", error);
  }
}

function createCommentElement(comment, username) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const isCurrentUser = comment.user.username === username;
  //console.log(isCurrentUser);

  const buttonsChoice = isCurrentUser
    ? `
  <div class="delete-edit-btn">
    <button class="delete-btn">
      <img src="images/icon-delete.svg" alt="icon-delete" /> Delete
    </button>
    <button class="edit-btn">
      <img src="images/icon-edit.svg" alt="icon-edit" /> Edit
    </button>
  </div>
  `
    : `
  <div class="reply-btn">
    <button>
      <img src="images/icon-reply.svg" alt="icon reply" />
      Reply
    </button>
  </div>
  `;

  commentElement.innerHTML = `
  <div class="comment-element">
    <div class="score">
      <img src="images/icon-plus.svg" alt="icon-plus" />
      <span>${comment.score}</span>
      <img src="images/icon-minus.svg" alt="icon-minus" />
    </div>
    <div>
      <div class="user-info">
      <div class="wrapper">
        <img src="${comment.user.image.png}" alt="${comment.user.username}" />
        <span class="username">${comment.user.username}</span>
        <span>${comment.createdAt}</span>
      </div>
      <div class="buttons">
        ${buttonsChoice}
      </div>
    </div>
    <p>${comment.content}</p>
    </div>
  </div>
  `;

  return commentElement;
}

function displayUser(userData) {
  const userElement = document.querySelector(".js-currentUser-container");

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
        const replyElement = createCommentElement(
          reply,
          data.currentUser.username
        );
        replyElement.classList.add("reply");
        replyElement.classList.remove("comment");
        commentElement.appendChild(replyElement);
      });
    }
  });

  displayUser(data.currentUser);
}

document.addEventListener("DOMContentLoaded", displayComments());
