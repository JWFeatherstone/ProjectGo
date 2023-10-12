import { Box, Button, Container, Typography } from '@mui/material';
import './About.css';

const About = () => {
  return (
    <main className="hero-section about-section">
      <Container sx={{ width: "100%", alignSelf: "left", margin: "0"}} className="hero-text about-text">
        <Typography sx={{ mb: 2 }} variant="h1" align="left" className="hero-header about-header">
          Creating things you care about with people who care about them too is the best.
        </Typography>
        <Typography sx={{ mb: 2, fontWeight: "100", fontSize: "30px", lineHeight: "42px"}} variant="h1">
          GoProject was designed with the goal of making it easier to connect and collaborate around creating things.  
        </Typography>
      </Container>
    </main>
  )
}

export default About;