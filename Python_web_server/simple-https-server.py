# Simple HTTPs Server
#
# taken from https://gist.github.com/dergachev/7028596
# remastered by svlasov98@gmail.com
# run as follows:
#    python simple-https-server.py


import BaseHTTPServer, SimpleHTTPServer
import ssl

SERVER_PORT = 8088
SERVER_IPADDR = '192.168.5.71'
SERVER_KEY = '/home/svyatoslav/ROS_PROJECTS/ROS_WEB_alpha/DEVELOP_KEYs-RGU120/development.key'
SERVER_CRT = '/home/svyatoslav/ROS_PROJECTS/ROS_WEB_alpha/DEVELOP_KEYs-RGU120/development-bundle.crt'
#SERVER_KEY = '/home/svyatoslav/ROS_PROJECTS/ROS_WEB_alpha/DEVELOP_KEYs-home71/development.key'
#SERVER_CRT = '/home/svyatoslav/ROS_PROJECTS/ROS_WEB_alpha/DEVELOP_KEYs-home71/development-bundle.crt'

httpd = BaseHTTPServer.HTTPServer((SERVER_IPADDR, SERVER_PORT), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, certfile=SERVER_CRT, keyfile=SERVER_KEY, server_side=True)
httpd.serve_forever()
