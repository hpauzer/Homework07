// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNvQl5f-XRK6BovAdILma0k35FNDtQhQU",
    authDomain: "trainschedule-52724.firebaseapp.com",
    databaseURL: "https://trainschedule-52724.firebaseio.com",
    projectId: "trainschedule-52724",
    storageBucket: "trainschedule-52724.appspot.com",
    messagingSenderId: "738573237307"
};
firebase.initializeApp(config);

var database = firebase.database();
$("#submit-button").on("click", function (event) {
    event.preventDefault();
    //grab user input    
    var trainName = $("#input-train-name").val().trim();
    var trainDestination = $("#input-train-destination").val().trim();
    var trainFirstTrainTime = $("#input-first-train-time").val().trim();
    var trainFrequency = $("#input-frequency").val().trim();

    //temporary object to store train data
    var newTrain = {
        train: trainName,
        destination: trainDestination,
        trainTime: trainFirstTrainTime,
        frequency: trainFrequency
    };

    //push train data to firebase
    database.ref().push(newTrain);

    console.log(("pushing Train = "), newTrain.train);
    console.log(("pushing Destination = "), newTrain.destination);
    console.log(("pusing Train Time = "), newTrain.trainTime);
    console.log(("pushing Frequency = "), newTrain.frequency);

    alert("Train information added");

    //clear input boxes
    $("input-train-name").val("");
    $("input-train-destination").val("");
    $("input-first-train-time").val("");
    $("input-frequency").val("");

});

//Add info to firebase and show in table on entry submission
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    //store in a variable
    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTrainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(("stored var Train Name = "), trainName);
    console.log(("stored var Destination = "), trainDestination);
    console.log(("stored var First Train Time = "), trainFirstTrainTime);
    console.log(("stored var Frequency = "), trainFrequency);

    //Next Arrival = First Train Time (convert to minutes) + Frequency (which is already in minutes)
    var a = moment.unix(trainFirstTrainTime);

    var nextArrival = a.clone().add(trainFrequency, "HH:mm")

    var prettyNextArrival = moment.unix(nextArrival).format("HH:mm");
    console.log("Calculating next arrival");
    console.log(("First Train Time = "), trainFirstTrainTime);
    console.log(("Train Frequency = "), trainFrequency);
    console.log(("Next Arrival = "), nextArrival);
    console.log(("Next Arrival = "), prettNextArrival);




    //minutes away = Next arrival - current time, 
    // var minAway =


});
