# QuizApp Frontend

This project is a modern React + Vite frontend for a microservices-based quiz system. It uses Material-UI for a beautiful, responsive UI. All API calls are routed through the API Gateway at `http://localhost:8765`.

## Features
- List all questions
- Add a new question
- List quizzes
- Create a quiz
- Take a quiz

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:
   ```sh
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Gateway
All backend requests are made via the API Gateway (e.g., `http://localhost:8765/question-service/question/allQuestions`).

## UI
Material-UI (MUI) is used for all UI components. Customize the theme as needed for a modern look.

---
