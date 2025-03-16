// event-details.js - Script to populate event details page

document.addEventListener('DOMContentLoaded', function() {
    // Get the event ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id'));
    const category = urlParams.get('category');
    
    // If no event ID or category is provided, show error
    if (!eventId || !category) {
        showEventNotFound();
        return;
    }
    
    // Fetch event data
    const event = findEventById(eventId, category);
    
    // If event not found, show error
    if (!event) {
        showEventNotFound();
        return;
    }
    
    // Populate event details
    populateEventDetails(event);
    
    // Start countdown timer
    startCountdown(event.date);
    
    // Load similar events
    loadSimilarEvents(event);
    
    // Handle registration form submission
    document.getElementById('submitRegistration').addEventListener('click', function() {
        handleRegistration(event);
    });
});

/**
 * Find event by ID from the events data
 * @param {number} id - Event ID
 * @param {string} category - Event category
 * @returns {Object|null} - Event object or null if not found
 */
function findEventById(id, category) {
    // Check if the category exists in our events data
    if (!events[category]) {
        return null;
    }
    
    // Find the event in the specified category
    const event = events[category].find(event => event.id === id);
    
    // If event is found, add the category to the event object
    if (event) {
        return {...event, category: category};
    }
    
    return null;
}

/**
 * Show event not found message
 */
function showEventNotFound() {
    document.getElementById('loadingSpinner').classList.add('d-none');
    document.getElementById('eventNotFound').classList.remove('d-none');
}

/**
 * Populate event details on the page
 * @param {Object} event - Event object
 */
function populateEventDetails(event) {
    // Hide loading spinner and show content
    document.getElementById('loadingSpinner').classList.add('d-none');
    document.getElementById('eventDetailsContent').classList.remove('d-none');
    
    // Set page title
    document.title = `${event.title} - Event Locator`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-event-title').textContent = event.title;
    
    // Generate placeholder image URL based on event category and ID
    const placeholderImage = generatePlaceholderImage(event.category);
    
    // Populate event details
    document.getElementById('eventImage').src = event.image || placeholderImage;
    document.getElementById('eventImage').alt = event.title;
    document.getElementById('eventCategoryBadge').textContent = capitalizeFirstLetter(event.category);
    document.getElementById('eventTitle').textContent = event.title;
    
    // Format date
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('eventDate').textContent = formattedDate;
    
    // Format time - use default time if not specified in the event data
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('eventDateTime').textContent = `${formattedDate} at ${formattedTime}`;
    
    // Description - Use the event description or a default message if it's too short
    const descriptionHTML = event.description.length > 30 
        ? `<p>${event.description}</p>` 
        : `<p>${event.description}</p><p>Join us for this amazing ${event.category} event in ${getCity(event.location)}. Don't miss out on one of the most anticipated ${event.category} events of the year!</p>`;
    
    document.getElementById('eventDescription').innerHTML = descriptionHTML;
    
    // Location
    const city = getCity(event.location);
    document.getElementById('eventLocation').textContent = event.location;
    document.getElementById('eventLocationAddress').textContent = event.location;
    document.getElementById('eventLocationCity').textContent = city;
    
    // Category
    document.getElementById('eventCategory').textContent = capitalizeFirstLetter(event.category);
    
    // Update social sharing links
    updateSocialShareLinks(event);
}

/**
 * Generate a placeholder image URL based on event category
 * @param {string} category - Event category
 * @returns {string} - Placeholder image URL
 */
function generatePlaceholderImage(category) {
    // Map categories to image URLs
    const categoryImages = {
        music: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_pCjFI4N7zz0ZCzYsqGFIPp3XJdDNIn3b4L7KVoKQ24_ep9inKCTdkMN_TFW7uaecmk&usqp=CAU",
        sport: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlI4wkylAYJupwQ5ugin3eYai23fAXvA5ERQ&s",
        technology: "https://meetings.skift.com/wp-content/uploads/2017/01/12-events-that-understand-the-use-of-technology.jpg",
        politics: "https://www.psa.ac.uk/sites/default/files/styles/scale-620-wide/public/Western%20politics.jpg?itok=e48f4gj9"
    };
    
    // Return appropriate image or default
    return categoryImages[category] || "https://placehold.co/800x400/95a5a6/ffffff?text=Event";
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Update social sharing links
 * @param {Object} event - Event object
 */
function updateSocialShareLinks(event) {
    const eventUrl = encodeURIComponent(window.location.href);
    const eventTitle = encodeURIComponent(event.title);
    
    const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${eventUrl}`;
    const twitterShareLink = `https://twitter.com/intent/tweet?text=${eventTitle}&url=${eventUrl}`;
    const emailShareLink = `mailto:?subject=${eventTitle}&body=Check out this event: ${eventUrl}`;
    
    const socialLinks = document.querySelectorAll('.social-share a');
    socialLinks[0].href = fbShareLink;
    socialLinks[1].href = twitterShareLink;
    socialLinks[2].href = emailShareLink;
}

/**
 * Start countdown timer
 * @param {string} eventDateString - Event date string
 */
function startCountdown(eventDateString) {
    const eventDate = new Date(eventDateString);
    
    // Set default time to 19:00 (7 PM) if only date is provided
    if (eventDate.getHours() === 0 && eventDate.getMinutes() === 0) {
        eventDate.setHours(19, 0, 0);
    }
    
    // Update countdown every second
    const countdownInterval = setInterval(function() {
        const now = new Date();
        const distance = eventDate - now;
        
        // If event date has passed, clear interval and show "Event Passed" message
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdownContainer').innerHTML = '<div class="alert alert-warning">This event has already passed.</div>';
            return;
        }
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update countdown display
        document.getElementById('countDays').textContent = days;
        document.getElementById('countHours').textContent = hours;
        document.getElementById('countMins').textContent = minutes;
        document.getElementById('countSecs').textContent = seconds;
    }, 1000);
}

/**
 * Load similar events
 * @param {Object} currentEvent - Current event object
 */
function loadSimilarEvents(currentEvent) {
    // Get events in the same category, excluding the current event
    const sameCategory = events[currentEvent.category] || [];
    const similarEvents = sameCategory
        .filter(event => event.id !== currentEvent.id)
        .slice(0, 3); // Limit to 3 similar events
    
    const similarEventsList = document.getElementById('similarEventsList');
    
    // Clear existing content
    similarEventsList.innerHTML = '';
    
    // If no similar events found
    if (similarEvents.length === 0) {
        similarEventsList.innerHTML = '<li class="list-group-item">No similar events found.</li>';
        return;
    }
    
    // Add similar events to the list
    similarEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        
        // Generate placeholder image
        const placeholderImage = generatePlaceholderImage(currentEvent.category);
        
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <a href="event-details.html?id=${event.id}&category=${currentEvent.category}" class="similar-event text-decoration-none">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <img src="${event.image || placeholderImage}" alt="${event.title}" class="similar-event-img rounded" style="width: 60px; height: 60px; object-fit: cover;">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-1 text-primary">${event.title}</h6>
                        <p class="mb-0 small text-muted"><i class="bi bi-calendar-event me-1"></i>${formattedDate}</p>
                        <p class="mb-0 small text-muted text-truncate"><i class="bi bi-geo-alt me-1"></i>${event.location}</p>
                    </div>
                </div>
            </a>
        `;
        similarEventsList.appendChild(listItem);
    });
}

/**
 * Handle registration form submission
 * @param {Object} event - Event object
 */
function handleRegistration(event) {
    const form = document.getElementById('registrationForm');
    const formElements = form.elements;
    
    // Check if form is valid
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    // Collect form data
    const formData = {
        eventId: event.id,
        eventCategory: event.category,
        eventTitle: event.title,
        fullName: formElements.fullName.value,
        email: formElements.email.value,
        phone: formElements.phone.value,
        attendees: formElements.attendees.value,
        comments: formElements.comments.value
    };
    
    // In a real application, you would send this data to a server
    console.log('Registration submitted:', formData);
    
    // Show success message
    const modalBody = document.querySelector('#registerModal .modal-body');
    modalBody.innerHTML = `
        <div class="alert alert-success">
            <h5>Registration Successful!</h5>
            <p>Thank you, ${formData.fullName}! Your registration for "${event.title}" has been received.</p>
            <p>We've sent a confirmation email to ${formData.email}.</p>
        </div>
    `;
    
    // Change modal footer
    const modalFooter = document.querySelector('#registerModal .modal-footer');
    modalFooter.innerHTML = `
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
    `;
}

// Parse city from location string
function getCity(location) {
    // This is a simple implementation - might need to be more sophisticated
    const parts = location.split(',');
    if (parts.length >= 2) {
        return parts[0].trim();
    }
    return location;
}