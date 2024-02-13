import numpy as np
import cv2
import requests
import time
from background_subtraction import perform_background_subtraction
from count_person import count_persons
import sys

# Flag to indicate whether tampering is currently detected
# tampering_detected = False
recording_start_time = None

# Check if a command-line argument (camera index) is provided
if len(sys.argv) < 2:
    sys.exit(1)


if(sys.argv[5] == "False"):
    rtsp_url = sys.argv[1]
    cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
else:   
    camera_index = int(sys.argv[1])
    cap = cv2.VideoCapture(camera_index)

# Initialize camera


fgbg = cv2.createBackgroundSubtractorMOG2()
ret, frame = cap.read()
kernel = np.ones((5, 5), np.uint8)

# Video writer object
video_writer = None

# Function to start video recording
# def start_recording():
#     global video_writer
#     fourcc = cv2.VideoWriter_fourcc(*'XVID')
#     output_file = f"tampering_footage_{time.strftime('%Y%m%d%H%M%S')}.avi"
#     video_writer = cv2.VideoWriter(output_file, fourcc, 20.0, (int(cap.get(3)), int(cap.get(4))))
#     print(f"Recording started: {output_file}")

# # Function to stop video recording
# def stop_recording():
#     global video_writer
#     if video_writer is not None:
#         video_writer.release()
#         print("Recording stopped.")
#     video_writer = None

while True:
    ret, frame = cap.read()

    if frame is None:
        print("End of frame")
        break

    fgmask =perform_background_subtraction(frame, fgbg, kernel,sys.argv[2],sys.argv[3],sys.argv[4])
    # Check for tampering

    if(sys.argv[6] == "1"):
        frame = count_persons(frame,sys.argv[2],sys.argv[3],sys.argv[4])
    # Person counting part


    cv2.imshow(sys.argv[2], frame)

    k = cv2.waitKey(30) & 0xff
    if k == 27:  # Press 'Esc' key to exit
        break

# Release resources
cap.release()
cv2.destroyAllWindows()


