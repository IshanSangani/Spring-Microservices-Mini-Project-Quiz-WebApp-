import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import QuestionsList from './pages/QuestionsList';
import AddQuestion from './pages/AddQuestion';
import QuizzesList from './pages/QuizzesList';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import CreateQuizWithQuestions from './pages/CreateQuizWithQuestions';
import Home from './pages/Home';
import Login from './pages/Login';

const isAdmin = () => localStorage.getItem('isAdmin') === 'true';

const ProtectedRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  const [admin, setAdmin] = useState(isAdmin());
  return (
    <Router>
      <NavBar isAdmin={admin} setAdmin={setAdmin} />
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setAdmin(true)} />} />
        <Route path="/" element={<Home isAdmin={admin} />} />
        <Route path="/add-question" element={<ProtectedRoute><AddQuestion /></ProtectedRoute>} />
        <Route path="/questions" element={<ProtectedRoute><QuestionsList /></ProtectedRoute>} />
        <Route path="/quizzes" element={<QuizzesList />} />
        <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
        <Route path="/take-quiz" element={<TakeQuiz />} />
        <Route path="/create-quiz-with-questions" element={<ProtectedRoute><CreateQuizWithQuestions /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
