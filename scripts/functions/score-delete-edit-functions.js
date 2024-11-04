let commentToDelete = null;
let commentToEdit = null;

export function showPopup(deleteButton) {
  document.querySelector(".popup-container").classList.add("active");
  document.querySelector(".overlay").classList.add("active");

  document.querySelector(".no-btn").onclick = closePopup;

  document.querySelector(".yes-btn").onclick = () => {
    deleteComment(deleteButton);
    closePopup();
  };
}

function deleteComment(deleteBtn) {
  commentToDelete = deleteBtn;
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
}

function closePopup() {
  document.querySelector(".popup-container").classList.remove("active");
  document.querySelector(".overlay").classList.remove("active");

  commentToDelete = null;
}

function getCommentInnerText(array, variable) {
  array.querySelectorAll("*").forEach((element) => {
    if (element.classList.contains("comment-content")) {
      variable = element.innerText;
    }
  });

  return variable;
}

export function editUserComment(editButton) {
  commentToEdit = editButton;

  let commentTextContent = "";
  let text = "";

  if (commentToEdit) {
    const replyElementContainer = commentToEdit.closest(".reply");

    if (replyElementContainer) {
      const containerChildren = replyElementContainer.children[0];

      text = getCommentInnerText(containerChildren, commentTextContent);
      editAndUpdateComment(replyElementContainer, text);
    } else {
      const commentElementContainer = commentToEdit.closest(".comment");

      if (commentElementContainer) {
        const containerChildren = commentElementContainer.children[0];
        text = getCommentInnerText(containerChildren, commentTextContent);
        editAndUpdateComment(commentElementContainer, text);
      }
    }
  }
}

function editAndUpdateComment(container, text) {
  const existingEdittingBox = document.querySelector(".edit-comment");
  const existingUpdateBtn = document.querySelector(".update-btn");
  if (existingEdittingBox && existingUpdateBtn) {
    const originalContent = existingEdittingBox.dataset.originalContent;
    const commentContainer = existingEdittingBox.parentNode;
    existingEdittingBox.remove();
    existingUpdateBtn.remove();

    if (originalContent) {
      const restoredComment = document.createElement("p");
      restoredComment.classList.add("comment-content");
      restoredComment.innerHTML = originalContent;
      commentContainer.appendChild(restoredComment);
    }
  }

  const commentContentElement = container.querySelector(".comment-content");

  const replyToElement = commentContentElement.querySelector(".reply-to");
  const replyToText = replyToElement ? replyToElement.innerText : "";

  const mainCommentText = text.replace(replyToText, "").trim();

  const originalComment = commentContentElement.cloneNode(true);
  const originalContentHTML = originalComment.innerHTML;

  const textarea = document.createElement("textarea");
  textarea.value = mainCommentText;
  textarea.classList.add("edit-comment");
  textarea.dataset.originalContent = originalContentHTML;

  commentContentElement.replaceWith(textarea);

  const updateButton = document.createElement("button");
  updateButton.innerText = "UPDATE";
  updateButton.classList.add("update-btn");

  textarea.after(updateButton);

  updateButton.onclick = () => {
    const updatedContent = document.createElement("p");
    updatedContent.classList.add("comment-content");

    if (replyToText) {
      const span = document.createElement("span");
      span.classList.add("reply-to");
      span.innerText = replyToText;
      updatedContent.appendChild(span);
      updatedContent.append(" ");
    }

    const updatedText = textarea.value.trim();

    if (updatedText === "") {
      textarea.replaceWith(originalComment);
    } else {
      updatedContent.append(updatedText);
      const editedComment = container.querySelector(".edit-comment");
      editedComment.replaceWith(updatedContent);
    }

    updateButton.remove();
  };
}

export function increaseScore(plusBtn) {
  const scoreContainer = plusBtn.closest(".score");
  const childrenElement = scoreContainer.children[1];
  let scoreValue = Number(childrenElement.innerText);

  scoreValue++;

  childrenElement.innerText = scoreValue;
}

export function decreaseScore(minusBtn) {
  const scoreContainer = minusBtn.closest(".score");
  const childrenElement = scoreContainer.children[1];
  let scoreValue = Number(childrenElement.innerText);

  if (scoreValue === 0) {
    scoreValue = 0;
  } else {
    scoreValue--;
    childrenElement.innerText = scoreValue;
  }
}
