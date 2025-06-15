import React, { useEffect, useState } from 'react';
import { Container, Paper, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:8765/question-service/question/allQuestions');
        setQuestions(res.data);
      } catch (err) {
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" fontWeight={700} mb={3} align="center">
            All Questions
          </Typography>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>Question</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Option 1</b></TableCell>
                    <TableCell><b>Option 2</b></TableCell>
                    <TableCell><b>Option 3</b></TableCell>
                    <TableCell><b>Option 4</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questions.map((q) => (
                    <TableRow key={q.id}>
                      <TableCell>{q.id}</TableCell>
                      <TableCell>{q.questionTitle}</TableCell>
                      <TableCell>{q.category}</TableCell>
                      <TableCell>{q.option1}</TableCell>
                      <TableCell>{q.option2}</TableCell>
                      <TableCell>{q.option3}</TableCell>
                      <TableCell>{q.option4}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default QuestionsList;
