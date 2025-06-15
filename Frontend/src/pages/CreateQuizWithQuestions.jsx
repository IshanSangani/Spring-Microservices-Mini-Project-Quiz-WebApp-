import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Toolbar,
  Typography,
  Box,
  Alert,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  TextField,
  Tabs,
  Tab,
  Stack,
  Autocomplete
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

const categoryOptions = ['Java', 'C++', 'Python', 'JavaScript'];

const CreateQuizWithQuestions = () => {
  const [mode, setMode] = useState('auto');
  const [quiz, setQuiz] = useState({ title: '', categoryName: '', numQuestions: '' });
  const [question, setQuestion] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    category: '',
    difficultylevel: '' // <-- Add this
  });
  const [questions, setQuestions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [quizId, setQuizId] = useState(null); // Add this state

  // Handle quiz form change
  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  // Handle question form change
  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  // Add question to local list
  const handleAddQuestion = (e) => {
    e.preventDefault();
    setQuestions([...questions, question]);
    setQuestion({
      questionTitle: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      rightAnswer: '',
      category: '',
      difficultylevel: '' // <-- Reset this field
    });
  };

  // Submit quiz (auto mode)
  const handleSubmitAuto = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    setQuizId(null);
    try {
      const res = await axios.post('http://localhost:8765/quiz-service/quiz/create', quiz);
      setSuccess(true);
      setQuizId(res.data); // Save the returned quiz ID
      setQuiz({ title: '', categoryName: '', numQuestions: '' });
    } catch (err) {
      setError('Failed to create quiz');
    }
  };

  // Submit quiz (manual mode)
  const handleSubmitManual = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    setQuizId(null);
    try {
      // 1. Add all questions to question-service, collect their IDs
      const questionIds = [];
      for (const q of questions) {
        await axios.post('http://localhost:8765/question-service/question/add', q);
      }
      // 2. Fetch all questions to get their IDs (not efficient, but works for demo)
      const allQuestionsRes = await axios.get('http://localhost:8765/question-service/question/allQuestions');
      const addedQuestions = allQuestionsRes.data.filter(q =>
        questions.some(qq => qq.questionTitle === q.questionTitle)
      );
      addedQuestions.forEach(q => questionIds.push(q.id));
      // 3. Create the quiz with the collected question IDs
      const quizRes = await axios.post('http://localhost:8765/quiz-service/quiz/create-manual', {
        title: quiz.title,
        questionIds
      });
      setSuccess(true);
      setQuizId(quizRes.data); // Save the returned quiz ID
      setQuiz({ title: '', categoryName: '', numQuestions: '' });
      setQuestions([]);
    } catch (err) {
      setError('Failed to create quiz with questions');
    }
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 5, background: 'linear-gradient(135deg, #e3f2fd 60%, #fff 100%)', boxShadow: '0 8px 32px 0 rgba(25, 118, 210, 0.10)' }}>
          <Stack alignItems="center" spacing={2} mb={2}>
            <QuizIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h3" fontWeight={800} color="#1976d2">
              Create a Quiz
            </Typography>
            <Typography variant="subtitle1" color="#555">
              Quiz Creation Mode
            </Typography>
            <Tabs
              value={mode}
              onChange={(_, v) => setMode(v)}
              textColor="primary"
              indicatorColor="primary"
              sx={{ mb: 2 }}
            >
              <Tab value="auto" label="Auto-select by Category" icon={<CategoryIcon />} iconPosition="start" />
              <Tab value="manual" label="Manually Add Questions" icon={<FormatListNumberedIcon />} iconPosition="start" />
            </Tabs>
          </Stack>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>Quiz created successfully! Quiz ID: {quizId}</Alert>}
          {mode === 'auto' && (
            <form onSubmit={handleSubmitAuto}>
              <TextField
                label="Quiz Title *"
                name="title"
                value={quiz.title}
                onChange={handleQuizChange}
                fullWidth
                required
                sx={{ mb: 3 }}
              />
              <Autocomplete
                freeSolo
                options={categoryOptions}
                value={quiz.categoryName}
                onInputChange={(e, newValue) => setQuiz({ ...quiz, categoryName: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category *"
                    name="categoryName"
                    required
                    fullWidth
                    sx={{ mb: 3 }}
                    placeholder="e.g. Java, C++, Python, Javascript, ..."
                  />
                )}
              />
              <TextField
                label="Number of Questions *"
                name="numQuestions"
                value={quiz.numQuestions}
                onChange={handleQuizChange}
                type="number"
                fullWidth
                required
                sx={{ mb: 4 }}
              />
              <Button type="submit" variant="contained" size="large" fullWidth sx={{ borderRadius: 3, fontWeight: 700 }}>
                Create Quiz
              </Button>
            </form>
          )}
          {mode === 'manual' && (
            <form onSubmit={handleSubmitManual}>
              <TextField
                label="Quiz Title *"
                name="title"
                value={quiz.title}
                onChange={handleQuizChange}
                fullWidth
                required
                sx={{ mb: 3 }}
              />
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" fontWeight={700} color="#1976d2" mb={2}>
                Add Questions
              </Typography>
              <TextField
                label="Question Title *"
                name="questionTitle"
                value={question.questionTitle}
                onChange={handleQuestionChange}
                fullWidth
                required
                sx={{ mb: 2 }}
              />
              <TextField label="Option 1" name="option1" value={question.option1} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Option 2" name="option2" value={question.option2} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Option 3" name="option3" value={question.option3} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Option 4" name="option4" value={question.option4} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Right Answer" name="rightAnswer" value={question.rightAnswer} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Category" name="category" value={question.category} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <TextField label="Difficulty Level" name="difficultylevel" value={question.difficultylevel} onChange={handleQuestionChange} fullWidth sx={{ mb: 2 }} />
              <Button onClick={handleAddQuestion} variant="outlined" color="primary" sx={{ borderRadius: 3, fontWeight: 700, mb: 2 }}>
                Add Question
              </Button>
              <Box mb={2}>
                {questions.length > 0 && (
                  <>
                    <Typography variant="subtitle1" color="#1976d2" mb={1}>Questions Added:</Typography>
                    <ul>
                      {questions.map((q, idx) => (
                        <li key={idx}>{q.questionTitle}</li>
                      ))}
                    </ul>
                  </>
                )}
              </Box>
              <Button type="submit" variant="contained" size="large" fullWidth sx={{ borderRadius: 3, fontWeight: 700 }}>
                Create Quiz
              </Button>
            </form>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default CreateQuizWithQuestions;