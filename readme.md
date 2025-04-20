# Blood Donation Website

This project is a **Blood Donation Management System** designed to connect blood donors, recipients, and organizations like blood banks, hospitals, and NGOs. It provides a platform for users to donate blood, request blood, and manage blood stock efficiently.

---

## Features

### 1. **User Features**
- **User Registration & Login**: Users can register and log in to the platform.
- **Profile Management**: Users can view and update their profile.
- **Blood Donation**: Users can submit a blood donation form with details like blood type, availability, and health status.
- **Request Blood**: Users can request blood by specifying the blood type, quantity, and location.
- **Nearby Donors & Organizations**: Users can find nearby donors and organizations based on their location and blood type.
- **Chat System**: Users can communicate with donors or organizations via a chat interface.
- **Chatbot Assistance**: Users can interact with a chatbot for FAQs and assistance.

### 2. **Organization Features**
- **Organization Registration & Login**: Organizations can register and log in to the platform.
- **Profile Management**: Organizations can view and update their profile.
- **Blood Stock Management**: Organizations can manage their blood inventory by adding or removing units.
- **Request Blood**: Organizations can request blood for emergencies or stock replenishment.
- **Nearby Donors & Organizations**: Organizations can find nearby donors and other organizations.
- **Chat System**: Organizations can communicate with donors or other organizations via a chat interface.

---

## How It Works

### 1. **Frontend**
The frontend is built using **React.js** and provides an intuitive user interface for users and organizations. Key components include:
- **Pages**: Home, Profile, Request Blood, Donate Blood, Chat, etc.
- **Components**: Reusable UI components like forms, modals, and location search panels.
- **Routing**: React Router is used for navigation between pages.

### 2. **Backend**
The backend is built using **Node.js** and **Express.js**. It provides RESTful APIs for:
- User and organization authentication.
- Blood donation and request management.
- Chat functionality using **Socket.IO**.
- Integration with Google Maps API for location-based services.

### 3. **Database**
The project uses **MongoDB** as the database to store user, organization, blood stock, and chat data.

---

## Environment Setup

### 1. **Backend**
Create a `.env` file in the `backend` directory with the following variables:
```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 2. **Frontend**
Create a `.env` file in the `frontend` directory with the following variable:
```
VITE_BASE_URL=http://localhost:3000
```

---

## Installation and Usage

### 1. **Clone the Repository**
```bash
git clone https://github.com/your-repo/blood-donation-website.git
cd blood-donation-website
```

### 2. **Backend Setup**
- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the backend server:
  ```bash
  npm start
  ```

### 3. **Frontend Setup**
- Navigate to the frontend directory:
  ```bash
  cd frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the frontend development server:
  ```bash
  npm run dev
  ```

### 4. **Access the Application**
- Open your browser and navigate to `http://localhost:5173` to access the frontend.
- The backend server runs on `http://localhost:3000`.

---

## API Documentation
For detailed API documentation, refer to the [Backend API Documentation](./backend/readme.md).

---

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB
- **APIs**: Google Maps API

---

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

## License
This project is licensed under the MIT License.
