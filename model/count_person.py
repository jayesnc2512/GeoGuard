import cv2
import cvlib as cv
from cvlib.object_detection import draw_bbox
import numpy as np
import requests
from api import alert


def count_persons(frame,name,lid,userId):
    frame = cv2.resize(frame, (600, 640))
    bbox, label, conf = cv.detect_common_objects(frame)
    output_frame = draw_bbox(frame, bbox, label, conf)
    p = label.count('person')
    cv2.putText(output_frame, 'persons' + str(p), (55, 87), cv2.FONT_HERSHEY_PLAIN, 3, (255, 255, 255), 2)
    print(p)
    if(p>6):
        new_message = f"More than 6 person detected at {name}"
        print(new_message)
        alert(new_message,name,lid,userId)

    return frame

