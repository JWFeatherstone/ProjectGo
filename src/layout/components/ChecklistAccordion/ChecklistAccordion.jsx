import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import './ChecklistAccordion.css';

const ChecklistAccordion = (props) => {
    const [checked, setChecked] = useState([0]);
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    const programmingLanguages = [
      "C",
      "C#",
      "C++",
      "Go",
      "Java",
      "JavaScript",
      "Kotlin",
      "PHP",
      "Python",
      "Ruby",
      "Rust",
      "Swift",
      "TypeScript",
      "Other"
    ];
    
    const tags = [
      "proposal",
      "design",
      "ongoing",
      "updates",
    ]

    const projectTopics = [
      "Accessibility",
      "AI & Machine Learning",
      "Art & Design",
      "Augmented Reality",
      "Blockchain",
      "Civic",
      "Cybersecurity",
      "Data Visualization",
      "Drones",
      "E-commerce",
      "Education",
      "Environmental",
      "Fintech",
      "Gaming",
      "Health & Wellness",
      "Internet of Things",
      "Mobile Apps",
      "Music & Audio",
      "Productivity",
      "Robotics",
      "Social",
      "Space Exploration",
      "Virtual Reality",
      "Web Development",
    ];

    const socialTags = [
      "fucking around",
      "beginner friendly",
      "mentor wanted",
      "newbie",
      "just learning",
      "serious business",
      "in-person meetups",
    ]

    const state = [
      "Alabama",
      "Arkansas",

    ]
    



  return (
    <>
    <Accordion className="filter-accordion">
      <AccordionSummary sx={{display: "flex", justifyContent: "center", minHeight: "30px", maxHeight: "30px"}}>
        <Typography variant="h4" sx={{width: "100%", fontFamily: "JetBrains Mono"}} align="center">
          languages
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none', overflow: "auto", maxHeight: 200 }}>
        {programmingLanguages.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              disablePadding
              sx={{height: "26px"}}
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{height: "26px"}}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{textAlign: "center", width: "100%"}}>
        Apply
      </Button>
      </AccordionDetails>
    </Accordion>
      <Accordion className="filter-accordion">
      <AccordionSummary sx={{display: "flex", justifyContent: "center", minHeight: "30px", maxHeight: "30px"}}>
        <Typography variant="h4" sx={{width: "100%", fontFamily: "JetBrains Mono"}} align="center">
          stage
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none', fontSize: "0.8rem"}}>
        {tags.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              disablePadding
              sx={{height: "26px"}}
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{height: "26px"}}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} fontSize="10px"/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{textAlign: "center", width: "100%"}}>
        Apply
      </Button>
      </AccordionDetails>
    </Accordion>
    <Accordion className="filter-accordion">
      <AccordionSummary sx={{display: "flex", justifyContent: "center", minHeight: "30px", maxHeight: "30px"}}>
        <Typography variant="h4" sx={{width: "100%", fontFamily: "JetBrains Mono"}} align="center">
          topics
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none', overflow: "auto", maxHeight: 200 }}>
        {projectTopics.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              disablePadding
              sx={{height: "26px"}}
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{height: "26px"}}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{textAlign: "center", width: "100%"}}>
        Apply
      </Button>
      </AccordionDetails>
    </Accordion>
    <Accordion className="filter-accordion">
      <AccordionSummary sx={{display: "flex", justifyContent: "center", minHeight: "30px", maxHeight: "30px"}}>
        <Typography variant="h4" sx={{width: "100%", fontFamily: "JetBrains Mono"}} align="center">
          social tags
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'none', overflow: "auto", maxHeight: 200 }}>
        {socialTags.map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem
              key={value}
              disablePadding
              sx={{height: "26px"}}
            >
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense sx={{height: "26px"}}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Button sx={{textAlign: "center", width: "100%"}}>
        Apply
      </Button>
      </AccordionDetails>
    </Accordion>
    </>
  );
}

export default ChecklistAccordion;