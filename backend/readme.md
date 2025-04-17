# User Routes Documentation

This document provides an overview of the user-related API routes, including the sample request data and responses.

---

## 1. **User Registration**

**Endpoint:** `POST /signup`  
**Description:** Registers a new user.

### Sample Request:
```json
{
    "fullname": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123"
}
```

### Sample Response:
- **Success (201):**
```json
{
    "msg": "User created successfully",
    "user": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "fullname": "John Doe",
        "email": "johndoe@example.com"
    },
    "token": "jwt-token-here"
}
```
- **Error (400):**
```json
{
    "msg": "User already exists"
}
```

---

## 2. **User Login**

**Endpoint:** `POST /signin`  
**Description:** Logs in an existing user.

### Sample Request:
```json
{
    "email": "johndoe@example.com",
    "password": "password123"
}
```

### Sample Response:
- **Success (200):**
```json
{
    "msg": "User logged in successfully",
    "user": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "fullname": "John Doe",
        "email": "johndoe@example.com"
    },
    "token": "jwt-token-here"
}
```
- **Error (400):**
```json
{
    "msg": "Invalid password"
}
```

---

## 3. **Get User Profile**

**Endpoint:** `GET /me`  
**Description:** Retrieves the logged-in user's profile.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "User profile",
    "user": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "fullname": "John Doe",
        "email": "johndoe@example.com"
    }
}
```

---

## 4. **Update User Profile**

**Endpoint:** `PUT /updateProfile`  
**Description:** Updates the logged-in user's profile.

### Sample Request:
```json
{
    "fullname": "John Smith",
    "email": "johnsmith@example.com"
}
```

### Sample Response:
- **Success (200):**
```json
{
    "msg": "User updated successfully",
    "user": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "fullname": "John Smith",
        "email": "johnsmith@example.com"
    }
}
```
- **Error (400):**
```json
{
    "msg": "No valid fields provided for update"
}
```

---

## 5. **Delete User Profile**

**Endpoint:** `DELETE /deleteProfile`  
**Description:** Deletes the logged-in user's profile.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "User deleted successfully",
    "user": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "fullname": "John Doe",
        "email": "johndoe@example.com"
    }
}
```
- **Error (404):**
```json
{
    "msg": "User not found"
}
```

---

## 6. **Logout User**

**Endpoint:** `POST /logout`  
**Description:** Logs out the user by blacklisting the token.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "User logged out successfully"
}
```

---

## 7. **Check Donate Form Submission**

**Endpoint:** `GET /is-donate-form-submitted`  
**Description:** Checks if the user has submitted the blood donation form.

### Sample Response:
- **Submitted (200):**
```json
{
    "submitted": true,
    "form": {
        "user": "64f1c2e5b5d6c2a1f8e7a9b3",
        "bloodType": "A+",
        "healthStatus": "good",
        "location": {
            "ltd": 28.7041,
            "lng": 77.1025
        },
        "availability": {
            "date": "2023-10-01T00:00:00.000Z",
            "city": "New Delhi"
        },
        "contact": "9876543210",
        "weight": 70,
        "age": 25
    }
}
```
- **Not Submitted (200):**
```json
{
    "submitted": false,
    "msg": "form not submitted"
}
```

---

# Organization Routes Documentation

This document provides an overview of the organization-related API routes, including the sample request data and responses.

---

## 1. **Organization Registration**

**Endpoint:** `POST /org/signup`  
**Description:** Registers a new organization.

### Sample Request:
```json
{
    "orgName": "Red Cross",
    "email": "redcross@example.com",
    "password": "securepassword",
    "address": "123 Main Street, City",
    "orgType": "bloodbank",
    "contactNumber": "9876543210",
    "registrationNumber": "REG12345"
}
```

### Sample Response:
- **Success (201):**
```json
{
    "msg": "Organization created successfully",
    "org": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "orgName": "Red Cross",
        "email": "redcross@example.com",
        "orgType": "bloodbank",
        "contactNumber": "9876543210"
    },
    "token": "jwt-token-here"
}
```
- **Error (400):**
```json
{
    "msg": "Organization already exists"
}
```

---

## 2. **Organization Login**

**Endpoint:** `POST /org/signin`  
**Description:** Logs in an existing organization.

### Sample Request:
```json
{
    "email": "redcross@example.com",
    "password": "securepassword"
}
```

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Organization logged in successfully",
    "org": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "orgName": "Red Cross",
        "email": "redcross@example.com"
    },
    "token": "jwt-token-here"
}
```
- **Error (400):**
```json
{
    "msg": "Invalid password"
}
```

---

## 3. **Get Organization Profile**

**Endpoint:** `GET /org/me`  
**Description:** Retrieves the logged-in organization's profile.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Organization profile",
    "org": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "orgName": "Red Cross",
        "email": "redcross@example.com",
        "orgType": "bloodbank",
        "contactNumber": "9876543210"
    },
    "totalUnits": 120
}
```

---

## 4. **Logout Organization**

**Endpoint:** `POST /org/logout`  
**Description:** Logs out the organization by blacklisting the token.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Organization logged out successfully"
}
```

---

## 5. **Delete Organization**

**Endpoint:** `DELETE /org/delete`  
**Description:** Deletes the logged-in organization's profile.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Organization deleted successfully",
    "org": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "orgName": "Red Cross",
        "email": "redcross@example.com"
    }
}
```
- **Error (404):**
```json
{
    "msg": "Organization not found"
}
```

---

## 6. **Get Blood Stock**

**Endpoint:** `GET /org/blood-stock`  
**Description:** Retrieves the blood stock of the organization.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Blood Stock",
    "bloodStock": {
        "A+": 10,
        "A-": 5,
        "B+": 8,
        "B-": 4,
        "AB+": 6,
        "AB-": 2,
        "O+": 12,
        "O-": 3
    }
}
```
- **Error (400):**
```json
{
    "msg": "Blood Stock not found"
}
```

---

## 7. **Update Blood Stock**

**Endpoint:** `PATCH /org/blood-stock`  
**Description:** Updates the blood stock of the organization.

### Sample Request:
```json
{
    "bloodType": "A+",
    "units": 5,
    "action": "add"
}
```

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Blood Stock updated",
    "updatedStock": {
        "A+": 15,
        "A-": 5,
        "B+": 8,
        "B-": 4,
        "AB+": 6,
        "AB-": 2,
        "O+": 12,
        "O-": 3
    }
}
```
- **Error (400):**
```json
{
    "msg": "Blood Stock not updated"
}
```

---

## 8. **Donate Blood**

**Endpoint:** `POST /org/donate-blood`  
**Description:** Submits blood donation data for the organization.

### Sample Request:
```json
{
    "bloodGroups": {
        "A+": 5,
        "B+": 3,
        "O+": 7
    }
}
```

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Submitted Successfully",
    "donation": {
        "bloodGroups": {
            "A+": 5,
            "B+": 3,
            "O+": 7
        },
        "totalUnits": 15
    }
}
```

---

## 9. **Get Donation Data**

**Endpoint:** `GET /org/donate-blood`  
**Description:** Retrieves the blood donation data of the organization.

### Sample Response:
- **Success (200):**
```json
{
    "msg": "Donation data retrieved successfully",
    "donation": {
        "bloodGroups": {
            "A+": 5,
            "B+": 3,
            "O+": 7
        },
        "totalUnits": 15
    }
}
```

---

## 10. **Request Blood Form**

**Endpoint:** `POST /org/request-blood-form`  
**Description:** Submits a blood request form for the organization.

### Sample Request:
```json
{
    "bloodType": "A+",
    "amount": 10
}
```

### Sample Response:
- **Success (200):**
```json
{
    "message": "Request blood form Submitted",
    "requestForm": {
        "organization": "64f1c2e5b5d6c2a1f8e7a9b3",
        "bloodType": "A+",
        "amount": 10
    }
}
```

---

## 11. **Find Nearby Donors and Organizations**

**Endpoint:** `GET /org/nearby-donors-orgs`  
**Description:** Finds nearby donors and organizations based on the organization's location and requested blood type.

### Sample Response:
- **Success (200):**
```json
{
    "message": "Nearby donors and organizations found",
    "results": [
        {
            "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
            "name": "John Doe",
            "type": "user",
            "distance": 5.2,
            "duration": "10 mins",
            "bloodGroup": "A+",
            "contact": "9876543210",
            "availability": "2023-10-01T00:00:00.000Z",
            "weight": 70,
            "age": 25,
            "location": {
                "ltd": 28.7041,
                "lng": 77.1025
            },
            "email": "johndoe@example.com"
        },
        {
            "_id": "64f1c2e5b5d6c2a1f8e7a9b4",
            "name": "Red Cross",
            "type": "bloodbank",
            "distance": 3.1,
            "duration": "5 mins",
            "units": 20,
            "contact": "9876543210",
            "location": {
                "ltd": 28.7041,
                "lng": 77.1025
            },
            "email": "redcross@example.com",
            "bloodStock": {
                "A+": 10,
                "B+": 5,
                "O+": 5
            }
        }
    ]
}
```
- **Error (400):**
```json
{
    "message": "Request blood form not found"
}
```

---

# Location Routes Documentation

This document provides an overview of the location-related API routes, including the sample request data and responses.

---

## 1. **Get Distance and Time**

**Endpoint:** `GET /location/get-distance-time`  
**Description:** Retrieves the distance and estimated travel time between two locations.

### Sample Request:
```http
GET /location/get-distance-time?origin=New+Delhi&destination=Mumbai
```

### Sample Response:
- **Success (200):**
```json
{
    "distance": {
        "text": "1,408 km",
        "value": 1408000
    },
    "duration": {
        "text": "23 hours 30 mins",
        "value": 84600
    },
    "status": "OK"
}
```
- **Error (400):**
```json
{
    "errors": [
        {
            "msg": "Origin should be a string",
            "param": "origin",
            "location": "query"
        }
    ]
}
```

---

## 2. **Get Auto Suggestions**

**Endpoint:** `GET /location/autoSuggestion`  
**Description:** Provides location suggestions based on user input.

### Sample Request:
```http
GET /location/autoSuggestion?input=New+Del
```

### Sample Response:
- **Success (200):**
```json
[
    {
        "description": "New Delhi, Delhi, India",
        "place_id": "ChIJLbZ-NFv9DDkRzk0gTkm3wlI"
    },
    {
        "description": "New Delhi Railway Station, Ajmeri Gate, Delhi, India",
        "place_id": "ChIJLz2bNFv9DDkRzj0gTkm3wlI"
    }
]
```
- **Error (400):**
```json
{
    "errors": [
        {
            "msg": "Input should be a string",
            "param": "input",
            "location": "query"
        }
    ]
}
```

---

# Blood Routes Documentation

This document provides an overview of the blood-related API routes, including the sample request data and responses.

---

## 1. **Donate Blood Form**

**Endpoint:** `POST /blood/donate-blood-form`  
**Description:** Submits a blood donation form for a user.

### Sample Request:
```json
{
    "bloodType": "A+",
    "healthStatus": "good",
    "availability": {
        "date": "2023-10-01T00:00:00.000Z",
        "city": "New Delhi"
    },
    "homeAddress": "123 Main Street, New Delhi",
    "contactNumber": "9876543210",
    "weight": 70,
    "age": 25
}
```

### Sample Response:
- **Success (200):**
```json
{
    "message": "Form Successfully Submitted",
    "donateForm": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "bloodType": "A+",
        "healthStatus": "good",
        "availability": {
            "date": "2023-10-01T00:00:00.000Z",
            "city": "New Delhi"
        },
        "contact": "9876543210",
        "weight": 70,
        "age": 25
    }
}
```
- **Error (400):**
```json
{
    "message": "Form not Submitted"
}
```

---

## 2. **Delete Donate Blood Form**

**Endpoint:** `DELETE /blood/delete-donate-blood-form`  
**Description:** Deletes the blood donation form for a user.

### Sample Response:
- **Success (200):**
```json
{
    "message": "Request blood form deleted successfully"
}
```
- **Error (404):**
```json
{
    "message": "Request not found"
}
```

---

## 3. **Request Blood Form**

**Endpoint:** `POST /blood/request-blood-form`  
**Description:** Submits a blood request form for a user.

### Sample Request:
```json
{
    "bloodType": "A+",
    "amount": 2,
    "address": "123 Main Street, New Delhi",
    "contact": "9876543210",
    "cause": "Emergency surgery",
    "status": true
}
```

### Sample Response:
- **Success (200):**
```json
{
    "message": "Request blood form Submitted",
    "requestForm": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "bloodType": "A+",
        "amount": 2,
        "contact": "9876543210",
        "cause": "Emergency surgery",
        "status": true
    }
}
```
- **Error (400):**
```json
{
    "message": "Request blood form not submitted"
}
```

---

## 4. **Update Request Blood Form**

**Endpoint:** `POST /blood/request-blood-form-update`  
**Description:** Updates an existing blood request form for a user.

### Sample Request:
```json
{
    "amount": 3,
    "status": false
}
```

### Sample Response:
- **Success (200):**
```json
{
    "message": "Request blood form updated",
    "updatedRequestForm": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "bloodType": "A+",
        "amount": 3,
        "status": false
    }
}
```
- **Error (404):**
```json
{
    "message": "Request not found"
}
```

---

## 5. **Delete Request Blood Form**

**Endpoint:** `DELETE /blood/delete-request-blood-form`  
**Description:** Deletes a blood request form for a user.

### Sample Response:
- **Success (200):**
```json
{
    "message": "Request blood form deleted successfully"
}
```
- **Error (404):**
```json
{
    "message": "Request not found"
}
```

---

## 6. **Find Nearby Donors and Organizations**

**Endpoint:** `GET /blood/nearby-donors-orgs`  
**Description:** Finds nearby donors and organizations based on the user's location and requested blood type.

### Sample Response:
- **Success (200):**
```json
{
    "message": "Nearby donors and organizations found",
    "results": [
        {
            "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
            "name": "John Doe",
            "type": "user",
            "distance": "5.2 km",
            "duration": "10 mins",
            "bloodGroup": "A+",
            "contact": "9876543210",
            "availability": "2023-10-01T00:00:00.000Z",
            "weight": 70,
            "age": 25,
            "location": {
                "ltd": 28.7041,
                "lng": 77.1025
            },
            "email": "johndoe@example.com"
        },
        {
            "_id": "64f1c2e5b5d6c2a1f8e7a9b4",
            "name": "Red Cross",
            "type": "bloodbank",
            "distance": "3.1 km",
            "duration": "5 mins",
            "units": 20,
            "contact": "9876543210",
            "location": {
                "ltd": 28.7041,
                "lng": 77.1025
            },
            "email": "redcross@example.com",
            "bloodStock": {
                "A+": 10,
                "B+": 5,
                "O+": 5
            }
        }
    ]
}
```
- **Error (400):**
```json
{
    "message": "Request blood form not found"
}
```

---

# Chat Routes and Socket.IO Documentation

This document provides an overview of the chat-related API routes and Socket.IO events, including the sample request data and responses.

---

## Chat Routes

### 1. **Start or Get Existing Chat**

**Endpoint:** `POST /chat/start`  
**Description:** Starts a new chat or retrieves an existing chat between two participants.

#### Sample Request:
```json
{
    "participantId": "64f1c2e5b5d6c2a1f8e7a9b3"
}
```

#### Sample Response:
- **Success (200):**
```json
{
    "_id": "64f1c2e5b5d6c2a1f8e7a9b4",
    "participants": [
        "64f1c2e5b5d6c2a1f8e7a9b3",
        "64f1c2e5b5d6c2a1f8e7a9b5"
    ],
    "participantModels": ["user", "organization"],
    "lastMessage": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b6",
        "content": "Hello, I need blood urgently.",
        "timestamp": "2023-10-01T10:00:00.000Z"
    }
}
```

---

### 2. **Get All Chats**

**Endpoint:** `GET /chat/all`  
**Description:** Retrieves all chats for the authenticated user or organization.

#### Sample Response:
- **Success (200):**
```json
[
    {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b4",
        "participants": [
            {
                "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
                "fullname": "John Doe",
                "email": "johndoe@example.com"
            }
        ],
        "lastMessage": {
            "_id": "64f1c2e5b5d6c2a1f8e7a9b6",
            "content": "Hello, I need blood urgently.",
            "timestamp": "2023-10-01T10:00:00.000Z"
        },
        "unreadCount": 2
    }
]
```

---

### 3. **Get Messages for a Chat**

**Endpoint:** `GET /chat/messages/:chatId`  
**Description:** Retrieves all messages for a specific chat.

#### Sample Response:
- **Success (200):**
```json
[
    {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b6",
        "chat": "64f1c2e5b5d6c2a1f8e7a9b4",
        "sender": {
            "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
            "fullname": "John Doe"
        },
        "content": "Hello, I need blood urgently.",
        "timestamp": "2023-10-01T10:00:00.000Z",
        "read": false
    }
]
```

---

### 4. **Mark Messages as Read**

**Endpoint:** `POST /chat/read`  
**Description:** Marks specific messages as read.

#### Sample Request:
```json
{
    "messageIds": ["64f1c2e5b5d6c2a1f8e7a9b6", "64f1c2e5b5d6c2a1f8e7a9b7"]
}
```

#### Sample Response:
- **Success (200):**
```json
{
    "success": true
}
```

---

### 5. **Delete Chat**

**Endpoint:** `DELETE /chat/:chatId`  
**Description:** Deletes a specific chat and all its messages.

#### Sample Response:
- **Success (200):**
```json
{
    "success": true
}
```

---

### 6. **Get Authenticated User/Organization Data**

**Endpoint:** `GET /chat/auth-data`  
**Description:** Retrieves the authenticated user's or organization's data.

#### Sample Response:
- **Success (200):**
```json
{
    "user": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b3",
        "fullname": "John Doe",
        "email": "johndoe@example.com"
    },
    "org": null,
    "type": "user"
}
```

---

## Socket.IO Events

### 1. **Join**

**Event:** `join`  
**Description:** Joins a user or organization to the socket server.

#### Sample Data:
```json
{
    "userId": "64f1c2e5b5d6c2a1f8e7a9b3",
    "userType": "user"
}
```

---

### 2. **Send Message**

**Event:** `sendMessage`  
**Description:** Sends a message in a chat.

#### Sample Data:
```json
{
    "chatId": "64f1c2e5b5d6c2a1f8e7a9b4",
    "content": "Hello, I need blood urgently.",
    "senderId": "64f1c2e5b5d6c2a1f8e7a9b3",
    "senderType": "user"
}
```

#### Sample Callback Response:
- **Success:**
```json
{
    "success": true,
    "message": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b6",
        "content": "Hello, I need blood urgently.",
        "timestamp": "2023-10-01T10:00:00.000Z"
    }
}
```

---

### 3. **New Message Notification**

**Event:** `newMessage`  
**Description:** Notifies all participants in a chat about a new message.

#### Sample Data:
```json
{
    "chatId": "64f1c2e5b5d6c2a1f8e7a9b4",
    "message": {
        "_id": "64f1c2e5b5d6c2a1f8e7a9b6",
        "content": "Hello, I need blood urgently.",
        "timestamp": "2023-10-01T10:00:00.000Z"
    }
}
```

---

### 4. **Mark Messages as Read**

**Event:** `markRead`  
**Description:** Marks specific messages as read.

#### Sample Data:
```json
{
    "messageIds": ["64f1c2e5b5d6c2a1f8e7a9b6", "64f1c2e5b5d6c2a1f8e7a9b7"],
    "chatId": "64f1c2e5b5d6c2a1f8e7a9b4"
}
```

---

### 5. **Messages Read Notification**

**Event:** `messagesRead`  
**Description:** Notifies participants when messages are marked as read.

#### Sample Data:
```json
{
    "messageIds": ["64f1c2e5b5d6c2a1f8e7a9b6", "64f1c2e5b5d6c2a1f8e7a9b7"]
}
```

---

### 6. **Disconnect**

**Event:** `disconnect`  
**Description:** Handles user disconnection and removes them from the connected users list.

---

# Chatbot Route Documentation

This document provides an overview of the chatbot-related API route, including the sample request data and responses.

---

## 1. **Ask Chatbot**

**Endpoint:** `POST /chatbot/ask`  
**Description:** Sends a question to the chatbot and retrieves an answer.

### Sample Request:
```json
{
    "question": "What are the symptoms of anemia?"
}
```

### Sample Response:
- **Success (200):**
```json
{
    "answer": "The symptoms of anemia include fatigue, weakness, pale skin, shortness of breath, and dizziness. If you suspect anemia, consult a healthcare professional for proper diagnosis and treatment."
}
```
- **Error (500):**
```json
{
    "message": "Internal Server Error"
}
```

---
