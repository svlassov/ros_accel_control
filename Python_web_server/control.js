//
//
//
//-----------------------------------------
var version_info = "alpha - 0.2.3";
//-----------------------------------------
//var server = "192.168.1.120";
var server = "192.168.5.71";
var port = "9099";
var topic = "/cmd_vel";
var msg = "geometry_msgs/Twist";
var proto = "wss"

var maxLin = 1.1;
var maxAng = 2;

var x = 0;
var z = 0;
//-----------------------------------------
var msg_size = 3;
var msg_rotation = 100;
var con;
var publish_pass = 0;
var msg_info_angular = 0;
var msg_info_linear = 0;
//-----------------------------------------

//###############################################################################################
//###############################################################################################
//###############################################################################################
function versionsetinfo() {
    var version = version_info;
    var set_info = document.getElementById("version");
    set_info.textContent = version_info;
}

function pause() {
  var m={ msg_1: msg_info_linear, msg_2: msg_info_angular,
         see: function() {
           alert('PAUSE'+`\n`+'Twist_MSG: linear.x= '+this.msg_1+`\n`+'Twist_MSG: angular.z= '+this.msg_2);
         }
  };
  m.see();
}

function stop() { //временно не работает
  var d={ msg_1: msg_info_linear, msg_2: msg_info_angular,
         see: function() {
           x = 0;
           z = 0;
           alert('STOP'+`\n`+'Twist_MSG: linear.x= '+this.msg_1+`\n`+'Twist_MSG: angular.z= '+this.msg_2);
         }
  };
  d.see();
}

function roundPlus(x, n) { //x - число, n - количество знаков
  if(isNaN(x) || isNaN(n)) return false;
  var m = Math.pow(10,n);
  return Math.round(x*m)/m;
}

//------------------------------------------------alpha - 0.2.0 (comment this block to get alpha - 0.2.0)
function publish() {
    setInterval(function() {
        if (publish_pass == 1) {
            var cmdVel = new ROSLIB.Topic({
                ros : con,
                name : topic,
                messageType : msg
            });

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

            msg_info_angular = twist.angular.z;
            msg_info_linear = twist.linear.x;
            //
            var body_msg_linear = document.getElementById("scr");
            var body_msg_angular = document.getElementById("scp");
            //
            body_msg_linear.textContent = "Twist_MSG: linear.x= "+msg_info_linear;
            body_msg_angular.textContent = "Twist_MSG: angular.z= "+msg_info_angular;
            cmdVel.publish(twist);
        }
    },msg_rotation);
}
//------------------------------------------------ alpha - 0.2.0

function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            // set connetctiion
            con = new ROSLIB.Ros({
                url : proto + '://' + server + ':' + port
            });

              con.on('close', function() {
                  console.log('Connection to websocket server closed.');
                  // color('red');
                  document.body.style.backgroundColor = "red";
              });

              con.on('error', function(error) {
                  console.log('Error connecting to websocket server: ', error);
                  // color('yellow');
                  document.body.style.backgroundColor = "yellow";
              });

              con.on('connection', function() {
                  console.log('Connected to websocket server.');
                  // color('green');
                  document.body.style.backgroundColor = "green";
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
                  publish_pass = 1;
                  x = roundPlus(acc[0],msg_size);
                  z = roundPlus(acc[1],msg_size);
                  });
              });
          }
    });
//------------------------------------------------alpha - 0.2.0 (comment this block to get alpha - 0.2.0)
publish();
//------------------------------------------------ alpha - 0.2.0
}


//------------------------------------------------ alpha - 0.2.0 (uncomment this block to get alpha - 0.2.0)
// function main() {
//     setInterval(function() {

//         var cmdVel = new ROSLIB.Topic({
//             ros : con,
//             name : topic,
//             messageType : msg
//         });

//         var twist = new ROSLIB.Message({
//             linear : {
//                 x : x,
//                 y : 0,
//                 z : 0
//             },
//             angular : {
//                 x : 0,
//                 y : 0,
//                 z : z
//             }
//         });

//         if (publish_pass == 1) {
//             // datashit()
//             msg_info_angular = twist.angular.z;
//             msg_info_linear = twist.linear.x;
//             //
//             var body_msg_linear = document.getElementById("scr");
//             var body_msg_angular = document.getElementById("scp");
//             //
//             body_msg_linear.textContent = "Twist_MSG: linear.x= "+msg_info_linear;
//             body_msg_angular.textContent = "Twist_MSG: angular.z= "+msg_info_angular;
//         }
//         //
//         cmdVel.publish(twist);

//     },100);
// }
//------------------------------------------------ alpha - 0.2.0
