import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "@material-ui/core/FormControl";

import NativeSelect from "@material-ui/core/NativeSelect";
import { loadTitles } from "../../features/titles/titleSlice.js";

import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";
import SultanComponent from "../../commun/sultan.js";
import KingsComponent from "../../commun/king.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    color: "#171717",
    minWidth: 120,
    maxWidth: 200,
  },
  select: {
    color: "#171717",
    "&:before": {
      borderColor: "#171717",
    },
    "&:after": {
      borderColor: "#171717",
    },
  },
  icon: {
    fill: "#ececeb",
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
  const loadingTitles = useSelector((state) => state.betfundata.titles.loading);
  const titlesErrors = useSelector(
    (state) => state.betfundata.titles.errors.message
  );
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
    <>
      {loadingTitles ? (
        <div style={{ paddingLeft: "50%", paddingTop: "20%" }}>
          <Spincrescentcomponenet size="2x" color="#2e383f" />
        </div>
      ) : (
        <>
          {titlesErrors ? (
            <div className="loadingerrorMessage">
              <div
                className="betstabLine headerBets"
                style={{
                  fontSize: 20,
                  backgroundColor: "#ececeb",
                  border: "none",
                  fontWeight: "bold",
                }}
              >
                {titlesErrors}
              </div>
            </div>
          ) : (
            <div
              style={{
                marginTop: 100,
                color: "#fbfbfb",
                backgroundColor: "#ececeb",
                minHeight: "100vh",
              }}
            >
              <SultanComponent
                gender={sultan.gender}
                countrylogo={sultan.countrylogo}
                sultanusername={sultan.username}
                points={sultan.total_points}
                NTSultan={sultan.NTSultan}
                season={props.match.params.seasonname}
              />
              <div className="kingsBar">
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel
                      htmlFor="choosecountry"
                      style={{ color: "#171717" }}
                    >
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
                        style={{ backgroundColor: "#e6ab2d", color: "#fbfbfb" }}
                      >
                        All
                      </option>
                      {countriesinvolved.map((c) => (
                        <option
                          value={c.id}
                          style={{ backgroundColor: "#e6ab2d" }}
                        >
                          {c.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
                <div className="kingsqueentitle">Kings / Queens</div>
              </div>
              {kings[0] || true ? (
                <KingsComponent
                  kings={[sultan, sultan]}
                  countryId={choosecountry}
                />
              ) : (
                <div
                  style={{
                    fontSize: 30,
                    marginTop: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#171717",
                  }}
                >
                  There is no kings
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
