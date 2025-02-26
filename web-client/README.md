# EasyBank - Web Client

## Overview

EasyBank Web Client is a modern, responsive Single Page Application built with React.js and TypeScript. This application serves as the front-end interface for the EasyBank Microservice Core, providing users with a seamless experience for managing bank customers and accounts.

## Features

- **Dashboard**: Overview of customers and accounts
- **Customer Management**: 
  - View all customers
  - Add new customers
  - Search customers by ID
  - View customer details
- **Account Management**:
  - Create accounts (Current or Savings)
  - View account details
  - List accounts by customer

## Tech Stack

- **React.js**: Library for building the user interface
- **TypeScript**: For type-safe code
- **React Router**: For navigation and routing
- **Axios**: For HTTP requests to the backend API
- **Material-UI**: For responsive and modern UI components
- **React Query**: For data fetching and state management

## Project Structure

```
src/
├── assets/         # Static files like images, fonts
├── components/     # Reusable UI components
│   ├── common/     # Shared components like buttons, inputs
│   ├── layout/     # Layout components
│   ├── customers/  # Customer-related components
│   └── accounts/   # Account-related components
├── pages/          # Page components
│   ├── Dashboard/
│   ├── Customers/
│   └── Accounts/
├── services/       # API service layer
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── types/          # TypeScript type definitions
├── contexts/       # React context providers
└── App.tsx         # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- EasyBank Microservice Core (backend) running

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/bachiriy/EasyBank
   cd web-client
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   REACT_APP_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```
   npm start
   ```
   or
   ```
   yarn start
   ```

The application will be available at `http://localhost:3000`.

## Development Guidelines

### Code Style

- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use ES6+ features
- Use functional components with hooks
- Document components with JSDoc comments

### State Management

- Use React Query for server state
- Use React Context for global application state
- Use local state for component-specific state

### API Communication

- All API calls should go through the service layer
- Handle loading, error, and success states appropriately
- Implement proper error handling and user feedback

### Testing

- Write unit tests for components using Jest and React Testing Library
- Test API service functions using mock responses

## Build and Deployment

### Build for Production

```
npm run build
```
or
```
yarn build
```

This will create an optimized production build in the `build/` directory.

### Deployment

The built application can be deployed to any static hosting service like Netlify, Vercel, or AWS S3.

## Next Steps and Future Improvements

- [ ] Add authentication and authorization
- [ ] Implement transaction history
- [ ] Add advanced filtering and search capabilities
- [ ] Implement data visualization for account statistics
- [ ] Add internationalization (i18n) support

## License

This project is licensed under the MIT License.
