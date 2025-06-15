import React from 'react';
import { Box, Container, Typography, Grid, Paper, Toolbar, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import QuizIcon from '@mui/icons-material/Quiz';

const actionCards = [
  {
    title: 'Add Question',
    description: 'Add questions of multiple types like MCQs, subjective, or paragraph!',
    icon: <AddCircleOutlineIcon sx={{ fontSize: 40, color: '#ff9800' }} />, // orange
    color: '#fff7e6',
    action: '/add-question',
  },
  {
    title: 'Questions List',
    description: 'View all questions in the system.',
    icon: <LibraryBooksIcon sx={{ fontSize: 40, color: '#1976d2' }} />, // blue
    color: '#e3f2fd',
    action: '/questions',
  },
  {
    title: 'Quizzes',
    description: 'View and manage all quizzes you have created.',
    icon: <LibraryBooksIcon sx={{ fontSize: 40, color: '#e91e63' }} />, // pink
    color: '#fce4ec',
    action: '/quizzes',
  },
  {
    title: 'Create Quiz',
    description: 'Create a new quiz by selecting questions or adding new ones!',
    icon: <CloudUploadIcon sx={{ fontSize: 40, color: '#4caf50' }} />, // green
    color: '#e8f5e9',
    action: '/create-quiz-with-questions',
  },
  {
    title: 'Take Quiz',
    description: 'Attempt a quiz and test your knowledge!',
    icon: <QuizIcon sx={{ fontSize: 40, color: '#2196f3' }} />, // blue
    color: '#e3f2fd',
    action: '/take-quiz',
  },
];

const Home = ({ isAdmin }) => {
  const filteredCards = actionCards.filter(card => {
    if (["Add Question", "Questions List", "Create Quiz"].includes(card.title)) {
      return isAdmin;
    }
    return true;
  });
  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" fontWeight={700} color="#222" gutterBottom>
            Welcome to QuizApp
          </Typography>
          <Typography variant="h5" color="#555" mb={4}>
            Create, manage, and explore questions and quizzes with ease.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {filteredCards.map((card, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: card.color,
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 8 },
                }}
              >
                {card.icon}
                <Typography variant="h6" fontWeight={700} mt={2} mb={1} color="#222">
                  {card.title}
                </Typography>
                <Typography variant="body1" color="#555" mb={2}>
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to={card.action}
                  sx={{ borderRadius: 2, fontWeight: 600 }}
                >
                  Go
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
