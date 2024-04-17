## Project Name: GeoGuard
Private cameras in businesses, homes, and institutions play a crucial role in enhancing public safety and crime detection. Many private cameras lack clear locations, making it difficult for the police to efficiently access relevant video footage during investigations in specific crime-prone areas.

### Video Demonstration:
 
https://github.com/jayesnc2512/TeamBoka_GeoGuard/assets/91362589/c3dd54fe-89a0-4878-9165-265b69d589e0

### Techstack: 
- **Frontend**:
  - Powered by React
  - Integrated with Google Maps API

- **Database**:
  - Managed using Firebase 

- **Backend**:
  - Python communicates with ML model
  - ML model consists of YOLOv8 and Vertex AI along with ultralytics

- **Hosting**:
  - Hosted on Google App Engine
  - Load balancer included for optimal performance
<!-- - Kubernetes Engine utilized -->
   
### How to Setup Locally
#### Setup ML Model
#### 💻 Install
  ```bash
#direct to ml folder
cd yolov8-live-master

# create python virtual environment
python3 -m venv venv

# activate the virtual environment
source venv/bin/activate

# install dependencies
pip install -r requirements.txt
```
#### 📸 Execute

```bash
python3 -m main
```

#### Setup Dashboard
#### 💻 Install
```bash


# install node_modules for client
npm install

#direct to Server
cd server

# install node_modules for server
npm install
```

#### 📸 Execute

```bash
#Run server
cd server
npm start
```
```bash
#on a separate cmd Run client
npm start
```



### Modules
#### 1. Camera Registration Module:
- Enrollment of cameras and data storage.
- Administration of geotagged data.

#### 2. Module for Geotagging:
- Using the Google Maps API to geotag the approved camera area and introduction.
- Interactive map will help the Control center module to strategically plan the layout to avoid any casualties.

#### 3. Object Detection and failure detection: 
- Analysis of video streams from registered cameras.
- Identification of specific objects using deep learning and object detection.
- Detection of camera failures.

#### 4. Alerting:
- Real-time communication and alert generation based on detected objects.
- Notification of camera failures to the Owner and Control Center.

#### 5. Command and Control Center Module:
- Confirmation of camera registration and alert subscription.
- Map-based interface for displaying alerts and camera locations.
- Interface for contacting camera owners, requesting access to video footage, and dispatching police units.
- Reception and processing of alerts from the Object Detection and Failure Detection Module.


### Goals to achieve
- **Planning on switching to SQL based database for better scalability**
- **Achieving camera feed from local IP to public IP**
- **Implementing cloud-based storage to store CCTV footage using different encryption and compression techniques**

### Achievements
- Qualified for preliminary round of IEEE YESIST12. 

- Currently developing under guidance of Rajasthan Police (Finalist at Rajasthan Police Hackathon 1.0)

- Presented project idea for City institute of disaster Management(BMC) 
