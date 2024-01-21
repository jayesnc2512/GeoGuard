import cv2
import numpy as np
import requests
import time  
from api import alert
import time

# Global variable to track tampering detection

def perform_background_subtraction(frame, fgbg, kernel,name,lid,userId):
    # global tampering_detected
    last_reported_message = ""
    a = 0
    bounding_rect = []
    fgmask = fgbg.apply(frame)
    fgmask = cv2.erode(fgmask, kernel, iterations=5)
    fgmask = cv2.dilate(fgmask, kernel, iterations=5)

    contours, _ = cv2.findContours(fgmask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    for i in range(0, len(contours)):
        bounding_rect.append(cv2.boundingRect(contours[i]))
    for i in range(0,len(contours)): 
        if bounding_rect[i][2] >=40 or bounding_rect[i][3] >= 40:
            a = a+(bounding_rect[i][2])*bounding_rect[i][3]
        if(a >=int(frame.shape[0])*int(frame.shape[1])/3):
            cv2.putText(frame,"TAMPERING DETECTED",(5,30),cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,255),2)  
            new_message = f"TAMPERING DETECTED at {name}"
            if new_message != last_reported_message:
                # send_data_to_api(new_message)
                print(new_message)
                last_reported_message = new_message
                #delay of 10 secs
                alert(new_message,name,lid,userId)
        #cv2.imshow('frame',frame)    
    return fgmask


