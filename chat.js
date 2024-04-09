//for the popup
document.addEventListener("DOMContentLoaded", function () {
  // Get references to the permission request popup and buttons
  const permissionPopup = document.getElementById("permissionPopup");
  const allowBtn = document.getElementById("allowBtn");
  const denyBtn = document.getElementById("denyBtn");

  // Hide the permission request popup initially
  permissionPopup.style.display = "none";

  // Function to show the permission request popup
  function showPermissionPopup() {
    permissionPopup.style.display = "block";
  }

  // Function to hide the permission request popup
  function hidePermissionPopup() {
    permissionPopup.style.display = "none";
  }

  // Event listener for the "Allow" button
  allowBtn.addEventListener("click", function () {
    // Perform action when user allows tracking
    // For example, send request to Python backend to track emotions
    // You can use fetch API or XMLHttpRequest to send request
    alert("Thank you for allowing us to track your emotions.");
    // Hide the permission request popup
    hidePermissionPopup();
  });

  // Event listener for the "Deny" button
  denyBtn.addEventListener("click", function () {
    // Perform action when user denies tracking
    alert("You denied permission to track your emotions.");
    // Hide the permission request popup
    hidePermissionPopup();
    window.close();
  });

  // Show the permission request popup
  showPermissionPopup();
});

// MESSAGE INPUT
const textarea = document.querySelector(".chatbox-message-input");
const chatboxForm = document.querySelector(".chatbox-message-form");

textarea.addEventListener("input", function () {
  let line = textarea.value.split("\n").length;

  if (textarea.rows < 6 || line < 6) {
    textarea.rows = line;
  }

  if (textarea.rows > 1) {
    chatboxForm.style.alignItems = "flex-end";
  } else {
    chatboxForm.style.alignItems = "center";
  }
});

// TOGGLE CHATBOX
const chatboxToggle = document.querySelector(".chatbox-toggle");
const chatboxMessage = document.querySelector(".chatbox-message-wrapper");

chatboxToggle.addEventListener("click", function () {
  chatboxMessage.classList.toggle("show");
});

// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector(
  ".chatbox-message-dropdown-toggle"
);
const dropdownMenu = document.querySelector(".chatbox-message-dropdown-menu");

dropdownToggle.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
});

document.addEventListener("click", function (e) {
  if (
    !e.target.matches(".chatbox-message-dropdown, .chatbox-message-dropdown *")
  ) {
    dropdownMenu.classList.remove("show");
  }
});

// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector(
  ".chatbox-message-content"
);
const chatboxNoMessage = document.querySelector(".chatbox-message-no-message");

chatboxForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (isValid(textarea.value)) {
    writeMessage();
    setTimeout(autoReply, 1000);
  }
});

function addZero(num) {
  return num < 10 ? "0" + num : num;
}

function writeMessage() {
  const today = new Date();
  let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, "<br>\n")}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(
    today.getMinutes()
  )}</span>
		</div>
	`;
  chatboxMessageWrapper.insertAdjacentHTML("beforeend", message);
  chatboxForm.style.alignItems = "center";
  textarea.rows = 1;
  textarea.focus();
  textarea.value = "";
  chatboxNoMessage.style.display = "none";
  scrollBottom();
}

function autoReply() {
  const today = new Date();
  let message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
				Thank you for your awesome support!
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(
    today.getMinutes()
  )}</span>
		</div>
	`;
  chatboxMessageWrapper.insertAdjacentHTML("beforeend", message);
  scrollBottom();
}

function scrollBottom() {
  chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
}

function isValid(value) {
  let text = value.replace(/\n/g, "");
  text = text.replace(/\s/g, "");

  return text.length > 0;
}
