document.addEventListener('DOMContentLoaded', function () {
    const yearSelect = document.getElementById('yearSelect');
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year <= currentYear + 5; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    yearSelect.value = currentYear;
    generateCalendar();
});

function generateCalendar() {
    const year = document.getElementById('yearSelect').value;
    const month = document.getElementById('monthSelect').value;
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();

    const daysRow = document.createElement('div');
    daysRow.classList.add('days-row');
    calendar.appendChild(daysRow);

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('empty-day');
        daysRow.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerHTML = `<h3>${day}</h3>`;
        dayDiv.addEventListener('click', () => selectDay(day, month, year));

        const sessions = JSON.parse(localStorage.getItem(`sessions-${year}-${month}-${day}`)) || [];
        const sessionsContainer = document.createElement('div');
        sessionsContainer.classList.add('sessions-container');

        sessions.forEach(session => {
            const sessionDiv = document.createElement('div');
            sessionDiv.classList.add('session');
            sessionDiv.innerHTML = `${session.teamName} (${session.startTime} - ${session.endTime})`;
            sessionDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleStartButton(sessionDiv, session);
            });
            sessionsContainer.appendChild(sessionDiv);

            const startButton = document.createElement('button');
            startButton.classList.add('start-button');
            startButton.textContent = 'Start Session';
            startButton.addEventListener('click', (e) => {
                e.stopPropagation();
                alert(`Starting session for ${session.teamName}`);
                // Additional logic to start the session in the afficheur can be added here
            });
            sessionDiv.appendChild(startButton);
        });

        dayDiv.appendChild(sessionsContainer);
        daysRow.appendChild(dayDiv);
    }
}

function selectDay(day, month, year) {
    localStorage.setItem('selectedDay', day);
    localStorage.setItem('selectedMonth', month);
    localStorage.setItem('selectedYear', year);
    window.location.href = 'dashboard.html';
}

function toggleStartButton(sessionDiv, session) {
    const startButton = sessionDiv.querySelector('.start-button');
    const allStartButtons = document.querySelectorAll('.start-button');

    allStartButtons.forEach(button => {
        if (button !== startButton) {
            button.style.display = 'none';
        }
    });

    startButton.style.display = startButton.style.display === 'block' ? 'none' : 'block';
}
