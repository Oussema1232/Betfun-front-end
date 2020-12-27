import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { loadTitles } from "../../features/titles/titleSlice.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import TabPanel from "../../commun/panelTab";
import Usermoonavatar from "../../commun/usermoonavatar";
import Crown from "../../commun/logos/crown.js";
import SultanComponent from "../../commun/sultan.js";
import KingsComponent from "../../commun/king.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    color: "#eeeeee",
    minWidth: 120,
    maxWidth: 200,
  },
  select: {
    color: "#eeeeee",
    "&:before": {
      borderColor: "#eeeeee",
    },
    "&:after": {
      borderColor: "#eeeeee",
    },
  },
  icon: {
    fill: "#2e0000",
  },
}));

export default function Titles(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [choosecountry, setChoosecountry] = React.useState("All");

  const handleChangeSort = (event) => {
    setChoosecountry(event.target.value);
  };
  const sultan = useSelector((state) => state.betfundata.titles.sultan);
  const kings = useSelector((state) => state.betfundata.titles.list);
  const countriesinvolved = useSelector(
    (state) => state.betfundata.titles.countriesInvolvedLastSeason
  );
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  useEffect(() => {
    dispatch(
      loadTitles(`/kings/${props.match.params.seasonId}/${currentdomain.id}`)
    );
  }, [props.match.params.seasonId, props.match.params.domainId]);

  return (
    <div
      style={{
        marginTop: 100,
        color: "#eeeeee",
        backgroundColor: "#2e0000",
        minHeight: "100vh",
      }}
    >
      <SultanComponent
        sex="Male"
        countrylogo="../../../../../tunisianflag.png"
        profilepicture="../../../../../cr7profile.jpg"
        username={sultan.username}
        points={2600}
        NTSultan={sultan.NTSultan}
        season={props.match.params.seasonname}
      />
      <div className="kingsBar">
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="choosecountry" style={{ color: "#eeeeee" }}>
              Country
            </InputLabel>
            <NativeSelect
              value={choosecountry}
              className={classes.select}
              onChange={handleChangeSort}
              inputProps={{
                name: "chosencountry",
                id: "choosecountry",
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <option
                value="All"
                style={{ backgroundColor: "#e6ab2d", color: "#eeeeee" }}
              >
                All
              </option>
              {countriesinvolved.map((c) => (
                <option value={c.id} style={{ backgroundColor: "#e6ab2d" }}>
                  {c.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </div>
        <div className="kingsqueentitle">Kings / Queens</div>
      </div>

      <KingsComponent kings={kings} countryId={choosecountry} />
    </div>
  );
}
