export async function getData() {
  try {
    const response = await fetch("data/data.json");

    const data = await response.json();

    return data;
  } catch (error) {
    return console.error("Error: ", error);
  }
}

export function createCommentElement(comment, username) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const isCurrentUser = comment.user.username === username;

  const buttonsChoice = isCurrentUser
    ? `
  <div class="delete-edit-btn">
    <button type="button" class="delete-btn">
      <img src="images/icon-delete.svg" alt="icon-delete" /> Delete
    </button>
    <button type="button" class="edit-btn">
      <img src="images/icon-edit.svg" alt="icon-edit" /> Edit
    </button>
  </div>
  `
    : `
  <div class="reply-btn">
    <button type="button" class="js-reply-btn" data-comment-id="${comment.id}">
      <img src="images/icon-reply.svg" alt="icon reply" />
      Reply
    </button>
  </div>
  `;

  const userId = isCurrentUser
    ? `
  <img src="${comment.user.image.png}" alt="${comment.user.username}" />
  <span class="username">${comment.user.username}</span>
  <span class="user-id">you</span>
  <span>${comment.createdAt}</span>
  `
    : `
  <img src="${comment.user.image.png}" alt="${comment.user.username}" />
  <span class="username">${comment.user.username}</span>
  <span>${comment.createdAt}</span>
  `;

  const content = comment.replyingTo
    ? `
  <span class="reply-to">@${comment.replyingTo}</span> ${comment.content}
  `
    : `
  ${comment.content}
  `;

  commentElement.innerHTML = `
  <div class="comment-element">
    <div class="score">
      <button type="button" class="score-btn js-plus-btn">
        <img class="plus-btn" src="images/icon-plus.svg" alt="icon-plus" />
      </button>
      <span>${comment.score}</span>
      <button type="button" class="score-btn js-minus-btn">
        <img class="minus-btn" src="images/icon-minus.svg" alt="icon-minus" />
      </button>
    </div>
    <div>
      <div class="user-info">
        <div class="wrapper">
          ${userId}
        </div>
      <div class="buttons">
        ${buttonsChoice}
      </div>
    </div>
    <p class="comment-content">${content}</p>
    </div>
  </div>
  `;

  return commentElement;
}

export function displayUser(userData) {
  const userElement = document.querySelector(".js-currentUser-container");

  userElement.innerHTML = `
  <div class="current-user">
    <img src="${userData.image.png}" alt="${userData.username}" />
    <textarea name="user-comment-input" id="user-comment-input" placeholder="Add comment..."></textarea>
    <button type="button" class="send-btn">SEND</button>
  </div>
  `;
}

export async function displayReplyBox(replyBtn) {
  const data = await getData();

  const existingReplyBox = document.querySelector(".reply-box");
  if (existingReplyBox) {
    existingReplyBox.remove();
  }

  const replyBox = document.createElement("div");
  replyBox.classList.add("reply-box");

  replyBox.innerHTML = `
  <div class="comment current-user-reply">
    <img src="${data.currentUser.image.png}" alt="${data.currentUser.username}" />
    <textarea name="reply-input" id="reply-input" class="js-reply-input" placeholder="Add reply..."></textarea>
    <button type="button" class="send-reply-btn js-send-reply-btn">REPLY</button>
  </div>
  `;

  const commentElement = replyBtn.closest(".comment");

  if (commentElement) {
    let repliesContainer = commentElement.querySelector(".replies-container");

    if (!repliesContainer) {
      repliesContainer = document.createElement("div");
      repliesContainer.classList.add("replies-container");
      commentElement.appendChild(repliesContainer);
    }

    const existingReplyBox = commentElement.querySelector(".reply-box");
    if (existingReplyBox) {
      existingReplyBox.remove();
    }

    repliesContainer.insertBefore(replyBox, repliesContainer.firstChild);
  }

  const repliesContainer = commentElement.querySelector(".replies-container");

  replyBox.querySelector(".js-send-reply-btn").addEventListener("click", () => {
    let replyContent = replyBox.querySelector(".js-reply-input").value;

    //console.log(replyContent);

    if (replyContent.trim()) {
      let replyElement = replyBtn.closest(".comment");

      replyElement = document.createElement("div");
      replyElement.classList.add("reply");

      replyElement.innerHTML = `
      <div class="comment-element">
        <div class="score">
          <button type="button" class="score-btn js-plus-btn">
            <img class="plus-btn" src="images/icon-plus.svg" alt="icon-plus" />
          </button>
          <span>0</span>
          <button type="button" class="score-btn js-minus-btn">
            <img class="minus-btn" src="images/icon-minus.svg" alt="icon-minus" />
          </button>
        </div>
        <div class="wrapper-element">
            <div class="user-info">
            <div class="wrapper">
              <img src="${data.currentUser.image.png}" alt="${
        data.currentUser.username
      }" />
              <span class="username">${data.currentUser.username}</span>
              <span class="user-id">you</span>
              <span>just now</span>
            </div>
            <div class="buttons">
              <div class="delete-edit-btn">
                <button type="button" class="delete-btn">
                  <img src="images/icon-delete.svg" alt="icon-delete" /> Delete
                </button>
                <button type="button" class="edit-btn">
                  <img src="images/icon-edit.svg" alt="icon-edit" /> Edit
                </button>
              </div>
            </div>
          </div>
          <p class="comment-content">
            <span class="reply-to">@${
              commentElement.querySelector(".username").innerText
            }</span>
            ${replyContent}
          </p>
        </div>
      </div>
      `;
      repliesContainer.appendChild(replyElement);
    }

    replyBox.remove();
  });
}

export async function displayComments() {
  const data = await getData();

  const commentsContainer = document.querySelector(".js-comments-container");

  data.comments.forEach((commentContent) => {
    const commentElement = createCommentElement(commentContent);
    commentsContainer.appendChild(commentElement);

    const repliesContainer = document.createElement("div");
    repliesContainer.classList.add("replies-container");
    commentElement.appendChild(repliesContainer);

    if (commentContent.replies.length > 0) {
      commentContent.replies.forEach((reply) => {
        const replyElement = createCommentElement(
          reply,
          data.currentUser.username
        );
        replyElement.classList.add("reply");
        repliesContainer.appendChild(replyElement);
      });
    }
  });

  displayUser(data.currentUser);
}
