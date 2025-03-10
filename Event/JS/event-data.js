// Sample events data
const eventsData = [
    {
        id: 1,
        name: "Summer Music Festival",
        description: "Join us for a weekend of amazing live music performances from top artists across multiple genres. Enjoy food vendors, art installations, and more in this annual celebration of music and community.",
        date: "2024-07-15",
        time: "12:00 PM - 10:00 PM",
        location: "Central Park",
        city: "New York",
        category: "music",
        price: "$45.00",
        image: "https://via.placeholder.com/300x200?text=Summer+Music+Festival",
        organizer: "NYC Events Co.",
        highlights: [
            "Live performances from 15+ artists",
            "3 stages with different music genres",
            "Food and beverage vendors",
            "Art installations and interactive exhibits",
            "Family-friendly activities area"
        ]
    },
    {
        id: 2,
        name: "Tech Innovation Summit",
        description: "The Tech Innovation Summit brings together industry leaders, entrepreneurs, and developers to explore cutting-edge technologies and discuss the future of innovation. Network with peers and learn from expert speakers.",
        date: "2024-06-10",
        time: "9:00 AM - 5:00 PM",
        location: "Tech Conference Center",
        city: "San Francisco",
        category: "tech",
        price: "$120.00",
        image: "https://via.placeholder.com/300x200?text=Tech+Innovation+Summit",
        organizer: "TechForward Group",
        highlights: [
            "Keynote speeches from tech industry leaders",
            "Panel discussions on emerging technologies",
            "Hands-on workshops and demonstrations",
            "Networking sessions with industry professionals",
            "Startup showcase and pitch competitions"
        ]
    },
    {
        id: 3,
        name: "Basketball Championship Finals",
        description: "Witness the exciting conclusion to this year's basketball season as the top two teams compete for the championship title. Expect high-energy gameplay, halftime entertainment, and an electric atmosphere.",
        date: "2024-05-28",
        time: "7:30 PM - 10:00 PM",
        location: "Sports Arena",
        city: "Chicago",
        category: "sports",
        price: "$75.00",
        image: "https://via.placeholder.com/300x200?text=Basketball+Championship",
        organizer: "National Basketball Association",
        highlights: [
            "Championship game between top teams",
            "Pre-game fan activities and contests",
            "Halftime entertainment show",
            "Post-game award ceremony",
            "Exclusive merchandise available"
        ]
    },
    {
        id: 4,
        name: "Modern Art Exhibition",
        description: "Explore a diverse collection of contemporary art pieces from both established and emerging artists. This exhibition challenges conventional perspectives and showcases innovative approaches to modern artistic expression.",
        date: "2024-08-05",
        time: "10:00 AM - 6:00 PM",
        location: "Metropolitan Art Gallery",
        city: "New York",
        category: "arts",
        price: "$18.00",
        image: "https://via.placeholder.com/300x200?text=Modern+Art+Exhibition",
        organizer: "Arts Council of New York",
        highlights: [
            "Over 100 contemporary art pieces",
            "Guided tours available throughout the day",
            "Artist talks and demonstrations",
            "Interactive art installations",
            "Exhibition catalog available for purchase"
        ]
    },
    {
        id: 5,
        name: "Food & Wine Festival",
        description: "Indulge in a culinary adventure featuring tastings from top restaurants, wine sampling, cooking demonstrations, and food workshops. Meet renowned chefs and discover new flavors from around the world.",
        date: "2024-09-20",
        time: "11:00 AM - 8:00 PM",
        location: "Waterfront Park",
        city: "Miami",
        category: "food",
        price: "$60.00",
        image: "https://via.placeholder.com/300x200?text=Food+and+Wine+Festival",
        organizer: "Culinary Arts Foundation",
        highlights: [
            "Tastings from over 40 restaurants",
            "Wine and craft beer sampling",
            "Live cooking demonstrations by celebrity chefs",
            "Culinary workshops and classes",
            "Artisanal food marketplace"
        ]
    },
    {
        id: 6,
        name: "Web Development Conference",
        description: "Stay ahead of the curve in web development trends and technologies. This conference offers workshops, coding sessions, and talks from industry experts on the latest frameworks, tools, and best practices.",
        date: "2024-07-22",
        time: "9:00 AM - 6:00 PM",
        location: "Digital Innovation Center",
        city: "Seattle",
        category: "tech",
        price: "$95.00",
        image: "https://via.placeholder.com/300x200?text=Web+Development+Conference",
        organizer: "Web Developers Association",
        highlights: [
            "Expert talks on frontend and backend technologies",
            "Hands-on workshops for practical skill development",
            "Code review sessions and mentoring",
            "Networking opportunities with industry professionals",
            "Job fair with tech companies"
        ]
    },
    {
        id: 7,
        name: "Marathon for Charity",
        description: "Participate in this annual marathon to support local healthcare initiatives. Runners of all experience levels are welcome to join this community event that raises funds for an important cause.",
        date: "2024-06-05",
        time: "7:00 AM - 12:00 PM",
        location: "Riverside Drive",
        city: "Boston",
        category: "sports",
        price: "$25.00",
        image: "https://via.placeholder.com/300x200?text=Marathon+for+Charity",
        organizer: "Health Foundation",
        highlights: [
            "5K, 10K, and full marathon options",
            "Fundraising opportunities for participants",
            "Professional timing and race support",
            "Post-race celebration with food and music",
            "Medal for all finishers"
        ]
    },
    {
        id: 8,
        name: "Jazz in the Park",
        description: "Relax and enjoy smooth jazz performances in a beautiful outdoor setting. Bring a blanket, pack a picnic, and unwind with friends and family while listening to talented jazz musicians.",
        date: "2024-08-12",
        time: "5:00 PM - 9:00 PM",
        location: "Sunset Park",
        city: "Los Angeles",
        category: "music",
        price: "Free",
        image: "https://via.placeholder.com/300x200?text=Jazz+in+the+Park",
        organizer: "LA Parks & Recreation",
        highlights: [
            "Live performances from local jazz artists",
            "Family-friendly environment",
            "Food trucks and vendors available",
            "Picnic areas and seating",
            "Beautiful sunset views"
        ]
    },
    {
        id: 9,
        name: "Photography Workshop",
        description: "Learn essential photography techniques from professional photographers. This hands-on workshop covers composition, lighting, editing, and more to help you take your photography skills to the next level.",
        date: "2024-07-08",
        time: "10:00 AM - 4:00 PM",
        location: "Creative Arts Center",
        city: "Portland",
        category: "arts",
        price: "$75.00",
        image: "https://via.placeholder.com/300x200?text=Photography+Workshop",
        organizer: "Visual Arts Association",
        highlights: [
            "Instruction from award-winning photographers",
            "Hands-on practice sessions",
            "Composition and lighting techniques",
            "Photo editing workflow demonstrations",
            "Portfolio review and feedback"
        ]
    },
    {
        id: 10,
        name: "Craft Beer Festival",
        description: "Sample a wide variety of craft beers from local and regional breweries. Meet brewers, learn about brewing processes, and enjoy food pairings that complement different beer styles.",
        date: "2024-09-15",
        time: "2:00 PM - 8:00 PM",
        location: "Downtown Brewery District",
        city: "Denver",
        category: "food",
        price: "$35.00",
        image: "https://via.placeholder.com/300x200?text=Craft+Beer+Festival",
        organizer: "Brewers Association",
        highlights: [
            "Tastings from over 30 craft breweries",
            "Meet-and-greet with brewmasters",
            "Beer and food pairing demonstrations",
            "Live music entertainment",
            "Commemorative tasting glass included"
        ]
    },
    {
        id: 11,
        name: "Artificial Intelligence Symposium",
        description: "Join academic researchers and industry professionals for discussions on the latest advancements and ethical considerations in artificial intelligence and machine learning.",
        date: "2024-08-20",
        time: "9:00 AM - 5:00 PM",
        location: "University Conference Center",
        city: "Austin",
        category: "tech",
        price: "$85.00",
        image: "https://via.placeholder.com/300x200?text=AI+Symposium",
        organizer: "AI Research Consortium",
        highlights: [
            "Keynote addresses from AI pioneers",
            "Research presentations and papers",
            "Ethics in AI panel discussions",
            "Demonstrations of cutting-edge AI applications",
            "Networking with researchers and practitioners"
        ]
    },
    {
        id: 12,
        name: "Classical Music Concert",
        description: "Experience the magnificent sound of a full orchestra performing classical masterpieces. This evening concert features works by Mozart, Beethoven, and Tchaikovsky in an acoustically perfect venue.",
        date: "2024-06-18",
        time: "7:00 PM - 9:30 PM",
        location: "Symphony Hall",
        city: "Chicago",
        category: "music",
        price: "$55.00",
        image: "https://via.placeholder.com/300x200?text=Classical+Concert",
        organizer: "City Symphony Orchestra",
        highlights: [
            "World-class orchestra performance",
            "Program featuring classical masterpieces",
            "Guest soloist appearance",
            "Pre-concert talk with the conductor",
            "Elegant venue with exceptional acoustics"
        ]
    }
];