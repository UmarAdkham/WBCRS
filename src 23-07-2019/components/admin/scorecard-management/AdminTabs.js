import React from 'react';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import AdminQuestions from './AdminQuestions';

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
  }
}));

export default function AdminTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [secondTabState, setSecondTabState] = React.useState(true);
  const [thirdTabState, setThirdTabState] = React.useState(true);
  const [fourthTabState, setFourthTabState] = React.useState(true);

  function handleChange(event, newValue) {
    console.log(newValue);
    setValue(newValue);
  }

  function changeTabState(questionType) {
    if(questionType===2) {
      setSecondTabState(false);
    }
    else if(questionType===3) {
      setThirdTabState(false);
    }
    else if(questionType===4){
      setFourthTabState(false);
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Financial Measures" />
          <Tab label="Management Quality" disabled={secondTabState} />
          <Tab label="Industry" disabled={thirdTabState} />
          <Tab label="Others" disabled={fourthTabState} />
        </Tabs>
      </AppBar>

      {/*There are 4 menu options for each scorecard */}
      {value === 0 && <TabContainer> <AdminQuestions changeTabState={changeTabState}
                                                handleChange={handleChange}
                                                questionType={1} 
                                                model={props.model} /></TabContainer>}
      {value === 1 && <TabContainer> <AdminQuestions changeTabState={changeTabState}
                                                handleChange={handleChange}
                                                questionType={2} 
                                                model={props.model} /></TabContainer>}
      {value === 2 && <TabContainer> <AdminQuestions changeTabState={changeTabState}
                                                handleChange={handleChange}
                                                questionType={3} 
                                                model={props.model} /></TabContainer>}
      {value === 3 && <TabContainer> <AdminQuestions changeTabState={changeTabState}
                                                handleChange={handleChange}
                                                questionType={4} 
                                                model={props.model} 
                                                handleNext={props.handleNext}/></TabContainer>}
    </div>
  );
}