let commentToDelete = null;

export function showPopup(button) {
  commentToDelete = button;
  document.querySelector(".popup-container").classList.add("active");
  document.querySelector(".overlay").classList.add("active");

  document.querySelector(".no-btn").onclick = closePopup;

  document.querySelector(".yes-btn").onclick = () => {
    if (commentToDelete) {
      const replyElement = commentToDelete.closest(".reply");

      if (replyElement) {
        replyElement.remove();
      } else {
        const commentElement = commentToDelete.closest(".comment");

        if (commentElement) {
          commentElement.remove();
        }
      }
      commentToDelete = null;
    }
    closePopup();
  };
}

function closePopup() {
  document.querySelector(".popup-container").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");

  commentToDelete = null;
}
