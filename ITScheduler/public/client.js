document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#add-shift-form');
  const shiftListContainer = document.querySelector('#shift-list-container');

  const socket = io();

  form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const shift = {
          date: formData.get('shiftDate'),
          time: formData.get('shiftTime'),
          worker: formData.get('shiftWorker')
      };

      // Emit the 'addShift' event to the server
      socket.emit('addShift', shift);

      // Clear the form fields
      form.reset();
  });

  socket.on('shiftAdded', (shift) => {
      // Update the shift list with the newly added shift
      // You can use DOM manipulation to append the new shift to the list
      const shiftItem = document.createElement('div');
      shiftItem.className = 'shift-item';
      shiftItem.innerHTML = `<p>${shift.date} at ${shift.time} - ${shift.worker}</p>`;
      shiftListContainer.appendChild(shiftItem);
  });

  // Fetch and render existing shifts when the page loads
  socket.emit('fetchShifts'); // Emit an event to request existing shifts
  socket.on('shiftsData', (shifts) => {
      // Render existing shifts
      shifts.forEach((shift) => {
          const shiftItem = document.createElement('div');
          shiftItem.className = 'shift-item';
          shiftItem.innerHTML = `<p>${shift.date} at ${shift.time} - ${shift.worker}</p>`;
          shiftListContainer.appendChild(shiftItem);
      });
  });
});
