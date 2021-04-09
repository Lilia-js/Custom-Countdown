const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitel = document.getElementById('countdown-titel');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitel = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Minimum with Today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM(){
  countdownActive = setInterval(()=>{
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance/day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
     // Hide Input
    inputContainer.hidden = true;
    //if the countdown has ends, show complete
    if(distance < 0){
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitel} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else{
      // Else, show countdown in progress
      countdownElTitel.textContent = `${countdownTitel}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}
// Take Values from Form Input 
function updateCountdown(e){
  e.preventDefault();
  countdownTitel = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countdownTitel,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  // Check for valid Date
  if (countdownDate === '') {
    alert('Please select a date for the countdown')
  } else {
    //Get number version of current Date, updateDOM
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

// Reset all values
function reset(){
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeEl.hidden = true
  // stop the countdown
  clearInterval(countdownActive);
  // Reset the values
  countdownTitel = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}
function restorePreviousCountdown(){
  // Get the countdown from localStorage if avaliable
  if (localStorage.getItem('countdown')){
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countdownTitel = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}
// Event Listener 
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On load, check Local storage
restorePreviousCountdown();