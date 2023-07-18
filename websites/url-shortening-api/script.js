const form = document.querySelector("#link-form");
const linkList = document.querySelector("#link-list");
let isOdd = true;

function isURL(str) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

function isOddEven() {
  return isOdd ? "odd" : "even";
}

function createLinkElement(link) {
  const newLinkElement = document.createElement("div");
  newLinkElement.classList.add("link-container");

  const x = isOddEven();
  isOdd = !isOdd;

  newLinkElement.innerHTML = `
    <p>${link}</p>
    <div class="link">
      <div class="font-bold text-cyan">${link}</div>
      <button class="copy ${x}">Copy</button>
    </div>
  `;

  return newLinkElement;
}

function addLinkToLinkList(linkElement) {
  linkList.insertBefore(linkElement, linkList.firstChild);
}

function clearInputField(input) {
  input.value = "";
}

function handleFormSubmission(event) {
  event.preventDefault(); // Prevent form submission

  const input = document.querySelector("#link-input");
  const link = input.value.trim();

  if (isURL(link)) {
    const newLinkElement = createLinkElement(link);
    addLinkToLinkList(newLinkElement);
    clearInputField(input);
  }
}

// Event Listener
form.addEventListener("submit", handleFormSubmission);
