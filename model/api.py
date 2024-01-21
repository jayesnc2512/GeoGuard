import os
import requests

def alert(msg,name,lid,userId):
# URL of the createAlert API endpoint
    api_url = "http://localhost:3001/api/alert/createAlert"
    messages_endpoint = "http://localhost:3001/api/twilio/messages"


    # Example request data
    request_data = {
        "toOwnerId": userId,
        "message":f"Your camera {name} has {msg}",
        "camLid": lid
    }

    admin_request_data = {
        "toOwnerId": userId,
        "message":f"The camera {name} \n Lid= {lid} for \n user {userId} has {msg}",
        "camLid": lid
    }

    

    # Example headers with the token
    headers = {
        "token": "your_token_here"
    }

    try:
        # Send POST request to the createAlert API
        response = requests.post(api_url, json=request_data, headers=headers)


        # Check the response status code
        if response.status_code == 200:
            # Print the success message and created alert information
            json_response = response.json()
            print("Success:", json_response.get("success"))
            print("Message:", json_response.get("message"))
            print("Created Alert:", json_response.get("newAlert"))
            messages_request_data = {
                "to": "+919699312121",  # Replace with your actual environment variable name
                "body": msg  # Update with the actual message body
            }

            admin_messages_request_data = {
                "to": "+919834624338",  # Replace with your actual environment variable name
                "body": msg  # Update with the actual message body
            }

            messages_response = requests.post(messages_endpoint, json=messages_request_data)
            # messages_response2 = requests.post(messages_endpoint, json=admin_messages_request_data)


            # Check the response status code for the /messages request
            if messages_response.status_code == 200:
                print("Message sent successfully")
            else:
                print(f"Error sending message: {messages_response.status_code}")
                print(messages_response.json())
            # if messages_response2.status_code == 200:
            #     print("Message sent successfully to admin")
            # else:
            #     print(f"Error sending message: {messages_response2.status_code}")
            #     print(messages_response.json())
        else:
            # Print the error message
            print(f"Error: {response.status_code}")
            print(response.json())

    except requests.RequestException as e:
        # Handle exceptions such as network errors
        print(f"An error occurred: {str(e)}")
