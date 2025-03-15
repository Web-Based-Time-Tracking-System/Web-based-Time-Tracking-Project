document.getElementById('clockInButton').addEventListener('click', function() {
    const employeeId = document.getElementById('employeeName').value;
    if (!employeeId) {
        alert("Please select an employee.");
        return;
    }

    const currentTime = new Date().toISOString();

    fetch('save_time.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'clock_in',
            employee_id: employeeId,
            time: currentTime
        })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert(`Clocked in ${employeeId} at ${new Date(currentTime).toLocaleTimeString()}`);
              updateTable();
          } else {
              alert("Error clocking in. Please try again.");
          }
      });
});

document.getElementById('clockOutButton').addEventListener('click', function() {
    const employeeId = document.getElementById('employeeName').value;
    if (!employeeId) {
        alert("Please select an employee.");
        return;
    }

    const currentTime = new Date().toISOString();

    fetch('save_time.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            action: 'clock_out',
            employee_id: employeeId,
            time: currentTime
        })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert(`Clocked out ${employeeId} at ${new Date(currentTime).toLocaleTimeString()}`);
              updateTable();
          } else {
              alert("Error clocking out. Please try again.");
          }
      });
});

function updateTable() {
    fetch('get_logs.php')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#timeLogTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.forEach(log => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${log.employee_name}</td>
                    <td>${new Date(log.clock_in).toLocaleString()}</td>
                    <td>${log.clock_out ? new Date(log.clock_out).toLocaleString() : 'Not Clocked Out'}</td>
                    <td>${log.total_hours || 'N/A'}</td>
                    <td>${log.overtime || 'N/A'}</td>
                `;
                tableBody.appendChild(row);
            });
        });
}

// Initial table load
updateTable();