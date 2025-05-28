// Task 1: Basic JS setup
console.log("Welcome to the Community Portal");

window.onload = () => {
  alert("Page is fully loaded!");
  renderEvents(events);
  preselectEventType();
};

// Task 2,5,6: Event Data and Objects
class Event {
  constructor(name, date, seats, category, location, fee, img) {
    this.name = name;
    this.date = new Date(date);
    this.seats = seats;
    this.category = category;
    this.location = location;
    this.fee = fee;
    this.img = img; // image URL or path
  }

  checkAvailability() {
    return this.seats > 0 && this.date >= new Date();
  }
}

let events = [
  new Event("Music Festival", "2025-07-15", 100, "Music", "City Park", 20, "images/music.jpg"),
  new Event("Cooking Workshop", "2025-06-10", 0, "Workshop", "Community Center", 10, "images/cooking.jpg"),
  new Event("Art Exhibition", "2025-05-30", 15, "Art", "Gallery", 5, "images/art.jpg"),
  new Event("Tech Meetup", "2025-08-05", 50, "Tech", "Library", 0, "images/tech.jpg"),
];

// Task 3: Filter only upcoming with seats
function getAvailableEvents() {
  return events.filter(event => event.checkAvailability());
}

// Task 4: Functions for adding, registering, filtering
function addEvent(newEvent) {
  events.push(newEvent);
}

let registrationsByCategory = {};
function registerUser(eventName) {
  try {
    let event = events.find(e => e.name === eventName);
    if (!event) throw new Error("Event not found.");
    if (!event.checkAvailability()) throw new Error("No seats available or event passed.");

    event.seats--;
    // Track registrations by category using closure
    registrationsByCategory[event.category] = (registrationsByCategory[event.category] || 0) + 1;
    console.log(`Registered for ${eventName}. Seats left: ${event.seats}`);
    renderEvents(events);
    alert(`Registration successful for ${eventName}!`);
  } catch (error) {
    alert(`Registration failed: ${error.message}`);
  }
}

function filterEventsByCategory(category, callback) {
  let filtered = category === "All" ? events : events.filter(e => e.category === category);
  callback(filtered);
}

// Task 7: DOM Manipulation - Render Events dynamically
const eventsContainer = document.getElementById("eventsContainer");

function renderEvents(eventList) {
  if (!eventsContainer) return;
  eventsContainer.innerHTML = "";

  eventList.forEach(event => {
    if (!event.checkAvailability()) return;

    let card = document.createElement("div");
    card.className = "eventCard";

    card.innerHTML = `
      <h3>${event.name}</h3>
      <img src="${event.img}" alt="${event.name}" title="${event.name}" class="eventImage"/>
      <p><strong>Date:</strong> ${event.date.toDateString()}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Fee:</strong> $${event.fee}</p>
      <p><strong>Seats Available:</strong> ${event.seats}</p>
      <button class="registerBtn" data-event="${event.name}">Register</button>
    `;

    eventsContainer.appendChild(card);
  });

  // Attach event listeners to buttons
  document.querySelectorAll(".registerBtn").forEach(button => {
    button.onclick = () => {
      const eventName = button.getAttribute("data-event");
      registerUser(eventName);
    };
  });
}

// Task 8: Event Handling for filter & search
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");

if (categoryFilter) {
  categoryFilter.onchange = function () {
    const selected = this.value;
    filterEventsByCategory(selected, filtered => renderEvents(filtered));
  };
}

if (searchInput) {
  searchInput.onkeydown = function (e) {
    let query = e.target.value.toLowerCase();
    let filtered = events.filter(ev => ev.name.toLowerCase().includes(query));
    renderEvents(filtered);
  };
}

// Task 9 & 12: Async fetch simulation
function fetchEventsMock() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (events.length > 0) resolve(events);
      else reject("No events available");
    }, 1500);
  });
}

async function loadEvents() {
  try {
    showLoading(true);
    const data = await fetchEventsMock();
    renderEvents(data);
  } catch (error) {
    alert(error);
  } finally {
    showLoading(false);
  }
}

function showLoading(show) {
  const loadingEl = document.getElementById("loading");
  if (!loadingEl) return;
  loadingEl.style.display = show ? "block" : "none";
}

// Task 11: Form handling and validation
const regForm = document.getElementById("registrationForm");
if (regForm) {
  regForm.onsubmit = function (e) {
    e.preventDefault();

    const name = this.elements["name"].value.trim();
    const email = this.elements["email"].value.trim();
    const eventSelect = this.elements["eventType"].value;

    if (!name || !email || !eventSelect) {
      alert("Please fill all required fields.");
      return;
    }

    // Simple email regex for demo
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    registerUser(eventSelect);

    this.reset();
  };
}

// Task 14: jQuery example for fadeIn/fadeOut event cards
$(document).ready(function () {
  $(".eventCard").hide().fadeIn(1000);
});

// Bonus: Save and load preferred event type using localStorage
function preselectEventType() {
  const saved = localStorage.getItem("preferredEventType");
  if (saved && categoryFilter) {
    categoryFilter.value = saved;
    filterEventsByCategory(saved, filtered => renderEvents(filtered));
  }
}

if (categoryFilter) {
  categoryFilter.onchange = function () {
    localStorage.setItem("preferredEventType", this.value);
    filterEventsByCategory(this.value, filtered => renderEvents(filtered));
  };
}
