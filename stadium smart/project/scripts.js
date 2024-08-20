function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

function navigateToAddSecurityMan() {
    showPage('addSecurityMan');
}

function initMap() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([51.505, -0.09], { draggable: true }).addTo(map);

    marker.on('dragend', function (e) {
        const position = marker.getLatLng();
        document.getElementById('localLocation').value = `${position.lat}, ${position.lng}`;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showPage('localList');  // Show the local list page by default
    initMap();
});

document.getElementById('addLocalForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle form submission logic to add local
});

document.getElementById('addSecurityManForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Handle form submission logic to add security man
    // After adding, navigate back to add local form and pre-fill security man details
    showPage('addLocal');
});
