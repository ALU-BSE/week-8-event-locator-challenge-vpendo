// Our events data structure - using the data from your existing code
const events = {
    music: [
        { id: 101, title: "Monsters of Rock Cruise 2025", date: "2025-02-09", location: "Great Stirrup Cay, The Bahamas", description: "A rock music festival on the high seas." },
        { id: 102, title: "Reggae Rise Up Florida 2025", date: "2025-03-13", location: "St. Petersburg, FL", description: "A celebration of reggae music and culture." },
        { id: 103, title: "Rolling Loud Cali 2025", date: "2025-03-14", location: "Los Angeles, CA", description: "The biggest hip-hop festival in California." },
        { id: 104, title: "Baila Conmigo 2025", date: "2025-03-21", location: "Miami, FL", description: "A Latin music and dance festival." },
        { id: 105, title: "Hells Heroes Festival 2025", date: "2025-03-28", location: "Houston, TX", description: "A heavy metal music festival." },
        { id: 106, title: "Suwannee Spring Reunion 2025", date: "2025-04-18", location: "Live Oak, FL", description: "A bluegrass and folk music gathering." },
        { id: 107, title: "Arizona Jazz Fest 2025", date: "2025-04-25", location: "Arizona, USA", description: "A premier jazz festival in Arizona." }
    ],
    sport: [
        { id: 201, title: "2025 Final Four", date: "2025-04-05", location: "Alamodome, San Antonio, TX", description: "NCAA basketball championship." },
        { id: 202, title: "2025 Masters", date: "2025-04-07", location: "Augusta National Golf Club, Augusta, GA", description: "The most prestigious golf tournament." },
        { id: 203, title: "2025 Miami Grand Prix", date: "2025-05-02", location: "Miami International Autodrome, Miami, FL", description: "Formula 1 race in Miami." },
        { id: 204, title: "2025 Kentucky Derby", date: "2025-05-03", location: "Churchill Downs, Louisville, KY", description: "The greatest two minutes in sports." },
        { id: 205, title: "2025 Preakness Stakes", date: "2025-05-17", location: "Pimlico Race Course, Baltimore, MD", description: "A major horse racing event." },
        { id: 206, title: "2025 Monaco Grand Prix", date: "2025-05-23", location: "Monte Carlo, Monaco", description: "The most famous Formula 1 race." },
        { id: 207, title: "2025 Indianapolis 500", date: "2025-05-23", location: "Indianapolis, IN", description: "The biggest IndyCar race of the year." },
        { id: 208, title: "2025 Champions League Final", date: "2025-05-31", location: "Allianz Arena, Munich, Germany", description: "The UEFA Champions League Final." },
        { id: 209, title: "2025 Spanish Grand Prix", date: "2025-06-02", location: "Barcelona, Spain", description: "A thrilling Formula 1 race in Spain." }
    ],
    technology: [
        { id: 301, title: "Black Hat USA", date: "2025-07-31", location: "Las Vegas, NV", description: "A cybersecurity conference for professionals." },
        { id: 302, title: "VMware Explore US", date: "2025-08-26", location: "San Francisco, CA", description: "A deep dive into cloud and virtualization tech." },
        { id: 303, title: "Cyber Security Summit", date: "2025-09-12", location: "New York, NY", description: "A high-level security event for professionals." },
        { id: 304, title: "Deep Learning Summit", date: "2025-10-15", location: "Boston, MA", description: "AI and deep learning conference." },
        { id: 305, title: "Open Data Science Conference", date: "2025-11-04", location: "San Francisco, CA", description: "An event for data scientists and AI experts." }
    ],
    politics: [
        { id: 401, title: "World Experience Summit (WXO)", date: "2025-04-29", location: "London, UK", description: "Exploring global experiences and policies." },
        { id: 402, title: "C2 Montréal", date: "2025-05-20", location: "Montreal, Canada", description: "A creative business conference." },
        { id: 403, title: "Future of Everything Festival", date: "2025-05-28", location: "New York, NY", description: "Discussing the future of business and politics." },
        { id: 404, title: "Web Summit", date: "2025-05-27", location: "Vancouver, Canada", description: "A massive tech and political networking event." },
        { id: 405, title: "SXSW London", date: "2025-06-02", location: "London, UK", description: "A mix of tech, politics, and culture." },
        { id: 406, title: "HubSpot INBOUND", date: "2025-09-03", location: "San Francisco, CA", description: "A business and marketing-focused summit." }
    ]
};

// Get all events in a flat array
function getAllEvents() {
    let allEvents = [];
    for (const category in events) {
        events[category].forEach(event => {
            // Add category to each event
            allEvents.push({...event, category: category});
        });
    }
    return allEvents;
}

// Get featured events (one from each category)
function getFeaturedEvents() {
    let featured = [];
    for (const category in events) {
        if (events[category].length > 0) {
            const featuredEvent = {...events[category][0], category: category};
            featured.push(featuredEvent);
        }
    }
    return featured;
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