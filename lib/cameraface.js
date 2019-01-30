// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
}

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

var emotions = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'];
var emotionValues = [];

function processImage(blob) {
    // Replace <Subscription Key> with your valid subscription key.
    var subscriptionKey = "e9d4c5eb068749da906e9fe38b3f3c8a";


    // NOTE: You must use the same region in your REST call as you used to
    // obtain your subscription keys. For example, if you obtained your
    // subscription keys from westus, replace "westcentralus" in the URL
    // below with "westus".
    //
    // Free trial subscription keys are generated in the "westus" region.
    // If you use a free trial subscription key, you shouldn't need to change 
    // this region.
    var uriBase =
        "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        'overload': 'stream',
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes":
            "emotion"
    };

    // Display the image.


    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function (xhrObj) {
            // xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        processData: false,
        contentType: 'application/octet-stream',

        type: "POST",

        // Request body.
        data: blob,
    })
        // this is where all the magic happens
        // this is where all the magic happens
        // this is where all the magic happens
        // this is where all the magic happens


        .done(function (data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").text(JSON.stringify(data[0].faceAttributes.emotion));
            // console.log(data[0].faceAttributes.emotion);
            var results = data[0].faceAttributes.emotion;
            // emotions.push(results);
            // console.log(emotions[0])
            console.log(results);
            emotionValues = Object.values(results);

            console.log(emotionValues);

            var emotionHighestValue = (Math.max.apply(null, emotionValues));
            console.log(emotionHighestValue);
            var indexHighestValue = emotionValues.indexOf(emotionHighestValue);
            console.log(indexHighestValue);

            var spotifyEmotion = emotions[indexHighestValue];
            console.log(spotifyEmotion)
            $("#responseTextArea").append('<br>'+ '<br>' + 'Your emotion is: ' + spotifyEmotion)
        })

        .fail(function (jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                    jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });


};


// function emotionsArray() {
//     for (var i = 0; i < emotions[0].length; i++) {
//         var decimals = parseFloat(emotions)
//             console.log(decimals)

//     }
// }








// Trigger photo take
document.getElementById("snap").addEventListener("click", function () {
    $('#canvas').removeClass('hidden');
    context.drawImage(video, 0, 0, 640, 480);
    $('#video').addClass('hidden');
    video.pause();
    // console.log(canvas.toDataURL());
    canvas.toBlob(processImage);
    // emotionsArray();


});




$('#redo').on('click', function () {
    video.play();
    $('#canvas').addClass('hidden');
    $('#video').removeClass('hidden');

})

