document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    const categoryParam = urlParams.get('category');
    
    // Set initial filters from URL parameters
    if (cityParam) {
        document.getElementById('cityFilter').value = cityParam;
    }
    
    if (categoryParam && events[categoryParam]) {
        document.getElementById('categorySelect').value = categoryParam;
    }
    
    // Event listeners
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('categorySelect').addEventListener('change', displayEvents);
    
    // Initialize display
    displayEvents();
});

// Function to display filtered events
function displayEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    const noEventsMessage = document.getElementById('noEventsMessage');
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value;
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
    
    // Get events for the selected category
    const categoryEvents = events[selectedCategory] || [];
    
    // Clear previous events
    eventsContainer.innerHTML = "";
    
    // Filter events if search term exists
    let filteredEvents = categoryEvents;
    if (searchTerm) {
        filteredEvents = categoryEvents.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply additional filters
    filteredEvents = applyAdditionalFilters(filteredEvents);
    
    if (filteredEvents.length === 0) {
        // Show "no events" message
        noEventsMessage.classList.remove('d-none');
        return;
    }
    
    // Hide "no events" message
    noEventsMessage.classList.add('d-none');
    
    // Display filtered events
    filteredEvents.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.className = "col-md-4 mb-4";
        eventCard.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${formatDate(event.date)}</h6>
                    <p class="card-text">${event.location}</p>
                    <p class="card-text">${event.description}</p>
                    <a href="event-details.html?id=${event.id}&category=${selectedCategory}" class="btn btn-primary btn-sm">View Details</a>
                </div>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Function to apply all filters
function applyFilters() {
    displayEvents();
}

// Function to apply additional filters (city and date)
function applyAdditionalFilters(eventsList) {
    const cityFilter = document.getElementById('cityFilter').value.trim().toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value;
    
    return eventsList.filter(event => {
        // Apply city filter if specified
        if (cityFilter && !event.location.toLowerCase().includes(cityFilter)) {
            return false;
        }
        
        // Apply date filter if specified
        if (dateFilter && event.date !== dateFilter) {
            return false;
        }
        
        return true;
    });
}

// Helper function to format date
function formatDate(dateString) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}