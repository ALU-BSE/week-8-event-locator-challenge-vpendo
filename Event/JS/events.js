document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get('city');
    const categoryParam = urlParams.get('category');
    const dateParam = urlParams.get('date');
    
    // Set initial filters from URL parameters
    if (cityParam) {
        document.getElementById('cityFilter').value = cityParam;
    }
    
    if (dateParam) {
        document.getElementById('dateFilter').value = dateParam;
    }
    
    if (categoryParam) {
        document.getElementById('categorySelect').value = categoryParam;
    }
    
    // Event listeners for home page elements if they exist
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const city = document.getElementById('citySearch').value;
            const date = document.getElementById('dateFilter').value;
            const category = document.getElementById('categoryFilter').value;
            
            // Redirect to events page with parameters
            let url = 'events.html';
            const params = new URLSearchParams();
            
            if (city) params.append('city', city);
            if (date) params.append('date', date);
            if (category) params.append('category', category);
            
            if (params.toString()) {
                url += '?' + params.toString();
            }
            
            window.location.href = url;
        });
    }

    // Category cards on homepage
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            window.location.href = `events.html?category=${category}`;
        });
    });

    // Populate featured events on homepage
    const featuredEvents = document.getElementById('featuredEvents');
    if (featuredEvents) {
        const featured = getFeaturedEvents();
        featured.forEach(event => {
            const eventEl = createEventCard(event);
            featuredEvents.appendChild(eventEl);
        });
    }
    
    // Event listeners for events page
    if (document.getElementById('applyFilters')) {
        document.getElementById('applyFilters').addEventListener('click', applyFilters);
        document.getElementById('resetFilters').addEventListener('click', resetFilters);
        document.getElementById('sortSelect').addEventListener('change', applyFilters);
        document.getElementById('searchInput').addEventListener('input', applyFilters);
        
        // Initialize display on events page
        displayEvents();
    }
});

// Function to display filtered events
function displayEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    const noEventsMessage = document.getElementById('noEventsMessage');
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategory = categorySelect.value;
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const sortSelect = document.getElementById('sortSelect');
    const sortOption = sortSelect.value;
    
    // Clear previous events
    eventsContainer.innerHTML = "";
    
    // Get all events
    let filteredEvents = getAllEvents();
    
    // Filter by category if selected
    if (selectedCategory) {
        filteredEvents = filteredEvents.filter(event => event.category === selectedCategory);
    }
    
    // Filter by search term if exists
    if (searchTerm) {
        filteredEvents = filteredEvents.filter(event =>
            event.title.toLowerCase().includes(searchTerm) ||
            event.location.toLowerCase().includes(searchTerm) ||
            event.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply additional filters (city and date)
    filteredEvents = applyAdditionalFilters(filteredEvents);
    
    // Sort events
    sortEvents(filteredEvents, sortOption);
    
    // Update event count
    document.getElementById('eventCount').textContent = filteredEvents.length;
    
    if (filteredEvents.length === 0) {
        // Show "no events" message
        noEventsMessage.classList.remove('d-none');
        return;
    }
    
    // Hide "no events" message
    noEventsMessage.classList.add('d-none');
    
    // Display filtered events
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

// Create event card element
function createEventCard(event) {
    const cardCol = document.createElement("div");
    cardCol.className = "col-md-6 col-lg-4 mb-4";
    
    // Get category color class
    const categoryColorClass = getCategoryColorClass(event.category);
    
    cardCol.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">${event.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${formatDate(event.date)}</h6>
                <p class="card-text"><strong>Location:</strong> ${event.location}</p>
                <p class="card-text">${event.description}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="badge ${categoryColorClass}">${capitalizeFirstLetter(event.category)}</span>
                    <a href="event-details.html?id=${event.id}&category=${event.category}" class="btn btn-primary btn-sm">View Details</a>
                </div>
            </div>
        </div>
    `;
    return cardCol;
}

// Function to apply all filters
function applyFilters() {
    displayEvents();
}

// Function to reset all filters
function resetFilters() {
    document.getElementById('cityFilter').value = '';
    document.getElementById('dateFilter').value = '';
    document.getElementById('categorySelect').value = '';
    document.getElementById('searchInput').value = '';
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

// Sort events based on selected option
function sortEvents(events, sortOption) {
    switch (sortOption) {
        case 'date-asc':
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            events.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'name-asc':
            events.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-desc':
            events.sort((a, b) => b.title.localeCompare(a.title));
            break;
    }
}

// Helper function to format date
function formatDate(dateString) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Helper function to get category color class
function getCategoryColorClass(category) {
    switch (category) {
        case 'music':
            return 'bg-primary';
        case 'sport':
            return 'bg-success';
        case 'technology':
            return 'bg-info';
        case 'politics':
            return 'bg-warning';
        default:
            return 'bg-secondary';
    }
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}