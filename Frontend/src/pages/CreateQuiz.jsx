import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Box, Alert } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

const CreateQuiz = () => {
  const [form, setForm] = useState({
    title: '',
    categoryName: '',
    numQuestions: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    try {
      await axios.post('http://localhost:8765/quiz-service/quiz/create', form);
      setSuccess(true);
      setForm({ title: '', categoryName: '', numQuestions: '' });
    } catch (err) {
      setError('Failed to create quiz');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Create New Quiz</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Quiz Title" name="title" value={form.title} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Category" name="categoryName" value={form.categoryName} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Number of Questions" name="numQuestions" value={form.numQuestions} onChange={handleChange} required type="number" />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Create Quiz</Button>
        </Box>
        {success && <Alert severity="success" sx={{ mt: 2 }}>Quiz created successfully!</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Paper>
      <Toolbar /> {/* This pushes content below the fixed navbar */}
    </Container>
  );
};

export default CreateQuiz;
