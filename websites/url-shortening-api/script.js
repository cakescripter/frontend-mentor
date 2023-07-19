const form = document.querySelector("#link-form");
const linkList = document.querySelector("#link-list");

const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')

let isOdd = true;

function navToggle() {
  btn.classList.toggle('open')
  menu.classList.toggle('flex')
  menu.classList.toggle('hidden')
}

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

function createLinkElement(link, shortenedLink) {
  const newLinkElement = document.createElement("div");
  newLinkElement.classList.add("link-container");

  const x = isOddEven();
  isOdd = !isOdd;

  newLinkElement.innerHTML = `
    <p>${link}</p>
    <div class="link">
      <div class="font-bold text-cyan">${shortenedLink}</div>
      <button class="copy ${x}">Copy</button>
    </div>
  `;

  const copyButton = newLinkElement.querySelector(".copy");
  copyButton.addEventListener("click", () => {
    copyToClipboard(shortenedLink);
    copyButton.textContent = "Copied!";
  });

  return newLinkElement;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Copy to clipboard failed:", error);
  }
}

function addLinkToLinkList(linkElement) {
  linkList.insertBefore(linkElement, linkList.firstChild);
}

function clearInputField(input) {
  input.value = "";
}

async function handleFormSubmission(event) {
  event.preventDefault(); // Prevent form submission

  const input = document.querySelector("#link-input");
  const link = input.value.trim();

  if (!isURL(link)) {
    document.querySelector("#err-msg").textContent = "Please enter a valid URL.";
    return;
  }

  try {
    const shortenedLink = await fetchshrco(link);
    const newLinkElement = createLinkElement(link, shortenedLink);
    addLinkToLinkList(newLinkElement);
    clearInputField(input);
  } catch (error) {
    document.querySelector("#err-msg").textContent =
      "Something went wrong with fetching the shortened link. Please try again later.";
    console.error("Error fetching the shortened link:", error);
  }
}

async function fetchshrco(url) {
  let request = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
  let response = await request.json();
  let shortened = response.result.full_short_link;

  function removeHttps(url) {
    return url.replace(/^https?:\/\//, '');
  }
  return removeHttps(shortened);
}




form.addEventListener("submit", handleFormSubmission);
btn.addEventListener('click', navToggle);