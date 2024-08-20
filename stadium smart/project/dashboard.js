document.addEventListener("DOMContentLoaded", function () {
  const teamName = document.getElementById("teamName");
  const numPlayers = document.getElementById("numPlayers");
  const startTime = document.getElementById("startTime");
  const endTime = document.getElementById("endTime");
  const errorMessage = document.getElementById("errorMessage");

  const teamNameError = document.getElementById("teamNameError");
  const numPlayersError = document.getElementById("numPlayersError");
  const startTimeError = document.getElementById("startTimeError");
  const endTimeError = document.getElementById("endTimeError");

  function parseTime(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function clearErrors() {
    teamNameError.style.display = "none";
    numPlayersError.style.display = "none";
    startTimeError.style.display = "none";
    endTimeError.style.display = "none";
    errorMessage.style.display = "none";
  }

  function register() {
    clearErrors();

    const selectedDay = localStorage.getItem("selectedDay");
    const selectedMonth = localStorage.getItem("selectedMonth");
    const selectedYear = localStorage.getItem("selectedYear");

    if (!selectedDay || !selectedMonth || !selectedYear) {
      alert("No day selected.");
      return;
    }

    if (numPlayers.value < 4) {
      numPlayersError.textContent = "Number of players must be at least 4.";
      numPlayersError.style.display = "block";
      return;
    }

    const startTimeValue = parseTime(startTime.value);
    const endTimeValue = parseTime(endTime.value);

    if (endTimeValue - startTimeValue < 90) {
      endTimeError.textContent = "Session must last at least 1.5 hours.";
      endTimeError.style.display = "block";
      return;
    }

    const sessionsKey = `sessions-${selectedYear}-${selectedMonth}-${selectedDay}`;
    const sessions = JSON.parse(localStorage.getItem(sessionsKey)) || [];

    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i].teamName === teamName.value) {
        teamNameError.textContent = "Team name already exists for this day.";
        teamNameError.style.display = "block";
        return;
      }

      const existingStart = parseTime(sessions[i].startTime);
      const existingEnd = parseTime(sessions[i].endTime);

      if (
        (startTimeValue < existingEnd && endTimeValue > existingStart) ||
        (existingStart < endTimeValue && existingEnd > startTimeValue)
      ) {
        errorMessage.textContent = "A session with conflicting time exists.";
        errorMessage.style.display = "block";
        return;
      }

      if (
        Math.abs(startTimeValue - existingEnd) < 90 ||
        Math.abs(endTimeValue - existingStart) < 90
      ) {
        errorMessage.textContent =
          "There must be at least a 1.5-hour gap between sessions.";
        errorMessage.style.display = "block";
        return;
      }
    }

    const session = {
      teamName: teamName.value,
      numPlayers: numPlayers.value,
      startTime: startTime.value,
      endTime: endTime.value,
    };

    sessions.push(session);
    localStorage.setItem(sessionsKey, JSON.stringify(sessions));

    alert("Session registered successfully.");
    window.location.href = "calandrier.html";
  }

  window.register = register;
});
