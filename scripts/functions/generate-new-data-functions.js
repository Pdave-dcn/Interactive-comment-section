import { getData } from "./generate-first-data-functions.js";

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
