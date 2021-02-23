var server = "192.168.5.71";
var port = "9099";
var topic = "/cmd_vel";

var maxLin = 1.1;
var maxAng = 2;

var x = 0;
var z = 0;

function color(clr) {
  document.body.innerHTML = '<style>body {background: '+clr+';}</style><div id=scr>err:err:err:</div>';
}

window.onload = function () {
  // Check if is IOS 13 when page loads.
  if ( window.DeviceMotionEvent && typeof window.DeviceMotionEvent.requestPermission === 'function' ){
      // Everything here is just a lazy banner. You can do the banner your way.
      const banner = document.createElement('div')
      banner.innerHTML = `<div style="z-index: 1; position: absolute; width: 100%; background-color:#000; color: #fff"><p style="padding: 10px">Click here to enable DeviceMotion</p></div>`
      banner.onclick = ClickRequestDeviceMotionEvent // You NEED to bind the function into a onClick event. An artificial 'onClick' will NOT work.
      document.querySelector('body').appendChild(banner)
  }
}


function ClickRequestDeviceMotionEvent () {
  window.DeviceMotionEvent.requestPermission()
    .then(response => {
      if (response === 'granted') {
        window.addEventListener('devicemotion',
          () => { console.log('DeviceMotion permissions granted.') },
          (e) => { throw e }
      )} else {
        console.log('DeviceMotion permissions not granted.')
      }
    })
    .catch(e => {
      console.error(e)
    })
}

function main() {
//  var con = new ros.Connection('ws://' + server + ':' + port);
  var con = new ROSLIB.Ros({
//    url : 'ws://localhost:9090'
    url : 'ws://' + server + ':' + port
  });

  con.on('close', function() {
    console.log('Connection to websocket server closed.');
    color('red');
  });

  con.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
    color('yellow');
  });

  con.on('connection', function() {
    console.log('Connected to websocket server.');
    color('green');
//  con.setOnError(function() {color('yellow')});
//  con.setOnClose(function() {color('red')});
//  con.setOnOpen(function() {
//    color('green');
    console.log('devicemotion create');
    window.addEventListener('devicemotion',function(e) {
      var acc = [e.accelerationIncludingGravity.x,e.accelerationIncludingGravity.y];
      var maxima = [maxLin,maxAng];
      for (var i = 0; i < 2; i++) {
        if (Math.abs(acc[i]) < 2) {
          acc[i] = 0;
        } else {
          var sign = Math.abs(acc[i])/acc[i];
          if (i == 0) acc[i] -= sign*2;
          if (sign*acc[i] > 7) acc[i] = sign*7;
          acc[i] = maxima[i]*acc[i]/7;
        }
      }
      x = acc[0];
      z = acc[1];
    });

    console.log('topic create');
    var cmdVel = new ROSLIB.Topic({
      ros : con,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    console.log('twist create');
    var twist = new ROSLIB.Message({
      linear : {
        x : x,
        y : 0,
        z : 0
      },
      angular : {
        x : 0,
        y : 0,
        z : z
      }
    });
//    cmdVel.publish(twist);
//    console.log('Twisted');
    console.log('publish');
    setInterval(function() {
//      cmdVel.publish(twist);
//      console.log('Twist_MSG (linear.x): '+twist.linear.x);
//      console.log('Twist_MSG (angular.z): '+twist.angular.z);

      var body_msg = document.getElementById("scr");
//      body_msg.textContent = "Twist_MSG: linear.x="+twist.linear.x+" :: angular.z="+twist.angular.z+" The end of line!!";
      body_msg.textContent = "Twist_MSG: linear.x="+x+" :: angular.z="+z+" The end of line!!";
      cmdVel.publish(twist);
      },33);

//    setInterval(function() {
//      con.publish(topic, 'geometry_msgs/Twist', '{"angular":{"x":0,"y":0,"z":'+z+'},"linear":{"x":'+x+',"y":0,"z":0}}');
//    },33);

  });
}


