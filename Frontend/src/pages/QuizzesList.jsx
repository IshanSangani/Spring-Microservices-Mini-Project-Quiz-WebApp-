import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Toolbar,
  Box,
  Chip,
  Stack
} from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8765/quiz-service/quiz/all')
      .then(res => {
        setQuizzes(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h3" fontWeight={800} mb={5} align="center" color="#1976d2">
          <QuizIcon sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
          All Quizzes
        </Typography>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
            <CircularProgress size={60} thickness={5} />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {quizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={quiz.id}>
                <Card elevation={6} sx={{
                  borderRadius: 4,
                  p: 2,
                  background: 'linear-gradient(135deg, #e3f2fd 60%, #fff 100%)',
                  boxShadow: '0 6px 32px 0 rgba(25, 118, 210, 0.10)',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-8px) scale(1.03)', boxShadow: '0 12px 40px 0 rgba(25, 118, 210, 0.18)' },
                }}>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                      <QuizIcon color="primary" />
                      <Typography variant="h6" fontWeight={700} color="#222">
                        {quiz.title}
                      </Typography>
                    </Stack>
                    <Chip label={`Questions: ${quiz.questionIds ? quiz.questionIds.length : 0}`} color="info" variant="outlined" sx={{ mt: 1 }} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default QuizzesList;
