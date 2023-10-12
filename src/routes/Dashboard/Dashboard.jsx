import { Box, Button, Container, Typography } from '@mui/material';
import './Dashboard.css';
import ReactTyped from 'react-typed';
import { useRecoilValue } from 'recoil';
import { ThemeName } from '../../theme';

const Dashboard = () => {
  const theme = useRecoilValue(ThemeName);
  return (
    <main className="hero-section">
      <Container sx={{ width: "60%", alignSelf: "left", margin: "0"}} className="hero-text">
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
            variant={theme === "dark" ? "outlined" : "contained"}
            sx={{ width: "100%", maxWidth: "30rem" }}
            href={`/register`}
          >
            Get Started
          </Button>
          <Button
            variant={theme === "dark" ? "outlined" : "contained"}
            sx={{ width: "100%", maxWidth: "30rem" }}
            href={`/about`}
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