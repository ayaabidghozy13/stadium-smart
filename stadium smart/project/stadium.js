function navigateToCalendar(stadium) {
    // Save the selected stadium in local storage
    localStorage.setItem('selectedStadium', stadium);
    // Navigate to the calendar page
    window.location.href = 'calandrier.html';
}
