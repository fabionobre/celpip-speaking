var runningTimer = 0;
var status = 'ready';
var preparationTime = 30;
var recordingTime = 60;

var progressBar;
var recordingText;
var divPreparationTime;
var divRecordingTime;

let inputPreparationTime;
let inputRecordingTime;

var speaknowAudio = new Audio('speak_now.m4a');
var stopSpeakingAudio = new Audio('stop_speaking.m4a');

$(document).ready(function() {
    progressBar = $(".progressBar");
    recordingText = $(".recordingText");
    divPreparationTime = $("#preparationTime");
    divRecordingTime = $("#recordingTime");
    inputPreparationTime = $("#inputPreparationTime");
    inputRecordingTime = $("#inputRecordingTime");

    $(inputPreparationTime).val(preparationTime);
    $(inputRecordingTime).val(recordingTime);

    var time = 0;
    var timerInterval;

    updateTimer();

    function startTimer(duration, message, status) {
        clearInterval(timerInterval);
        time = 0;
        runningTimer = duration * 10;
        changeRecordingText(message);
        timerInterval = setInterval(timer, 100);
        this.status = status;
    }

    function timer() {
        time += 1;
        $(progressBar).css("width", ((100 / runningTimer) * time) + '%' );
        if (time >= runningTimer) {
            time = 0;
            clearInterval(timerInterval);
            if (status == 'recording') {
                stopSpeakingAudio.play();
                status = 'stoped';
                changeRecordingText("Finished");
            } else if (status == 'preparation') {
                startRecording();
            }
        }
    }

    function startRecording() {
        speaknowAudio.play();
        startTimer(recordingTime, "Recording...", 'recording');
    }

    function changeRecordingText(message) {
        $(recordingText).html(message);
    }

    function updateTimer() {
        $(divPreparationTime).html(preparationTime + ' seconds');
        $(divRecordingTime).html(recordingTime + ' seconds');
    }


    $("#startBnt").click(() => {
        if (status === "preparation") {
            startRecording();
        } else {
            startTimer(preparationTime, "Preparation...", 'preparation');
        }
    });

    $("#stopBnt").click(() => {
        clearInterval(timerInterval);
        status = 'stoped';
        changeRecordingText("Stopped...");
        $(progressBar).css("width", 0 + '%' );
    });

    $("#updateBnt").click(() => {
        preparationTime = $(inputPreparationTime).val();
        recordingTime = $(inputRecordingTime).val();
        updateTimer();
    });
});

