import {
  getData,
  createCommentElement,
  displayUser,
  displayComments,
} from "./functions/generate-first-data-functions.js";
import {
  displayReplyBox,
  createCurrentUserComment,
  renderUserCommentHTML,
} from "./functions/generate-new-data-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  displayComments().then(() => {
    document.querySelectorAll(".js-reply-btn").forEach((replyBtn) => {
      replyBtn.addEventListener("click", () => {
        displayReplyBox(replyBtn);
      });
    });

    document.querySelector(".send-btn").addEventListener("click", () => {
      createCurrentUserComment();
    });
  });
});
