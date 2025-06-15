import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Toolbar,
  Stack
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import axios from 'axios';

const TakeQuiz = () => {
  const [quizId, setQuizId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');

  const fetchQuiz = async () => {
    setError('');
    setSubmitted(false);
    setScore(null);
    try {
      const res = await axios.post('http://localhost:8765/quiz-service/quiz/get/' + quizId);
      setQuestions(res.data);
      setResponses({});
    } catch (err) {
      setError('Quiz not found or error fetching quiz.');
      setQuestions([]);
    }
  };

  const handleOptionChange = (qid, value) => {
    setResponses({ ...responses, [qid]: value });
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitted(false);
    setScore(null);
    try {
      const answers = questions.map(q => ({
        questionId: q.id,
        response: responses[q.id] || ''
      }));
      const res = await axios.post('http://localhost:8765/quiz-service/quiz/submit/' + quizId, answers);
      setScore(res.data);
      setSubmitted(true);
    } catch (err) {
      setError('Error submitting quiz.');
    }
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="sm" sx={{ mt: 10, mb: 4 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 5, background: 'linear-gradient(135deg, #e3f2fd 60%, #fff 100%)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)' }}>
          <Stack alignItems="center" spacing={2} mb={2}>
            <QuizIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h3" fontWeight={800} color="#1976d2">
              Take a Quiz
            </Typography>
          </Stack>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
            <TextField
              label="Quiz ID"
              value={quizId}
              onChange={e => setQuizId(e.target.value)}
              size="medium"
              sx={{ mr: 2, width: 180 }}
            />
            <Button variant="contained" onClick={fetchQuiz} size="large" sx={{ borderRadius: 3, fontWeight: 700 }}>
              Fetch Quiz
            </Button>
          </Box>
          {questions.length > 0 && (
            <Box mt={4}>
              <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                {questions.map((q, idx) => (
                  <Box key={q.id} mb={3}>
                    <Typography variant="h6" fontWeight={700} color="#1976d2" mb={1}>
                      Q{idx + 1}. {q.questionTitle}
                    </Typography>
                    <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} maxWidth={400} mx="auto">
                      {q.option1 && <Button variant={responses[q.id] === q.option1 ? 'contained' : 'outlined'} onClick={() => handleOptionChange(q.id, q.option1)} sx={{ fontWeight: 600, whiteSpace: 'normal', wordBreak: 'break-word', minHeight: 48 }}>{q.option1}</Button>}
                      {q.option2 && <Button variant={responses[q.id] === q.option2 ? 'contained' : 'outlined'} onClick={() => handleOptionChange(q.id, q.option2)} sx={{ fontWeight: 600, whiteSpace: 'normal', wordBreak: 'break-word', minHeight: 48 }}>{q.option2}</Button>}
                      {q.option3 && <Button variant={responses[q.id] === q.option3 ? 'contained' : 'outlined'} onClick={() => handleOptionChange(q.id, q.option3)} sx={{ fontWeight: 600, whiteSpace: 'normal', wordBreak: 'break-word', minHeight: 48 }}>{q.option3}</Button>}
                      {q.option4 && <Button variant={responses[q.id] === q.option4 ? 'contained' : 'outlined'} onClick={() => handleOptionChange(q.id, q.option4)} sx={{ fontWeight: 600, whiteSpace: 'normal', wordBreak: 'break-word', minHeight: 48 }}>{q.option4}</Button>}
                    </Box>
                  </Box>
                ))}
                <Button type="submit" variant="contained" size="large" fullWidth sx={{ borderRadius: 3, fontWeight: 700, mt: 2 }}>
                  Submit Quiz
                </Button>
              </form>
            </Box>
          )}
          {submitted && score !== null && (
            <Alert severity="success" sx={{ mt: 4, fontSize: 18 }}>
              Your Score: {score}
            </Alert>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default TakeQuiz;
