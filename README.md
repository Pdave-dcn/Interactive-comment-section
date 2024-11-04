# Comment and Reply System

This project provides a web-based comment and reply interface that allows users to add, edit, reply to, and delete comments. It also includes a basic scoring system where users can upvote or downvote comments. The project is written in JavaScript and relies on `fetch` to retrieve data from a JSON file, with asynchronous functions for data fetching, handling, and updating.

## Table of Contents

- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Code Structure](#code-structure)
- [Key Functions](#key-functions)
- [Contributing](#contributing)

## Features

- **Add Comments:** Users can submit a new comment.
- **Reply to Comments:** Users can reply to existing comments.
- **Edit Comments:** Users can edit their own comments.
- **Delete Comments:** Users can delete comments after confirming through a popup.
- **Scoring System:** Upvote or downvote comments.
- **Dynamic Timestamps:** Comments show dynamically updated timestamps.

## Setup

1. Clone this repository to your local machine.
2. Place `data/data.json` containing initial data into the appropriate directory.
3. Ensure the images (e.g., `icon-delete.svg`, `icon-reply.svg`, etc.) are located in an `images/` folder.

To view the project, open the HTML file in a browser or set up a local server if necessary.

## Usage

1. **Add Comment**: Enter text in the input box provided for a new comment, then click "SEND."
2. **Reply to Comment**: Click "Reply" under any comment to open a reply box directly under it.
3. **Edit Comment**: Click "Edit" to modify your own comments.
4. **Delete Comment**: Click "Delete" and confirm deletion in the popup.
5. **Upvote/Downvote**: Use the plus and minus buttons to adjust the score.

## Code Structure

The project uses modular JavaScript, separating key functions into dedicated files for better maintainability.

- **`generate-first-data-functions.js`**: Contains data-fetching functions.
- **`generate-new-data-functions.js`**: Handles dynamic data updates.
- **`score-delete-edit-functions.js`**: Manages scoring, deletion, and editing logic.

### Important HTML Structure

- **Comment Structure**: Main comment is a `.comment` div with nested `.reply` divs for replies.
- **Score and Buttons**: Each comment includes a scoring section with buttons for upvoting and downvoting.

## Key Functions

### Display Functions

- **`displayComments`**: Fetches initial comments from `data.json` and renders them.
- **`displayUser`**: Displays the current user's information.

### Action Functions

- **`createCurrentUserComment`**: Adds a new comment from the current user.
- **`displayReplyBox`**: Renders a reply box directly below the comment being replied to.
- **`editUserComment`**: Allows the user to edit their own comments in place.

### Popup Management

- **`showPopup`**: Displays a confirmation popup before deleting.
- **`deleteComment`**: Deletes a comment or reply based on user confirmation.
- **`closePopup`**: Closes the confirmation popup.

### Scoring Functions

- **`increaseScore`**: Increases the score of a comment.
- **`decreaseScore`**: Decreases the score of a comment, with a minimum score of 0.

### Utility Functions

- **`updatePostdates`**: Updates timestamps every 60 seconds to show relative time.
- **`formatTimePassed`**: Formats time difference into readable text, e.g., "just now" or "3 minutes ago."
