/**
 * Return a timestamp with the format "YYYY-MM-DD hh:MM:ss"
 * @type {Date}
 */

function timeStamp () {
  // Create a date object with the current time
  var now = new Date()

  // Create an array with the current month, day and time
  var date = [ now.getFullYear(), now.getMonth() + 1, now.getDate() ]

  // Create an array with the current hour, minute and second
  var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ]

  // If seconds, minutes, day or month is less than 10, add a  prefix zero
  for (var i = 1, j = 0; i < 3; i++) {
    if (time[j] < 10) {
      time[i] = '0' + time[i]
    }
    if (date[i] < 10) {
      date[i] = '0' + date[i]
    }
  }

  // Return the formatted string
  return date.join('-') + ' ' + time.join(':')
}

module.exports = timeStamp
