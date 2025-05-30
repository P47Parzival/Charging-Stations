# Charging Stations Management System

A full-stack application for managing electric vehicle charging stations, built with Vue.js and Node.js.

## Features

- User Authentication (JWT)
- CRUD Operations for Charging Stations
- Interactive Map View
- Station Filtering
- Responsive Design

## Tech Stack

### Frontend
- Vue.js 3
- Vue Router
- Pinia (State Management)
- Leaflet (Maps)
- Axios (HTTP Client)
- Vue Toastification
- Deployed link = https://charging-stations-jade.vercel.app/login

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose (ODM)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/charging-stations
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Charging Stations
- `GET /api/stations` - Get all charging stations
- `POST /api/stations` - Create a new charging station (protected)
- `PUT /api/stations/:id` - Update a charging station (protected)
- `DELETE /api/stations/:id` - Delete a charging station (protected)

## Charging Station Schema

```javascript
{
  name: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number] // [longitude, latitude]
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  powerOutput: Number, // in kW
  connectorType: String
}
```

## Features

### User Authentication
- Secure user registration and login
- JWT-based authentication
- Protected routes for station management

### Charging Station Management
- Create new charging stations
- View all stations in a list
- Update station details
- Delete stations
- Filter stations by status, power output, and connector type

### Map Integration
- Interactive map view of all stations
- Click markers to view station details
- Automatic centering on first station
- Smooth zooming and panning

## Development

### Backend Development
- RESTful API design
- MongoDB with Mongoose
- JWT authentication middleware
- Error handling and validation

### Frontend Development
- Vue 3 Composition API
- Component-based architecture
- Responsive design
- Interactive map integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - dhurvmali999@gmail.com

Project Link: [https://github.com/P47Parzival/Charging-Stations](https://github.com/P47Parzival/Charging-Stations)
