# Equipment Rental System

## Overview
The Equipment Rental System is a full-stack application that allows users to browse, book, and manage equipment rentals. The system consists of a backend built with Spring Boot and a frontend developed using React.

## Project Structure
The project is organized into two main directories: `backend` and `frontend`.

### Backend
The backend is implemented in Java using Spring Boot. It includes the following components:

- **Controllers**: Handle incoming requests and manage application logic.
  - `CatalogController`: Manages equipment catalog operations.
  - `BookingController`: Handles booking operations.
  - `AdminController`: Provides administrative functionalities.

- **Models**: Define the data structures used in the application.
  - `Equipment`: Represents equipment available for rent.
  - `Booking`: Represents a booking made by a user.
  - `User`: Represents a user of the rental system.
  - `Deposit`: Represents a deposit made for a booking.

- **Repositories**: Interfaces for database operations.
  - `EquipmentRepository`: CRUD operations for equipment.
  - `BookingRepository`: CRUD operations for bookings.
  - `UserRepository`: CRUD operations for users.

- **Services**: Contain business logic for the application.
  - `CatalogService`: Manages equipment catalogs.
  - `BookingService`: Manages bookings.
  - `AdminService`: Handles administrative tasks.
  - `ConflictResolver`: Resolves booking conflicts.

- **Configuration**: Contains configuration classes for MongoDB and security settings.

- **Main Application**: The entry point of the application is `EquipmentRentalSystemApplication.java`.

### Frontend
The frontend is developed using React and includes the following components:

- **Components**: Reusable UI components.
  - `EquipmentCard`: Displays information about equipment.
  - `BookingForm`: Allows users to create bookings.
  - `AvailabilityCalendar`: Shows equipment availability.
  - `AdminApprovalPanel`: Allows admins to manage bookings.

- **Pages**: Define the main views of the application.
  - `CatalogPage`: Displays the equipment catalog.
  - `BookingPage`: Manages user bookings.
  - `AdminPage`: Provides administrative functionalities.

- **Services**: Handle API calls and business logic.
  - `api.js`: Functions for making API requests.
  - `bookingService.js`: Functions for managing bookings.
  - `equipmentService.js`: Functions for managing equipment.

- **Utilities**: Helper functions for various tasks.
  - `dateUtils.js`: Date manipulation functions.
  - `conflictUtils.js`: Functions for resolving booking conflicts.

## Getting Started
To run the application, follow these steps:

1. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Ensure you have Java and Maven installed.
   - Run `mvn spring-boot:run` to start the backend server.

2. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Ensure you have Node.js and npm installed.
   - Run `npm install` to install dependencies.
   - Run `npm start` to start the frontend application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.