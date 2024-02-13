import tkinter as tk
from tkinter import messagebox
import subprocess
import requests
from requests.exceptions import RequestException
import json
from tkinter import font
import time
from tkinter import StringVar

global token
global user_info
global cam_by_user
import os
global camIndex
global camName
def authenticate():
    # Dummy username and password
    # valid_username = "user"
    # valid_password = "password"

    global token
    global user_info
    # Get username and password from the GUI entry widgets
    entered_username = entry_username.get()
    entered_password = entry_password.get()
    # print(entered_username,entered_password)
    # API endpoint for login
    api_endpoint = "http://localhost:3001/api/auth/login"

    # Prepare data for the POST request
    data = {
        "email": entered_username,
        "password": entered_password
    }

    # try:
        # Send POST request to the API endpoint
    json_data = json.dumps(data)
    #print (json_data)
    response = requests.post(api_endpoint, data=json_data, headers={"Content-Type": "application/json"})
    if response.status_code == 200:
            try:
                # Try to decode the response as JSON
                json_response = response.json()

                if json_response.get("success", False):
                    # If authentication is successful, show a message and open the main window
                    message = json_response.get("message", "Login successful")
                    token = json_response.get("token", "")
                    user_info = json_response.get("user", "")
                    name=user_info.get('name','')
                    messagebox.showinfo("Login Successful", f"{message}\n Hii {name}",icon="info")
                    call_cameras_api()
                    open_main_window()
                    # root.destroy()
                else:
                    # If authentication fails, show an error message
                    error_message = json_response.get("message", "Unknown error")
                    messagebox.showerror("Login Failed", error_message)

            except json.JSONDecodeError:
                # If decoding as JSON fails, handle it accordingly
                messagebox.showerror("Error", "Invalid JSON response from the server")

    # if entered_username == valid_username and entered_password == valid_password:
    #     messagebox.showinfo("Login Successful", "Welcome, {}".format(entered_username))
    #     open_main_window()
    else:
            # If the status code is not 200, handle it accordingly
            messagebox.showerror("Error", f"Error logging in {response.status_code} \n Please try again")

    # except RequestException as e:
    #     # Handle exceptions such as network errors
    #     messagebox.showerror("Error", f"An error occurred: {str(e)}")
        # messagebox.showerror("Login Failed", "Invalid username or password")

def open_main_window():
    global install_index_button
    global install_rtsp_button
    cameras_api_endpoint = "http://localhost:3001/api/camera/getCamByUserId"
    headers = {
        "token": token,
        "userid": str(user_info.get("_id", ""))
    }
    cam_by_user = []
    response = requests.get(cameras_api_endpoint, headers=headers)
    if response.status_code == 200:
        cameras_data = response.json()
        cam_by_user = cameras_data.get('camByUser', [])

    main_window = tk.Toplevel(root)
    main_window.title("GeoGuard Security System")
    main_window.geometry("500x300")

    rtsp_entry_label = tk.Label(main_window, text="Enter RTSP Link:")
    rtsp_entry_label.pack(pady=10)
    rtsp_var = StringVar()
    rtsp_entry = tk.Entry(main_window, textvariable=rtsp_var)
    rtsp_entry.pack(pady=10)

        # Toggle button for Tampering model (default to always on)
    tampering_toggle_var = tk.BooleanVar()
    tampering_toggle_button = tk.Checkbutton(main_window, text="Tampering Model (Always On)", variable=tampering_toggle_var, state=tk.DISABLED)
    tampering_toggle_button.pack(pady=10)
    tampering_toggle_var.set(True)  # Set the default value to True

    # Toggle button for People Count model
    people_count_toggle_var = tk.BooleanVar()
    people_count_toggle_button = tk.Checkbutton(main_window, text="People Count Model", variable=people_count_toggle_var)
    people_count_toggle_button.pack(pady=10)

    install_index_button = tk.Button(main_window, text="Install Requirements for Camera Index",
                                     command=lambda: install_requirements(main_window, cam_by_user,rtsp_var, people_count_toggle_var.get(), "True"))
    install_index_button.pack(pady=10)

    install_rtsp_button = tk.Button(main_window, text="Install Requirements for RTSP Camera",
                                    command=lambda: install_requirements(main_window, cam_by_user,rtsp_var, people_count_toggle_var.get(), "False"))
    install_rtsp_button.pack(pady=10)
def install_requirements(main_window,cam,rtsp_var,people_count_enabled, is_index):
    # Disable the button
    install_index_button.config(state=tk.DISABLED)
    install_rtsp_button.config(state=tk.DISABLED)
    # Create a label to show the download process
    download_label = tk.Label(main_window, text="Downloading and installing requirements...")
    download_label.pack(pady=10)

    # Change the current directory
    os.chdir("..")

    # Run the command to install requirements.txt
    subprocess.Popen(["pip", "install", "-r", "requirements.txt"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    time.sleep(15)

    # Destroy the main window
    main_window.destroy()

    # Create a new window
    button_window = tk.Toplevel()
    button_window.title("Camera Window")

    # Define button callbacks
    # def button_callback(para,name,lid,user):
    #     subprocess.Popen(["python", "main.py", str(para), str(name),str(lid),str(user)])
    #     #process_video(para)

    # Create buttons in a 2x2 grid
    buttons = []
    # for i in range(len(cam)):
    #     row_num = i // 2
    #     col_num = i % 2
    #     cam_data = cam[i]
    #     button_text = f"Camera {i}"
    #     button = tk.Button(button_window, text=button_text,command=lambda cam_data=cam_data: button_callback(cam_data.get('camIndex', '0'),
    #                                                                         cam_data.get('nickName', 'n/a'),
    #                                                                         cam_data.get('licenseId', 'n/a'),
    #                                                                         cam_data.get('userId','n/a')))
    #     button.grid(row=row_num, column=col_num, padx=10, pady=10)
    #     buttons.append(button)
    # rtsp_url = "rtsp://admin:2121@192.168.211.4:8080/h264_ulaw.sdp"
    people_count_arg = "1" if people_count_enabled else "0"
    rtsp_url = rtsp_var.get()
    if(is_index=="True"):     
        for cam_data in cam:
            subprocess.Popen(["python", "main.py", str(cam_data.get('camIndex', '0')),
                            str(cam_data.get('nickName', 'n/a')),
                            str(cam_data.get('licenseId', 'n/a')),
                            str(cam_data.get('userId', 'n/a')),is_index,people_count_arg])
    else:
        for cam_data in cam:
            subprocess.Popen(["python", "main.py", rtsp_url,
                            str(cam_data.get('nickName', 'n/a')),
                            str(cam_data.get('licenseId', 'n/a')),
                            str(cam_data.get('userId', 'n/a')),is_index,people_count_arg])

# the main window
        
root = tk.Tk()
root.title("GeoGuard Security System")
root.geometry("300x150")
icon_path = '../../src/Images/logo.png'

icon_image = tk.PhotoImage(file=icon_path)

# Change the window icon
root.iconphoto(True, icon_image)
# widgets in the window
# Create and configure the username label
label_username = tk.Label(root, text="Email:")
label_username = tk.Label(root, text="Username:")
label_username.grid(row=0, column=0, sticky=tk.E)

# Create and configure the password label
label_password = tk.Label(root, text="Password:")
label_password.grid(row=1, column=0, sticky=tk.E)

# Create and configure the username entry
entry_username = tk.Entry(root)
entry_username.grid(row=0, column=2, pady=10)

# Create and configure the password entry
entry_password = tk.Entry(root, show="*")  # Show '*' for password
entry_password.grid(row=1, column=2, pady=10)

# Create and configure the login button
button_login = tk.Button(root, text="Login", command=authenticate, width=10, height=2)
button_login.grid(row=2, column=1, pady=10)

# Center the widgets
root.columnconfigure(0, weight=1)  # Expand column 0
root.columnconfigure(1, weight=1)  # Expand column 1
root.columnconfigure(2, weight=1)  # Expand column 1
root.rowconfigure(0, weight=1)     # Expand row 0
root.rowconfigure(1, weight=1)     # Expand row 1
root.rowconfigure(2, weight=1)     # Expand row 2

def call_cameras_api():
    # Call the cameras API function in api.js
    cameras_api_endpoint = "http://localhost:3001/api/camera/getCamByUserId"
    headers = {
        "token": token,
        "userid": str(user_info.get("_id", ""))
    }

    try:
        response = requests.get(cameras_api_endpoint, headers=headers)
        if response.status_code == 200:
            cameras_data = response.json()
            cam_by_user = cameras_data.get('camByUser', [])

            if cam_by_user:
                    # Concatenate camera details into a string
                    cameras_info = ""
                    for index, camera in enumerate(cam_by_user, 1):
                        cameras_info += f"Camera {index}:\n"
                        cameras_info += f"  Nickname: {camera.get('nickName', 'N/A')}\n"
                        cameras_info += f"  IP Address: {camera.get('ip','N/A')}\n"
                        cameras_info += f"  License Id:{camera.get('licenseId','n/a')}\n"
                        cameras_info += f"  Index:{camera.get('camIndex','n/a')}\n"
                        cameras_info += f"  Model: {camera.get('model', 'N/A')}\n"
                        cameras_info += f"  Brand: {camera.get('brand', 'N/A')}\n"
                        cameras_info += f"  Resolution: {camera.get('resolution', 'N/A')}\n"
                        cameras_info += f"  FPS: {camera.get('fps', 'N/A')}\n"
                        cameras_info += f"  Location: Lat - {camera['location'].get('lat', 'N/A')}, Lon - {camera['location'].get('lon', 'N/A')}\n\n"
                        global camIndex
                        global camName
                        global userId
                        camIndex=camera.get('camIndex','n/a')
                        camName=camera.get('nickName','n/a')
                        camera.get('userId','n/a')
                    
                    # Display the camera details in a messagebox
                    messagebox.showinfo("Cameras Information", cameras_info)

            else:
                    messagebox.showinfo("No Cameras", "No cameras found for the user.")

        else:
            messagebox.showerror("Error", f"Cameras API returned status code {response.status_code}")
    except requests.RequestException as e:
        messagebox.showerror("Error", f"An error occurred while calling Cameras API: {str(e)}")


# Run the Tkinter event loop
root.mainloop()