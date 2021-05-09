import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { loadDomainstats } from "../../features/domainstats/domainstatsSlice";
import { loadProfiledomains } from "../../features/profiledomains/profiledomainSlice";
import { loadLevels } from "../../features/levels/levelSlice";
import AccuracyEfficiency from "../../commun/accuracyeffec";
import Betleveldomainpersondata from "../../commun/betleveldomainpersondata";

export default function Domainpersonaldata() {
  const dispatch = useDispatch();

  const profiledomains = useSelector(
    (state) => state.betfundata.profiledomains.list
  );

  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  const domainstats = useSelector((state) => state.betfundata.domainstats.list);

  const loadingstats = useSelector(
    (state) => state.betfundata.domainstats.loading
  );

  const loadingprofiledomains = useSelector(
    (state) => state.betfundata.profiledomains.loading
  );

  const errormessagestats = useSelector(
    (state) => state.betfundata.domainstats.errors.message
  );

  const errormessageprofiledomains = useSelector(
    (state) => state.betfundata.profiledomains.errors.message
  );

  const [currentdomainId, setCurrentdomainId] = useState(0);

  const [season, setSeason] = React.useState(
    domainstats.seasons &&
      domainstats.seasons.length !== 0 &&
      domainstats.seasons[0].id
  );
  const [selectedseasonvalue, Setselectedseasonvalue] = React.useState(
    domainstats.seasons &&
      domainstats.seasons.length !== 0 &&
      domainstats.seasons[0]
  );
  const [gameweeks, setGameweeks] = React.useState(
    domainstats.seasons && domainstats.seasons.length !== 0
      ? domainstats.seasons[0].gameweeks
      : []
  );
  const [gameweek, setGameweek] = React.useState(
    domainstats.seasons &&
      domainstats.seasons.length !== 0 &&
      domainstats.seasons[0].gameweeks[0].id
  );
  const [selectedGameweekvalue, setSelectedGameweekvalue] = React.useState(
    domainstats.seasons &&
      domainstats.seasons.length !== 0 &&
      domainstats.seasons[0].gameweeks[0]
  );

  const seasonChange = (event) => {
    const value = event.target.value;
    setSeason(value);

    const selectedSeason = _.find(domainstats.seasons, function (s) {
      return s.id == value;
    });
    Setselectedseasonvalue(selectedSeason);
    setGameweeks(selectedSeason.gameweeks);
  };

  const gameweekChange = (event) => {
    const value = event.target.value;
    setGameweek(value);

    const selectedGamweek = _.find(selectedseasonvalue.gameweeks, function (g) {
      return g.id == value;
    });

    setSelectedGameweekvalue(selectedGamweek);
    setGameweek(selectedGamweek.id);
  };

  useEffect(() => {
    if (currentprofile.id) {
      dispatch(loadProfiledomains(`/${currentprofile.id}`));
    }
  }, [currentprofile]);

  useEffect(() => {
    if (profiledomains[0]) {
      dispatch(
        loadDomainstats(
          `/${currentprofile.id}/${profiledomains[currentdomainId].id}`
        )
      );
      dispatch(loadLevels(`/${profiledomains[currentdomainId].id}`));
    }
  }, [currentdomainId, profiledomains, currentprofile]);

  useEffect(() => {
    setSeason(
      domainstats.seasons &&
        domainstats.seasons.length !== 0 &&
        domainstats.seasons[0].id
    );

    Setselectedseasonvalue(
      domainstats.seasons &&
        domainstats.seasons.length !== 0 &&
        domainstats.seasons[0]
    );
    setGameweeks(
      domainstats.seasons && domainstats.seasons.length !== 0
        ? domainstats.seasons[0].gameweeks
        : []
    );
    setGameweek(
      domainstats.seasons &&
        domainstats.seasons.length !== 0 &&
        domainstats.seasons[0].gameweeks[0].id
    );

    setSelectedGameweekvalue(
      domainstats.seasons &&
        domainstats.seasons.length !== 0 &&
        domainstats.seasons[0].gameweeks[0]
    );
  }, [domainstats]);

  const goleft = () => {
    if (currentdomainId != 0) {
      setCurrentdomainId((c) => c - 1);
    }
  };

  const goright = () => {
    if (currentdomainId != profiledomains.length - 1) {
      setCurrentdomainId((c) => c + 1);
    }
  };

  const isthereseasons = (seasons) => {
    return !seasons || (seasons && seasons.length == 0);
  };

  return (
    <>
      {loadingstats || loadingprofiledomains ? (
        <div
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          ...loading
        </div>
      ) : errormessageprofiledomains ? (
        <div
          style={{
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {errormessageprofiledomains}
        </div>
      ) : (
        <div
          className="domainpersondatacontainer"
          style={{
            display: loadingstats || loadingprofiledomains ? "none" : "flex",
          }}
        >
          <Betleveldomainpersondata
            domainname={
              profiledomains[0]
                ? profiledomains[currentdomainId].domainname
                : "loading..."
            }
            points={selectedseasonvalue ? selectedseasonvalue.points : 0}
            stillright={
              profiledomains[0] && currentdomainId != profiledomains.length - 1
            }
            stillleft={currentdomainId != 0}
            goLeft={() => goleft()}
            goRight={() => goright()}
          />

          {errormessagestats ? (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {errormessagestats}
            </div>
          ) : (
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",

                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  display: "flex",
                  minHeight: 50,
                  marginTop: 10,
                  width: "100%",
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                <div style={{ width: "33%" }}></div>
                <div
                  style={{
                    width: "33%",
                    color: "black",
                    flexDirection: "column",
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <div>Accuracy</div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: "normal",
                      textAlign: "center",
                    }}
                  >
                    correct matches /total matches
                  </div>
                </div>
                <div
                  style={{
                    width: "33%",
                    color: "black",
                    flexDirection: "column",
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <div>Efficiency</div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: "normal",
                      textAlign: "center",
                    }}
                  >
                    score / best score
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <AccuracyEfficiency
                  accuracy={
                    domainstats.totalAcc == null ? 0 : domainstats.totalAcc
                  }
                  efficiency={
                    domainstats.totalEff == null ? 0 : domainstats.totalEff
                  }
                  allseasons={"All seasons"}
                  canselect={false}
                />
                <AccuracyEfficiency
                  canselect={isthereseasons(domainstats.seasons) ? false : true}
                  allseasons="No seasons played"
                  name="seasons"
                  value={season}
                  accuracy={
                    isthereseasons(domainstats.seasons)
                      ? 0
                      : selectedseasonvalue
                      ? selectedseasonvalue.acc
                      : 0
                  }
                  efficiency={
                    isthereseasons(domainstats.seasons)
                      ? 0
                      : selectedseasonvalue
                      ? selectedseasonvalue.eff
                      : 0
                  }
                  changeselect={seasonChange}
                  list={domainstats.seasons}
                />
                <AccuracyEfficiency
                  allseasons="No gameweeks played"
                  name="Gameweeks"
                  canselect={isthereseasons(domainstats.seasons) ? false : true}
                  value={gameweek}
                  accuracy={
                    isthereseasons(domainstats.seasons)
                      ? 0
                      : selectedGameweekvalue
                      ? selectedGameweekvalue.acc
                      : 0
                  }
                  efficiency={
                    isthereseasons(domainstats.seasons)
                      ? 0
                      : selectedGameweekvalue
                      ? selectedGameweekvalue.eff
                      : 0
                  }
                  changeselect={gameweekChange}
                  list={gameweeks}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
