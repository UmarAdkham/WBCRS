import React from 'react';
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import HistoryQuestions from './HistoryQuestions';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};
 
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));

export default function HistoryTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  //const classes = useStyles();
  //const theme = useTheme();

  function handleChange(event, newValue) {
    setValue(newValue); 
  }
    return (
        console.log(props.scorecardID),
        <div>
        <AppBar position="static" color="default">
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            >
                <Tab label="Financial Measures" />
                <Tab label="Management Quality" />
                <Tab label="Industry" />
                <Tab label="Others" />
            </Tabs>
        </AppBar>

        {/*There are 4 menu options for each scorecard */}
        {value === 0 && <TabContainer> <HistoryQuestions questionType={1} 
                                                    scorecardID={props.scorecardID} /></TabContainer>}
        {value === 1 && <TabContainer> <HistoryQuestions questionType={2} 
                                                    scorecardID={props.scorecardID} /></TabContainer>}
        {value === 2 && <TabContainer> <HistoryQuestions questionType={3} 
                                                    scorecardID={props.scorecardID} /></TabContainer>}
        {value === 3 && <TabContainer> <HistoryQuestions questionType={4} 
                                                    scorecardID={props.scorecardID} /></TabContainer>}
        
        <Button onClick={() => props.switchViews(null, 0)} className={classes.button}>
          Back
        </Button>
        </div>
    );
}
