import { displayComments } from "./functions/generate-first-data-functions.js";
import {
  displayReplyBox,
  createCurrentUserComment,
} from "./functions/generate-new-data-functions.js";
import {
  showPopup,
  editUserComment,
} from "./functions/score-delete-edit-functions.js";

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

    document.addEventListener("click", (event) => {
      if (event.target.closest(".delete-btn")) {
        showPopup(event.target.closest(".delete-btn"));
      }
    });

    document.addEventListener("click", (event) => {
      if (event.target.closest(".edit-btn")) {
        editUserComment(event.target.closest(".edit-btn"));
      }
    });
  });
});
