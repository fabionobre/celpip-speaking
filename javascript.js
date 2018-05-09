var runningTimer = 0;
var status = 'ready';
var preparationTime = 10;
var recordingTime = 10;

var divPreparationTime;
var divRecordingTime;

$(document).ready(function() {
    var progressBar = $(".progressBar");
    var recordingText = $(".recordingText");
    divPreparationTime = $("#preparationTime");
    divRecordingTime = $("#recordingTime");

    var time = 0;

    var speaknowAudio = new Audio('speak_now.m4a');
    var stopSpeakingAudio = new Audio('stop_speaking.m4a');

    var timerInterval;

    startTimer(preparationTime, "Preparation...", 'preparation');
    updateTimer();

    function startTimer(duration, message, status) {
        runningTimer = duration * 10;
        $(recordingText).html(message);
        timerInterval = setInterval(timer, 100);
        this.status = status;
    }

    function timer() {
        time += 1;
        console.log(runningTimer, time);
        console.log(status);
        $(progressBar).css("width", ((100 / runningTimer) * time) + '%' );
        if (time >= runningTimer) {
            time = 0;
            clearInterval(timerInterval);
            if (status == 'recording') {
                stopSpeakingAudio.play();
                status = 'stoped'
                $(recordingText).html("Finished");
            } else if (status == 'preparation') {
                speaknowAudio.play();
                startTimer(recordingTime, "Recording...", 'recording');
            }
        }
    }
});

function updateTimer() {
    $(divPreparationTime).html(preparationTime + ' seconds');
    $(divRecordingTime).html(recordingTime + ' seconds');
}
