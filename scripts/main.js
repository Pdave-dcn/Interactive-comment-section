import { displayComments } from "./functions/generate-first-data-functions.js";
import {
  displayReplyBox,
  createCurrentUserComment,
} from "./functions/generate-new-data-functions.js";
import {
  showPopup,
  editUserComment,
  increaseScore,
  decreaseScore,
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

    document.addEventListener("click", (event) => {
      if (
        event.target.closest(".plus-btn") ||
        event.target.closest(".minus-btn")
      ) {
        if (event.target.closest(".plus-btn")) {
          increaseScore(event.target.closest(".plus-btn"));
        } else {
          decreaseScore(event.target.closest(".minus-btn"));
        }
      }
    });
  });
});
