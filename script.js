document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("main-search");
  const searchBtn = document.getElementById("main-search-btn");

  searchBtn.addEventListener("click", () => {
      const keyword = searchInput.value.trim();
      if (keyword) {
          window.location.href = `event.html?keyword=${encodeURIComponent(keyword)}`;
      } else {
          window.location.href = `event.html`; // Show all events if no keyword
      }
  });
});
