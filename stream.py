"""
This module is responsible for retriving the stream
data that can then be passed to p5.js script.
"""

import subprocess as sp
import cv2
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler


url = "https://www.youtube.com/watch?v=OAJF1Ie1m_Q"

result = sp.run([sys.executable, "-m", "yt_dlp", "-g", url], capture_output=True, text=True)
stream_url = result.stdout.strip()

print("Got url")

cap = cv2.VideoCapture(stream_url)
print("Opened stream")

class Handler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass
    
    def do_GET(self):
        ret, frame = cap.read()
        small = cv2.resize(frame, (64, 48))
        _, jpg = cv2.imencode(".jpg", small)

        self.send_response(200)
        self.send_header("Content-Type", "image/jpeg")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(jpg.tobytes())

print("Server running at http://localhost:5050")
server = HTTPServer(("localhost", 5050), Handler)
server.serve_forever()
