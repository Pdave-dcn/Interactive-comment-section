import {
  getData,
  createCommentElement,
  displayUser,
  displayComments,
} from "./functions/generate-first-data-functions.js";
import { displayReplyBox } from "./functions/generate-new-data-functions.js";

document.addEventListener("DOMContentLoaded", () => {
  displayComments().then(() => {
    const replyElement = document
      .querySelectorAll(".js-reply-btn")
      .forEach((replyBtn) => {
        replyBtn.addEventListener("click", () => {
          displayReplyBox(replyBtn);
        });
      });
  });
});
