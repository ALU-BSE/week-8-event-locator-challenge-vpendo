document.addEventListener('DOMContentLoaded', function() {
    // Load featured events on the home page
    loadFeaturedEvents();
    
    // Event listeners
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    
    // Add event listeners to category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
});

// Function to load featured events on the home page
function loadFeaturedEvents() {
    const featuredEventsContainer = document.getElementById('featuredEvents');
    const featuredEvents = getFeaturedEvents();
    
    if (featuredEvents.length === 0) {
        featuredEventsContainer.innerHTML = '<div class="col-12 text-center"><p>No featured events at this time.</p></div>';
        return;
    }
    
    let eventsHTML = '';
    
    featuredEvents.forEach(event => {
        eventsHTML += `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="card event-card h-100">
                    <div class="event-image">
                        ${event.category.toUpperCase()}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">
                            <small class="text-muted">
                                <i class="bi bi-calendar"></i> ${formatDate(event.date)}
                            </small>
                        </p>
                        <p class="card-text">
                            <small class="text-muted">
                                <i class="bi bi-geo-alt"></i> ${event.location}
                            </small>
                        </p>
                        <span class="badge bg-primary category-badge">${event.category}</span>
                    </div>
                    <div class="card-footer">
                        <a href="event-details.html?id=${event.id}&category=${event.category}" class="btn btn-primary btn-sm">View Details</a>
                    </div>
                </div>
            </div>
        `;
    });
    
    featuredEventsContainer.innerHTML = eventsHTML;
}

// Function to handle search button click
function handleSearch() {
    const cityInput = document.getElementById('citySearch').value.trim();
    
    if (cityInput) {
        // Redirect to events page with city parameter
        window.location.href = `events.html?city=${encodeURIComponent(cityInput)}`;
    } else {
        // If no city is entered, just go to events page
        window.location.href = 'events.html';
    }
}

// Function to handle category card click
function handleCategoryClick(e) {
    const category = e.currentTarget.dataset.category;
    window.location.href = `events.html?category=${encodeURIComponent(category)}`;
}

// Helper function to format date
function formatDate(dateString) {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}