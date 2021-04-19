import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../../commun/panelTab";
import Passwordparams from "./passwordparams";
import Usernameparams from "./usernameparams";
import Domainsparams from "./domainsparams";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingBottom: 20,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  tab: {
    borderBottom: `1px solid #e6ab2d`,
    [theme.breakpoints.down("sm")]: {
      fontSize: 10,
    },
  },

  tabs: {
    width: "100%",
    minWidth: 200,
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Params(props) {
  //get in component did mount or useeffect the bets of a certain domain
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.betfundata.currentuser.data);

  const paramsdata = [
    { id: 0, name: "Domains" },
    { id: 1, name: "Password" },
    { id: 2, name: "Username" },
  ];

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        marginTop: 100,
        backgroundColor: "#ececeb",
        width: "90%",
        alignSelf: "center",
        display: "flex",
        justifyContent: "center",
        padding: 10,
        boxSizing: "border-box",
        borderBottom: "none",
      }}
    >
      <div className={classes.root}>
        <Tabs
          variant="scrollable"
          indicatorColor="primary"
          className={classes.tabs}
          value={value}
          aria-label="Vertical tabs example"
        >
          <div style={{ flexGrow: 1 }}></div>
          {paramsdata.map((param) => (
            <Tab
              label={param.name}
              value={param.id}
              className={classes.tab}
              onClick={() => setValue(param.id)}
            />
          ))}
          <div style={{ flexGrow: 1 }}></div>
        </Tabs>
        <TabPanel value={value} index={1} isclass={true}>
          <Passwordparams />
        </TabPanel>
        <TabPanel value={value} index={0}>
          <Domainsparams />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Usernameparams />
        </TabPanel>
      </div>
    </div>
  );
}
