# Spring Microservices Mini Project: Quiz WebApp

This project is a microservices-based Quiz Web Application built with Spring Boot (Java) for the backend and React (Vite) for the frontend. It demonstrates a modular, scalable architecture using service discovery, API gateway, and secure admin features.

## Project Structure

```
MicroserviceTutorials-main/
│
├── api-gateway/           # Spring Cloud Gateway for routing and security
├── Frontend/              # React (Vite) frontend app
├── question-service/      # Microservice for managing questions
├── quiz-service/          # Microservice for managing quizzes
└── service-registry/      # Eureka server for service discovery
```

## Features
- **Admin authentication** (Spring Security + frontend login)
- **Add, view, and manage questions** (admin only)
- **Create quizzes** (auto or manual question selection)
- **Take quizzes** (students)
- **Service discovery** (Eureka)
- **API Gateway** (Spring Cloud Gateway)
- **Modern UI** (Material UI, responsive design)
- **Role-based UI** (admin vs student)

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js (v18+ recommended)
- Maven
- Git

### 1. Clone the Repository
```sh
git clone https://github.com/IshanSangani/Spring-Microservices-Mini-Project-Quiz-WebApp-.git
cd Spring-Microservices-Mini-Project-Quiz-WebApp-
```

### 2. Start the Backend Services
Open separate terminals for each service:

#### Service Registry (Eureka)
```sh
cd service-registry
mvn spring-boot:run
```

#### API Gateway
```sh
cd api-gateway
mvn spring-boot:run
```

#### Question Service
```sh
cd question-service
mvn spring-boot:run
```

#### Quiz Service
```sh
cd quiz-service
mvn spring-boot:run
```

### 3. Start the Frontend
```sh
cd Frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173)

## Admin Login
- Username: `admin`
- Password: `admin123`

Only admins can add/view questions and create quizzes. Students can only take quizzes.

## API Endpoints
- All backend services expose REST APIs (see controller classes for details).
- The API Gateway routes requests to the appropriate microservice.

## Security
- Admin-only endpoints are protected by Spring Security (HTTP Basic Auth).
- Frontend uses a simple login form and localStorage for admin session.

## Customization
- To add more categories, update the frontend Autocomplete in `CreateQuizWithQuestions.jsx`.
- To add more admin users, update the Spring Security config in `question-service`.

## License
This project is for educational/demo purposes.
