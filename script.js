// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createPromise() {
  const randomTime = Math.floor(Math.random() * 3000) + 1000;
  return new Promise(resolve => setTimeout(() => resolve(randomTime), randomTime));
}

// Create an array of three promises
const promises = [createPromise(), createPromise(), createPromise()];

// Wait for all the promises to resolve
Promise.all(promises)
  .then(results => {
    const loadingRow = document.getElementById('loading-row');
    const tbody = loadingRow.parentNode;
    
    // Remove the loading row
    tbody.removeChild(loadingRow);

    // Add the rows with the promise names and their respective times
    results.forEach((time, index) => {
      const promiseNumber = index + 1;
      const tr = document.createElement('tr');
      const tdPromise = document.createElement('td');
      const tdTime = document.createElement('td');
      tdPromise.textContent = `Promise ${promiseNumber}`;
      tdTime.textContent = `${(time / 1000).toFixed(3)}s`;
      tr.appendChild(tdPromise);
      tr.appendChild(tdTime);
      tbody.appendChild(tr);
    });

    // Add the row with the total time taken to resolve all promises
    const totalTime = results.reduce((total, time) => total + time, 0) / 1000;
    const tr = document.createElement('tr');
    const tdTotal = document.createElement('td');
    const tdTotalTime = document.createElement('td');
    tdTotal.textContent = 'Total';
    tdTotalTime.textContent = `${totalTime.toFixed(3)}s`;
    tr.appendChild(tdTotal);
    tr.appendChild(tdTotalTime);
    tbody.appendChild(tr);
  });
