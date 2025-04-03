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

  el.style.display="none"
}

function hideElAsync(selector) {
  try {
    console.log(selector)
    hideEl(selector)
  } catch {
    const interval = setInterval(()=>{
      console.log(selector)
      try {
        hideEl(selector);
        clearInterval(interval);
      } catch {}
    }, 100);
  }
}

function hideElements() {
  hideElAsync(
    ()=>document.querySelector('[tabindex="-1"]:first-of-type > div > div > div > div:nth-of-type(1)')
  ) // Logo

  const navEls = ()=>document.querySelectorAll('[tabindex="-1"]:first-of-type > div > div > div > div:nth-of-type(2) span.html-span');
  hideElAsync(()=>navEls()[0]) // Home
  hideElAsync(()=>navEls()[1]) // Search
  hideElAsync(()=>navEls()[2]) // Explore
  hideElAsync(()=>navEls()[3]) // Reels
  hideElAsync(()=>navEls()[6]) // Create
  hideElAsync(()=>navEls()[7]) // Profile


  hideElAsync(()=>
    document.querySelectorAll('[tabindex="-1"]:first-of-type > div > div > div > div:nth-of-type(3) span.html-span')[0]
  ) // Threads

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
