import React, {useState, useEffect} from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function Personalized(props) {
     
     let {notification, askNotification} = props;
     let { audio, askAudio } = props;
     
     // console.log('askNotification ' + askNotification )
     const [anchorEl, setAnchorEl] = React.useState(null);
     const open = Boolean(anchorEl);
     
     const [checked, setChecked] = React.useState(true);
     
     
     const toggleChecked = () => {
          setChecked((prev) => !prev);
          notification(checked)
     };
     
     const [checkedAudio, setCheckedAudio] = React.useState(false);
     
     
     const toggleCheckedAudio = () => {
          setCheckedAudio((prev) => !prev);
          audio(checkedAudio)
     };
     
     const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
     };
     
     const handleClose = () => {
          setAnchorEl(null);
     };
     
     const [value, setValue] = React.useState('pruple');
     
     const handleChange = (event) => { 
          setValue(event.target.value);
          document.querySelector('body').removeAttribute("class");
          document.querySelector('body').classList.add(event.target.value);
     };
     
     
     
     
     
     
     
     
     return (
          <div className="personalized">
          
          <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z" />
          <path fillRule="evenodd" d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z" />
          </svg>
          </Button>
          
          
          <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
          >
          
          {/*notification  */}
          <li className="close MuiListItem-gutters" ><svg onClick={handleClose} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg></li>
          
          <MenuItem >
          <FormControlLabel
          value="Notification"
          control={<Switch color="primary" id="notification"  checked={checked} onClick={toggleChecked} />}
          label="Notification"
          labelPlacement="start"
          />
          </MenuItem>
          
          {/* audio */}
          <MenuItem >
          <FormControlLabel
          value="Sound"
          control={<Switch color="primary" checked={checkedAudio} onClick={toggleCheckedAudio} />}
          label="Sound"
          labelPlacement="start"
          />
          </MenuItem>
          
          {/* theme */}
          <MenuItem >
          <RadioGroup aria-label="theme" name="theme1" value={value} onChange={handleChange}>
          <FormLabel className="MuiFormControlLabel-root">Themes</FormLabel>
          
          <FormControlLabel value="pruple" control={<Radio />} label="Pruple" className="purple" />
          <FormControlLabel value="yellow" control={<Radio />} label="Yellow" className="yellow" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" className="dark"/>
          </RadioGroup>
          </MenuItem>
          
          
          
          <ListItem button component="a" href="https://www.instagram.com/limbo_anj/" target="_blank">
          <ListItemText primary="Any Suggestion ?" />
          @limbo_anj
          </ListItem>
          
          </Menu>
          </div>
          );
     }
     
     export default Personalized;