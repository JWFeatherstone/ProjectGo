import { Box, Button, Container, Typography } from '@mui/material';
import './Dashboard.css';
import ReactTyped from 'react-typed';

const Dashboard = () => {
  return (
    <main className="hero-section">
      <Container sx={{ width: "60%", alignSelf: "left"}} className="hero-text">
        <Typography sx={{ mb: 2 }} variant="h1" align="left" className="hero-header">
          A platform for the tech community's personal projects
        </Typography>

        <Typography sx={{ mb: 4, overflow: "visible", fontSize: "2rem"}} variant="h2" className="hero-sub">
          Find your people and build the stuff that you really care about.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            gridGap: "1rem",
          }}
          className="hero-buttons"
        >
          <Button
            variant="outlined"
            sx={{ width: "100%", maxWidth: "30rem" }}
            href={`/api`}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "100%", maxWidth: "30rem" }}
            href={`/api`}
          >
            What's this about?
          </Button>
        </Box>
      </Container>
      <Container sx={{ width: "30%"}} className="typewriter-wrapper">
          <Typography sx={{ mb: 2}} variant="h1" align="center" className="typewriter">
            <ReactTyped
              strings={[
                "> build community",
                "> find your people",
                "> start a new passion project",
                "> discover your next hobby",
                "> create something meaningful",
                "> find inspiration",
                "> meet your future co-founder",
                "> make friends",
                "> get feedback"
              ]}
              typeSpeed={80}
              backSpeed={80}
              loop
            />
          </Typography>
      </Container>
    </main>
  )
}

export default Dashboard;