// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


const inputTargetData = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: "today",
  onClose(selectedDates){
    // console.log(selectedDates[0])
    if((selectedDates[0] - Date.now()) < 1000) {
      alert("Please choose a date in the future")
    } 
  }
}
startButton.addEventListener('click', onStartTimer);

function onStartTimer(evt) {

 const timerId = setInterval( ()=>{ 
   const targetDate = new Date(inputTargetData.value)
 const diffTime = targetDate - Date.now()
 const leftTime = convertMs(diffTime)
 if(diffTime < 1000){
   clearInterval(timerId);
 }
    timer(leftTime);} , 1000)
  }
 
//  console.log(leftTime.days);
 
  // console.log( targetDate - Date.now())
  // console.log(targetDate)



flatpickr(inputTargetData, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function timer(arrTime) {
  daysLeft.textContent =  arrTime.days;
  hoursLeft.textContent = arrTime.hours;
  minutesLeft.textContent = arrTime.minutes;
  secondsLeft.textContent = arrTime.seconds;
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

