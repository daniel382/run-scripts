const logContainer = document.querySelector('#logs pre')

function appendLogs (logs, script, time) {
  logContainer.textContent += `RUN: ${script} -> ${time.toISOString()}\n`
  logContainer.textContent += `${logs}\n\n`
}

function runScript (script) {
  const time = new Date()

  fetch(`/run?script=${script}`)
    .then(data => data.text())
    .then(result => appendLogs(result, script, time))
    .catch(console.error)
}
