document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "b9I4BUFXugjTI70LAGgWztr0r3eqqTFW";
  const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events.json";
  const resultsContainer = document.getElementById("results");
  const searchInput = document.getElementById("event-search");
  const searchBtn = document.getElementById("search-btn");

  const urlParams = new URLSearchParams(window.location.search);
  const keyword = urlParams.get("keyword");

  if (keyword) {
    searchInput.value = keyword;
    fetchEvents(keyword);
  } else {
    fetchAllEvents();
  }

  searchBtn.addEventListener("click", () => {
    const newKeyword = searchInput.value.trim();
    if (newKeyword) {
      window.location.href = `event.html?keyword=${encodeURIComponent(newKeyword)}`;
    }
  });

  async function fetchEvents(keyword) {
    const url = `${BASE_URL}?keyword=${encodeURIComponent(keyword)}&countryCode=US&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      resultsContainer.innerHTML = "<p>Error loading data. Try again.</p>";
    }
  }

  async function fetchAllEvents() {
    const url = `${BASE_URL}?countryCode=US&apikey=${API_KEY}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      displayResults(data);
    } catch (error) {
      console.error("Error fetching all events:", error);
      resultsContainer.innerHTML = "<p>Error loading events. Try again later.</p>";
    }
  }

  function displayResults(data) {
    resultsContainer.innerHTML = "";

    const events = data._embedded?.events || [];
    if (events.length === 0) {
      resultsContainer.innerHTML = "<p>No events found.</p>";
      return;
    }

    events.forEach(event => {
      const { name, images, url, dates, _embedded } = event;
      const eventDate = dates?.start?.localDate || "Date Not Available";
      const venue = _embedded?.venues?.[0]?.name || "Venue Not Available";

      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
              <img src="${images ? images[0].url : 'placeholder.jpg'}" alt="${name}">
              <div class="card-content">
                  <h3>${name}</h3>
                  <p>${eventDate} - ${venue}</p>
                  <a href="${url}" target="_blank">More Details</a>
              </div>
          `;

      resultsContainer.appendChild(card);
    });
  }
});
