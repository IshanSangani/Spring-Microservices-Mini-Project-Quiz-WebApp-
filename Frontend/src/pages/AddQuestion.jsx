import React, { useState } from 'react';
import axios from 'axios';
import { Container, Paper, Toolbar, Typography, TextField, Button, Box, Alert } from '@mui/material';

const AddQuestion = () => {
  const [form, setForm] = useState({
    questionTitle: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    rightAnswer: '',
    category: '',
    difficultylevel: ''
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
      await axios.post('http://localhost:8765/question-service/question/add', form);
      setSuccess(true);
      setForm({ questionTitle: '', option1: '', option2: '', option3: '', option4: '', rightAnswer: '', category: '', difficultylevel: '' });
    } catch (err) {
      setError('Failed to add question');
    }
  };

  return (
    <>
      <Toolbar />
      <Container maxWidth="sm" sx={{ mt: 6, mb: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" fontWeight={700} mb={3} align="center">
            Add a New Question
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField fullWidth margin="normal" label="Question" name="questionTitle" value={form.questionTitle} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Option 1" name="option1" value={form.option1} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Option 2" name="option2" value={form.option2} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Option 3" name="option3" value={form.option3} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Option 4" name="option4" value={form.option4} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Right Answer" name="rightAnswer" value={form.rightAnswer} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Category" name="category" value={form.category} onChange={handleChange} required />
            <TextField fullWidth margin="normal" label="Difficulty Level" name="difficultylevel" value={form.difficultylevel} onChange={handleChange} required />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Add Question</Button>
          </Box>
          {success && <Alert severity="success" sx={{ mt: 2 }}>Question added successfully!</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Paper>
      </Container>
    </>
  );
};

export default AddQuestion;
