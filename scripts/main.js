import {
  getData,
  createCommentElement,
  displayUser,
  displayComments,
  displayReplyBox,
} from "./fonctions.js";

document.addEventListener("DOMContentLoaded", () => {
  displayComments().then(() => {
    const replyElement = document
      .querySelectorAll(".js-reply-btn")
      .forEach((replyBtn) => {
        replyBtn.addEventListener("click", () => {
          //const commentId = user.dataset.commentId;
          //console.log(commentId);
          displayReplyBox(replyBtn);
        });
      });
  });
});
