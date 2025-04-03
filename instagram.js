const INBOX_URL = "https://www.instagram.com/direct/inbox/";
const AUTHORIZED_START_URL  =[
  "https://www.instagram.com/direct/t/",
  "https://www.instagram.com/accounts/",
];

function redirectToInbox() {
  window.location.href = INBOX_URL
}

function isOnAllowedUrl() {
  return window.location.href === INBOX_URL || AUTHORIZED_START_URL.some(startUrl=>window.location.href.startsWith(startUrl));
}

function hideEl(selector) {
  const el = selector()
  
  if(el.style.display == "none") {
    throw new Error("Already hidden")
  }

  selector().style.display="none"
}

function hideElAsync(selector) {
  try {
    hideEl(selector)
  } catch {
    const interval = setInterval(()=>{
      try {
        hideEl(selector);
        clearInterval(interval);
      } catch {}
    }, 100);
  }
}

function hideElements() {
  const navEls = ()=>document.querySelectorAll('[tabindex="-1"] span.html-span');

  hideElAsync(()=>navEls()[0]) // Logo
  hideElAsync(()=>navEls()[1]) // Home
  hideElAsync(()=>navEls()[2]) // Search
  hideElAsync(()=>navEls()[3]) // Explore
  hideElAsync(()=>navEls()[4]) // Reels
  hideElAsync(()=>navEls()[7]) // Create
  hideElAsync(()=>navEls()[8]) // Profile
  hideElAsync(()=>navEls()[9]) // Threads

  hideElAsync(()=>document.querySelector('[data-pagelet="IGDThreadList"] :first-child')) // Notes
}

let lastUrl = null;
setInterval(()=>{  
  if(!isOnAllowedUrl()) {
    redirectToInbox()
    return;
  }

  if(lastUrl !== window.location.href) {
    lastUrl = window.location.href
    hideElements();
  }
}, 100)
