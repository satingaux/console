(function() {

  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyAOninlLSAgLEt0SREVaw3lCdDFZVkmEOY",
    authDomain: "gamingwithconsole.firebaseapp.com",
    databaseURL: "https://gamingwithconsole.firebaseio.com",
    projectId: "gamingwithconsole",
    storageBucket: "gamingwithconsole.appspot.com",
    messagingSenderId: "451213350892",
    appId: "1:451213350892:web:d7e7b16d3c9b5199"
  };

  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();

  // Get element
  const preObject = document.getElementById('object');

  // Create references
  const dbRefObject = firebase.database().ref().child('object');

  // Sync object changes
  dbRefObject.on('value', snap => {
    console.log(snap.val())
    // preObject.innerText = JSON.stringify(snap.val(), null, 3);
  });

var dataDiv = document.querySelector('#data');
function log(message) {
  dataDiv.innerHTML = message + '<br />' + dataDiv.innerHTML;
}

function handleDeviceMotion(e) {
  var x = e.acceleration.x;
  var y = e.acceleration.y;
  var z = e.acceleration.z;
  console.log('Acceleration: ' + x + ', ' + y + ', ' + z);
  var postData = {
    X: x,
    Y: y,
    Z: z
  };
  var updates = {};
  updates['/acceleration'] = postData;
  console.log(e);
  firebase.database().ref().update(updates);

  var xg = e.accelerationIncludingGravity.x;
  var yg = e.accelerationIncludingGravity.y;
  var zg = e.accelerationIncludingGravity.z;
  log('Acceleration including gravity: ' + xg + ', ' + yg + ', ' + zg);

  var alpha = e.rotationRate.alpha;
  var beta = e.rotationRate.beta;
  var gamma = e.rotationRate.gamma;
  log('Rotation rate: ' + alpha + ', ' + beta + ', ' + gamma);

  log('Refresh interval: ' + e.interval);
}

if (window.DeviceMotionEvent) {
  window.ondevicemotion = handleDeviceMotion;

} else {
  log('Device Motion not supported.');
}


}());