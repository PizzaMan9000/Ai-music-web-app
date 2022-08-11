peter_pan = "";
harry_potter = "";

rightWristX = 0;
rightWristY = 0;
rightWristScore = 0;

leftWristX = 0;
leftWristY = 0;
leftWristScore = 0;

function preload() {
    peter_pan = loadSound("music2.mp3");
    harry_potter = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist x- " + rightWristX + " y- " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist x- " + leftWristX + " y- " + leftWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("leftWristScore - " + leftWristScore);

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("rightWristScore - " + rightWristScore);
    }
}

function modelLoaded() {
    console.log("Model loaded");
}

function draw() {
    image(video, 0, 0, 800, 600);

    fill("red");
    stroke("red");
    
    if (leftWristScore > 0.2) {
        harry_potter.stop();
        peter_pan.play();

        circle(leftWristX, leftWristY, 10);
    }

    if (rightWristScore > 0.2)
    {
        harry_potter.play();
        peter_pan.stop();

        circle(rightWristX, rightWristY, 10);
    }
}