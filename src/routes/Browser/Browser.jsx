import { Box, Typography, Divider, Card, Paper, Chip, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { FilterGroup }  from '../../layout/components/FilterGroup/index';
import './Browser.css';
import SortIcon from '@mui/icons-material/Sort';



const Browser = () => {
  const [combinedFilters, setCombinedFilters] = useState({});


  // dummy options for filter compound component testing
  const filterOptionsGroup1 = ["all", "web app", "mobile app", "hardware", "other"];
  const filterOptionsGroup2 = ["all", "beginner friendly", "feedback wanted", "in-person meetups", "proposal"];

  const applyFilters = (groupName, selectedFilters) => {
    setCombinedFilters((prevFilters) => ({
      ...prevFilters,
      [groupName]: selectedFilters,
    }));
    console.log('Applying filters:', combinedFilters);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: "200px",
    color: theme.palette.text.secondary,
  }));


  return (
    <main className="browser-section">
      <Box sx={{ marginRight: "48px", marginLeft: "24px", flexGrow: "0.5"}}>
      <FilterGroup groupName="Group 1" onApply={applyFilters}>
        {filterOptionsGroup1.map((option) => (
          <FilterGroup.Filter key={option} name={option} />
        ))}
        <FilterGroup.ApplyButton />
      </FilterGroup>
      
      <FilterGroup groupName="Group 2" onApply={applyFilters}>
        {filterOptionsGroup2.map((option) => (
          <FilterGroup.Filter key={option} name={option} />
        ))}
        <FilterGroup.ApplyButton />
      </FilterGroup>
      </Box>
      <Box sx={{ flexGrow: 0.5, marginRight: "24px"}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <SortIcon sx={{ fontSize: "1.5rem"}}/>
          <Typography sx={{fontWeight: "100"}} variant="h4">
            recent projects
          </Typography>
        </Box>
        <Divider className="browser-divider"/>
        <Card sx={{ height: "175px", mb: 1}}>
          <Box className="card-header">
            <Typography sx={{ p: 1.5, pl: 3, fontWeight: 800, order: -3 }} variant="h4" align="left" className="hero-header">
              Birdly
            </Typography>
            <Typography sx={{ p: 1.5, pr: 3, fontWeight: 200, order: -3 }} variant="h4" align="right">
              Mobile App
            </Typography>
          </Box>
          <p className="card-body-text">
            A Pokedex-style birding and education app for kids.
          </p>
          <Box className="chip-bar">
            <Chip label="beginner friendly" variant="outlined" />
          </Box>
        </Card>
        <Card sx={{ height: "175px", mb: 1}}>
          <Box className="card-header">
            <Typography sx={{ p: 1.5, pl: 3, fontWeight: 800, order: -3 }} variant="h4" align="left" className="hero-header">
              Literary Atlas
            </Typography>
            <Typography sx={{ p: 1.5, pr: 3, fontWeight: 200, order: -3 }} variant="h4" align="right">
              Web App
            </Typography>
          </Box>
          <p className="card-body-text">
            An interactive Atlas of literary works from countries around the world.
          </p>
          <Box className="chip-bar">
            <Chip label="in-person meetups" variant="outlined" sx={{marginRight: 1}}/>
            <Chip label="proposal" variant="outlined" />
          </Box>
        </Card>
        <Card sx={{ height: "175px", mb: 1}}>
          <Box className="card-header">
            <Typography sx={{ p: 1.5, pl: 3, fontWeight: 800, order: -3 }} variant="h4" align="left" className="hero-header">
              Bazaar
            </Typography>
            <Typography sx={{ p: 1.5, pr: 3, fontWeight: 200, order: -3 }} variant="h4" align="right">
              Mobile App
            </Typography>
          </Box>
          <p className="card-body-text">
            An all-in-one platform for starting, managing, and growing a pop-up business.
          </p>
          <Box className="chip-bar">
            <Chip label="feedback wanted" variant="outlined" />
          </Box>
        </Card>
      </Box>
    </main>
  )
}

export default Browser;