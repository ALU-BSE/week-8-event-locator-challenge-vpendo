document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
    const category = urlParams.get('category');
    
    if (eventId && category) {
        // Load event details
        loadEventDetails(parseInt(eventId), category);
    } else {
        // Show error message if parameters are missing
        document.getElementById('eventNotFound').classList.remove('d-none');
    }
});

// Function to load event details
function loadEventDetails(eventId, category) {
    // Find the event in the specified category
    const event = events[category]?.find(event => event.id === eventId);
    
    if (!event) {
        // Show error message if event is not found
        document.getElementById('eventNotFound').classList.remove('d-none');
        return;
    }
    
    // Populate event details
    const eventDetailsContainer = document.getElementById('eventDetailsContainer');
    eventDetailsContainer.innerHTML = `
        <div class="event-image">
            ${category.toUpperCase()} EVENT
        </div>
        <h1>${event.title}</h1>
        <div class="event-meta">
            <span><i class="bi bi-calendar"></i> ${formatDate(event.date)}</span>
            <span><i class="bi bi-geo-alt"></i> ${event.location}</span>
            <span><i class="bi bi-tag"></i> ${category}</span>
        </div>
        <div class="event-description">
            <h3>About This Event</h3>
            <p>${event.description}</p>
        </div>
    `;
    
    // Populate event info
    const eventInfoContainer = document.getElementById('eventInfoContainer');
    eventInfoContainer.innerHTML = `
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <strong>Date:</strong> ${formatDate(event.date)}
            </li>
            <li class="list-group-item">
                <strong>Location:</strong> ${event.location}
            </li>
            <li class="list-group-item">
                <strong>Category:</strong> ${category}
            </li>
        </ul>
    `;
}