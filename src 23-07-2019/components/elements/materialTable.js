import React from "react";
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

function MaterialTableDemo(props) {
    const title = props.title;

    if(props.title === "Countries" || props.title === "Industries"){
        //For other tables than Obligors
        //All the props are from parent classes
        return <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        //adding new data
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              props.add(newData.name);
              setTimeout(() => {
                resolve();
              }, 10);
            }),
          //deleting data
          onRowDelete: oldData =>
            new Promise(resolve => {
              console.log(oldData._id);
              props.delete(oldData.name);
              setTimeout(() => {
                resolve();
              }, 10);
            }),
        }}
        />
    }
    else if(props.title === "Admin Models") {
      //For other tables than Obligors
      //All the props are from parent classes
      return <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      actions={[
        rowData => ({ 
          icon: "assessment",
          tooltip: rowData.status === "Pending" ? "Create Questions" : null,
          onClick: () => props.openDialog(),
          disabled:rowData.status === "Approved"
        })
      ]}
      
      //adding new data
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            props.add(newData.name);
            setTimeout(() => {
              resolve();
            }, 10);
          })
      }}
      />
    }
    else if(props.title === "Scorecards"){
      return <div>
        <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}    
        actions={[
          { 
            icon: "save",
            onClick: (id, index) => props.switchViews(id, index)
          }
        ]}
        components={{
          Action: (props) => (
            <Tooltip title= {title === "Obligors" ? "Scorecard" : "Models"}
            aria-label= {title === "Obligors" ? "Scorecard": "Models"}>
              <Button
                onClick={()=>props.action.onClick(props.data._id, 1)}
                style={{marginLeft: 0,
                        padding: "0px",
                        height: "45px"
                      }}
              >
                <i className="material-icons">assessment</i>
              </Button>
            </Tooltip>
          ),
        }}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        />
        <Fab color="primary" 
            aria-label="Add" 
            size="small"
            onClick= {()=> {props.navigate()}}
            style={{
                position: "absolute",
                right: '11.5%',
                bottom: '18%',
            }}>
          <AddIcon />
        </Fab> 
      </div>
    }

    return <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        actions={[
          { 
            icon: "save",
            onClick: (id, name) => props.navigate(id, name)
          }
        ]}
        components={{
          Action: (props) => (
            <Tooltip title= {title === "Obligors" ? "Scorecard" : "Models"}
            aria-label= {title === "Obligors" ? "Scorecard": "Models"}>
              <Button
                onClick={()=>props.action.onClick(props.data._id, props.data.name)}
                style={{marginLeft: 0,
                        padding: "0px",
                        height: "45px"
                      }}
              >
                <i className="material-icons">assessment</i>
              </Button>
            </Tooltip>
          ),
        }}
      />
  }

export default MaterialTableDemo;