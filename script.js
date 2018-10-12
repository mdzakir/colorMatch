var score = 0;
var colorsArray = ['Red', 'Blue', 'Green', 'Orange', 'Purple', 'Yellow'];
var textIndex, colorIndex;
var timer = 10;
var timerColor = 'black';
var wrongAttempt = 0;
var userName;
var wrapper = document.getElementById('wrapper');
var userBox = document.getElementById('userbox');
localStorage.leaderBoard = [];

var yes = document.querySelector('.yes');
var no = document.querySelector('.no');
var startBtn = document.querySelector('.start-btn');
var wrongAttemptText = document.querySelector('.wrong-attempts');

if(startBtn){
	startBtn.addEventListener('click', function(){
		userName = document.querySelector('.user-name').value;
		if(!userName){
			alert('Please enter your name')
		} else {
			wrapper.style.display = 'block';
			userBox.style.display = 'none';
			setInterval(function(){
				timer = timer - 1;
				timerColor = timer <= 10 ? 'red' : 'black';
				document.querySelector('.time-sec').style.color = timerColor;
				document.querySelector('.time-sec').innerHTML = timer;
				timer === 0 && gameRestart(); 
			}, 1000);
		}
	});
}

if(yes){
	yes.addEventListener('click', function(){
		if(textIndex === colorIndex){
			score = score + 2;
		} else {
			score = score - 1;
			wrongAttempt = wrongAttempt + 1;
			wrongAttemptText.innerHTML = wrongAttempt;
		}
		generateTextAndBoxColor(textIndex, colorIndex);

		document.querySelector('.score-num').innerHTML = score;

	});
}

if(no){
	no.addEventListener('click', function(){
		
		if(textIndex !== colorIndex){
			score = score + 2;
		} else {
			score = score - 1;
			wrongAttempt = wrongAttempt + 1;
			wrongAttemptText.innerHTML = wrongAttempt;
		}
		
		generateTextAndBoxColor(textIndex, colorIndex);

		document.querySelector('.score-num').innerHTML = score;

	});
}

function generateTextAndBoxColor(){
	textIndex = Math.floor(Math.random() * 6);
		colorIndex = Math.floor(Math.random() * 6);
	var upperBox = document.querySelector('.upper-box');
	var lowerBox = document.querySelector('.lower-box');
	upperBox.innerHTML = colorsArray[textIndex];
	lowerBox.style.color = colorsArray[colorIndex];
}

function gameRestart() {
	localStorage.leaderBoard = [{user: userName, score: score}, ...localStorage.leaderBoard];
	alert('Time-out! Your Score is '+ score +'.\n Wrong attempts: ' + wrongAttempt + '.\n Your game will restart!')
	timer = 0;
	score = 0;
	location.reload();
}

init = () => {
	textIndex = Math.floor(Math.random() * 6);
	colorIndex = Math.floor(Math.random() * 6);
}

init();