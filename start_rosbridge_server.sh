#!/bin/bash

SERVER_ADDRESS="0.0.0.0"
SERVER_PORT="9099"
#
DEV_ROS_HOSTNAME="192.168.1.120"
DEV_ROS_MASTER_URI="http://192.168.1.104:11311/"
#DEV_ROS_HOSTNAME="localhost"
#DEV_ROS_MASTER_URI="http://localhost:11311/"
#
#BY_RD_PATH="/media/svyatoslav/LALALAND/ROS_WEB_alpha/DEVELOP_KEYs-RGU120"
BY_RD_PATH="/home/svyatoslav/ROS_PROJECTS/ROS_WEB_alpha/DEVELOP_KEYs-home71"
#
CRT_PATH=$BY_RD_PATH"/""development-bundle.crt"
KEY_PATH=$BY_RD_PATH"/""development.key"

#
#
#
#export ROS_MASTER_URI=$DEV_ROS_MASTER_URI && export ROS_HOSTNAME=$DEV_ROS_HOSTNAME
rosparam set /brown/rosbridge/hz 200
roslaunch rosbridge_server rosbridge_websocket.launch port:=$SERVER_PORT address:=$SERVER_ADDRESS ssl:=true certfile:=$CRT_PATH keyfile:=$KEY_PATH authenticate:=false --screen
#
#
#
