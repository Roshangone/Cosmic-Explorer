// Import the API_KEY from the .env file
// DO NOT hardcode an API key, the following key is used for time being
const API_KEY = "0nsfiKc7ddxOAuWcoz6NvaX5suSk3ZsyofdZSQAC";
const navButtons = document.querySelectorAll('nav button');
const sections = document.querySelectorAll('.section-content');

// Function to show a specific section and hide others
const mainContainer = document.getElementById('main-container');

function showSection(id) {
    mainContainer.classList.remove('hidden');
    
    sections.forEach(section => {
        if (section.id === id) {
            section.classList.add('active');
            // Smoothly scroll to the top of the section
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            section.classList.remove('active');
        }
    });
}

// Add event listeners to navigation buttons
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sectionId = button.id.replace('btn-', '') + '-section';
        showSection(sectionId);
        
        // Load data based on the button clicked
        if (button.id === 'btn-apod') {
            const selectedDate = document.getElementById('apod-date').value;
            loadAPOD(selectedDate);
        } else if (button.id === 'btn-rover') {
            loadRoverPhotos();
        } else if (button.id === 'btn-asteroids') {
            loadAsteroids();
        }
    });
});

// ----- Astronomy Picture of the Day (APOD) -----
const apodDateInput = document.getElementById('apod-date');
const loadApodBtn = document.getElementById('load-apod');
const apodContent = document.getElementById('apod-content');

loadApodBtn.addEventListener('click', () => {
    const selectedDate = apodDateInput.value;
    if (selectedDate) {
        loadAPOD(selectedDate);
    } else {
        // apodContent.innerHTML = `<p class="text-red-400">Please select a date.</p>`;
            loadAPOD(today);
    }
});

// Load APOD function
async function loadAPOD(date) {
    apodContent.innerHTML = `<div class="loading-spinner w-10 h-10 border-4 border-gray-600 rounded-full mx-auto"></div>`;
    try {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.msg || 'API request failed. Please check your API key or try again later.');
        }
        const data = await res.json();
        
        let contentHTML = `
            <h3 class="text-2xl font-bold mt-4 text-sky-300">${data.title}</h3>
        `;

        // Handle video and image content
        if (data.media_type === "video") {
            contentHTML += `
                <iframe class="w-full aspect-video rounded-lg mt-4" src="${data.url}" frameborder="0" allowfullscreen></iframe>
                <p class="mt-4 text-gray-400">${data.explanation}</p>
            `;
        } else {
            contentHTML += `
                <img class="w-full max-w-2xl mx-auto rounded-lg shadow-xl mt-4" src="${data.url}" alt="${data.title}" onerror="this.src='https://placehold.co/600x400?text=Image+Not+Available';">
                <p class="mt-4 text-gray-400 text-left p-2 md:p-0">${data.explanation}</p>
            `;
        }

        apodContent.innerHTML = contentHTML;

    } catch (error) {
        console.error("Error loading APOD:", error);
        apodContent.innerHTML = `<p class="text-red-400 text-center">Error: ${error.message}. This is often caused by an invalid or rate-limited API key.</p>`;
    }
}

// ----- Mars Rover Photos -----
const roverContent = document.getElementById('rover-content');

async function loadRoverPhotos() {
    roverContent.innerHTML = `<div class="loading-spinner w-10 h-10 border-4 border-gray-600 rounded-full mx-auto"></div>`;

    try {
        const res = await fetch("https://api.marsvista.dev/api/v2/photos", {
            headers: {
                "accept": "text/plain",
                "X-API-Key": "mv_live_a09c7fb94c42b6906efb9b077640d3542af62cda"
            }
        });

        if (!res.ok) {
            throw new Error(`API request failed (${res.status})`);
        }

        const result = await res.json();

        // MarsVista photos array
        const photos = result.data.slice(0, 6);

        if (!photos.length) {
            roverContent.innerHTML = `
                <p class="text-gray-400 text-center">
                    No Mars images available.
                </p>
            `;
            return;
        }

        roverContent.innerHTML = photos.map(item => {
            const attrs = item.attributes;

            //  Image URL priority:
            const imageUrl =
                attrs.images?.full ||
                attrs.img_src ||
                "https://placehold.co/600x400?text=Image+Not+Available";

            return `
                <div class="bg-gray-700 p-4 rounded-lg shadow-lg">
                    <img
                        class="w-full h-auto rounded-md object-cover transition-transform duration-300 transform hover:scale-105"
                        src="${imageUrl}"
                        alt="${attrs.title || 'Mars Image'}"
                        loading="lazy"
                        onerror="this.src='https://placehold.co/600x400?text=Image+Not+Available';"
                    >
                    <p class="mt-2 text-sm text-center text-gray-400">
                        ${attrs.title || "Mars Rover Image"}
                        <br>
                        <span class="text-xs opacity-70">
                            Sol ${attrs.sol} • ${attrs.earth_date}
                        </span>
                    </p>
                </div>
            `;
        }).join("");

    } catch (error) {
        console.error("Error loading MarsVista photos:", error);
        roverContent.innerHTML = `
            <p class="text-red-400 text-center">
                Error loading photos: ${error.message}
            </p>`;
    }
}

//commenting the below code as Nasa Rover API is archived and we are using marsvista API
// async function loadRoverPhotos() {
//     roverContent.innerHTML = `<div class="loading-spinner w-10 h-10 border-4 border-gray-600 rounded-full mx-auto"></div>`;
//     try {
//         const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos?api_key=${API_KEY}`);
//         if (!res.ok) {
//             const errorData = await res.json();
//             throw new Error(errorData.error.message || 'API request failed.');
//         }
//         const data = await res.json();
//         const photos = data.latest_photos.slice(0, 6); // show up to 6 photos

//         if (photos.length === 0) {
//             roverContent.innerHTML = `<p class="text-gray-400 text-center">No photos found for the latest mission.</p>`;
//             return;
//         }

//         roverContent.innerHTML = photos.map(p => `
//             <div class="bg-gray-700 p-4 rounded-lg shadow-lg">
//                 <img class="w-full h-auto rounded-md object-cover transition-transform duration-300 transform hover:scale-105" src="${p.img_src}" alt="Mars Rover Photo" onerror="this.src='https://placehold.co/600x400?text=Image+Not+Available';">
//                 <p class="mt-2 text-sm text-center text-gray-400">${p.rover.name} Rover - ${p.camera.full_name}</p>
//             </div>
//         `).join("");

//     } catch (error) {
//         console.error("Error loading Mars Rover photos:", error);
//         roverContent.innerHTML = `<p class="text-red-400 text-center">Error loading photos: ${error.message}. This is often caused by an invalid or rate-limited API key.</p>`;
//         // roverContent.innerHTML = `<p class="text-red-400 text-center">Error loading photos: Nasa has shutdown its services temporarily which is the reason for several APIs erroring out.</p>`;
//     }
// }

// ----- Near-Earth Asteroids -----
const asteroidsContent = document.getElementById('asteroids-content');

async function loadAsteroids() {
    asteroidsContent.innerHTML = `<div class="loading-spinner w-10 h-10 border-4 border-gray-600 rounded-full mx-auto"></div>`;
    try {
        const today = new Date().toISOString().split("T")[0];
        const nextWeek = new Date(Date.now() + 7*24*60*60*1000).toISOString().split("T")[0];
        const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${nextWeek}&api_key=${API_KEY}`);
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error.message || 'API request failed.');
        }
        const data = await res.json();
        
        const asteroids = Object.values(data.near_earth_objects).flat();
        if (asteroids.length === 0) {
            asteroidsContent.innerHTML = `<p class="text-gray-400 text-center">No near-earth asteroids found for the next 7 days.</p>`;
            return;
        }

        let rows = asteroids.slice(0, 10).map(a => `
            <tr class="hover:bg-gray-700 transition-colors duration-200">
                <td class="p-4 border-b border-gray-700">${a.name}</td>
                <td class="p-4 border-b border-gray-700">${a.close_approach_data[0].close_approach_date}</td>
                <td class="p-4 border-b border-gray-700">${a.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} m</td>
                <td class="p-4 border-b border-gray-700">${(a.close_approach_data[0].relative_velocity.kilometers_per_hour * 1).toFixed(2)} km/h</td>
                <td class="p-4 border-b border-gray-700 ${a.is_potentially_hazardous_asteroid ? 'text-red-400' : 'text-green-400'}">${a.is_potentially_hazardous_asteroid ? '⚠️ Yes' : 'No'}</td>
            </tr>
        `).join("");

        asteroidsContent.innerHTML = `
            <table class="min-w-full divide-y divide-gray-700 rounded-xl overflow-hidden shadow-lg">
                <thead class="bg-gray-700">
                    <tr>
                        <th class="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Name</th>
                        <th class="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Date</th>
                        <th class="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Diameter</th>
                        <th class="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Velocity</th>
                        <th class="p-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-300">Hazardous</th>
                    </tr>
                </thead>
                <tbody class="bg-gray-800 divide-y divide-gray-700">
                    ${rows}
                </tbody>
            </table>
        `;

    } catch (error) {
        console.error("Error loading asteroid data:", error);
        asteroidsContent.innerHTML = `<p class="text-red-400 text-center">Error loading data: ${error.message}. This is often caused by an invalid or rate-limited API key.</p>`;
    }
}

// Load initial data for all sections
window.onload = function() {
    // const today = new Date().toISOString().split("T")[0];
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    apodDateInput.value = today;
    // loadAPOD(today);
    loadRoverPhotos();
    loadAsteroids();
}
