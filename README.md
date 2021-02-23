# ROSM ACCEL CONTROL

roscore

roslaunch rosbridge_server rosbridge_websocket.launch port:=9099 address:=0.0.0.0 ssl:=true certfile:=/media/svyatoslav/LALALAND/ROS_WEB/SERVICE-BALANCE/conf.d/selfsigned.pem keyfile:=/media/svyatoslav/LALALAND/ROS_WEB/SERVICE-BALANCE/conf.d/selfsigned.key authenticate:=false --screen






/media/svyatoslav/LALALAND/ROS_WEB/SERVICE-BALANCE/conf.d

sudo openssl genrsa -des3 -out selfsigned.key 2048

sudo openssl pkey -in selfsigned.key -out selfsigned-without-pass.key

sudo openssl req -x509 -new -nodes -key selfsigned-without-pass.key -sha256 -days 1825 -out selfsigned-without-pass.pem

openssl req -new -key sammy-server.key -out server.req -subj \
/C=US/ST=New\ York/L=New\ York\ City/O=DigitalOcean/OU=Community/CN=sammy-server









Country Name (2 letter code) [AU]:RU
State or Province Name (full name) [Some-State]:Moscow
Locality Name (eg, city) []:Moscow
Organization Name (eg, company) [Internet Widgits Pty Ltd]:RGU Robotics
Organizational Unit Name (eg, section) []:IM&IT
Common Name (e.g. server FQDN or YOUR name) []: 192.168.5.71
Email Address []:grurobotics@gmail.com



sudo docker-compose up







rostopic echo cmd_vel
