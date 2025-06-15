import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, SvgIcon } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Simple quiz logo SVG
const QuizLogo = (props) => (
  <SvgIcon {...props} sx={{ fontSize: 40, color: '#fff', mr: 2 }}>
    <circle cx="12" cy="12" r="10" fill="#1976d2" />
    <text x="12" y="17" textAnchor="middle" fontSize="12" fill="#fff" fontFamily="Arial">Q</text>
  </SvgIcon>
);

const NavBar = ({ isAdmin, setAdmin }) => {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setAdmin(false);
  };
  return (
    <AppBar
      position="fixed"
      elevation={6}
      sx={{
        background: 'rgba(25, 118, 210, 0.95)',
        backdropFilter: 'blur(8px)',
        minHeight: 70,
        justifyContent: 'center',
        boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.10)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 70 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <QuizLogo />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: 2,
                color: '#fff',
                ml: 1,
                userSelect: 'none',
              }}
            >
              QuizApp
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/" sx={{ fontWeight: 600, fontSize: 16 }}>Home</Button>
            {isAdmin && (
              <>
                <Button color="inherit" component={RouterLink} to="/questions" sx={{ fontWeight: 600, fontSize: 16 }}>Questions List</Button>
                <Button color="inherit" component={RouterLink} to="/add-question" sx={{ fontWeight: 600, fontSize: 16 }}>Add Question</Button>
                <Button color="inherit" component={RouterLink} to="/create-quiz-with-questions" sx={{ fontWeight: 600, fontSize: 16 }}>Create Quiz</Button>
              </>
            )}
            <Button color="inherit" component={RouterLink} to="/quizzes" sx={{ fontWeight: 600, fontSize: 16 }}>Quizzes</Button>
            <Button color="inherit" component={RouterLink} to="/take-quiz" sx={{ fontWeight: 600, fontSize: 16 }}>Take Quiz</Button>
            {isAdmin ? (
              <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: 600, fontSize: 16 }}>Logout</Button>
            ) : (
              <Button color="inherit" component={RouterLink} to="/login" sx={{ fontWeight: 600, fontSize: 16 }}>Admin Login</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
