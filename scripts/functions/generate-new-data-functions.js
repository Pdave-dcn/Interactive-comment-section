import { getData } from "./generate-first-data-functions.js";

function renderUserCommentHTML(data, commentContent, commentElement) {
  const html = `<div class="comment-element">
    <div class="score">
          <button type="button" class="score-btn-plus js-plus-btn">
            <img class="plus-btn" src="images/icon-plus.svg" alt="icon-plus" />
          </button>
          <span class="score-value">0</span>
          <button type="button" class="score-btn-minus js-minus-btn">
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
            ${commentContent}
          </p>
        </div>
   </div>
   `;

  return html;
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

    if (replyContent.trim()) {
      let replyElement = replyBtn.closest(".comment");

      replyElement = document.createElement("div");
      replyElement.classList.add("reply");

      replyElement.innerHTML = renderUserCommentHTML(
        data,
        replyContent,
        commentElement
      );
      repliesContainer.appendChild(replyElement);
    }

    replyBox.remove();
  });
}

export async function createCurrentUserComment() {
  const data = await getData();

  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");

  const userCommentContent =
    document.getElementById("user-comment-input").value;

  const userCommentContainer = document.createElement("div");
  userCommentContainer.classList.add("comment-element");

  userCommentContainer.innerHTML = `
  <div class="score">
          <button type="button" class="score-btn-plus js-plus-btn">
            <img class="plus-btn" src="images/icon-plus.svg" alt="icon-plus" />
          </button>
          <span>0</span>
          <button type="button" class="score-btn-minus js-minus-btn">
            <img class="minus-btn" src="images/icon-minus.svg" alt="icon-minus" />
          </button>
    </div>
    <div class="wrapper-element">
        <div class="user-info">
            <div class="wrapper">
              <img src="${data.currentUser.image.png}" alt="${data.currentUser.username}" />
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
          <div class="elements-wrapper js-elements-wrapper">
          <p class="comment-content">
            ${userCommentContent}
          </p>
          </div>
        </div>
  `;

  commentElement.appendChild(userCommentContainer);

  document.querySelector(".js-comments-container").appendChild(commentElement);

  document.getElementById("user-comment-input").value = "";
}
