import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { loadUserdomains } from "../../features/userdomains/userdomainSlice";

import AccuracyEfficiency from "../../commun/accuracyeffec";
import Betleveldomainpersondata from "../../commun/betleveldomainpersondata";

export default function Domainpersonaldata() {
  const data = {
    totalAcc: 70,
    totalEff: 50,

    seasons: [
      {
        id: 1,
        name: "2018-2019",
        acc: 20,
        eff: 30,
        points: 250,
        gameweeks: [
          { id: 1, name: "one", acc: 20, eff: 35 },
          { id: 2, name: "two", acc: 20, eff: 36 },
          { id: 3, name: "three", acc: 20, eff: 45 },
          { id: 4, name: "four", acc: 20, eff: 75 },
        ],
      },
      {
        id: 2,
        name: "2019-2020",
        acc: 40,
        eff: 50,
        points: 360,
        gameweeks: [
          { id: 8, name: "229", acc: 40, eff: 35 },
          { id: 9, name: "223", acc: 10, eff: 36 },
          { id: 10, name: "230", acc: 26, eff: 25 },
          { id: 11, name: "201", acc: 35, eff: 55 },
        ],
      },
      {
        id: 3,
        name: "2020-2021",
        acc: 0,
        eff: 0,
        points: 2600,
        gameweeks: [
          { id: 15, name: "mine", acc: 40, eff: 35 },
          { id: 16, name: "yours", acc: 10, eff: 24 },
          { id: 19, name: "ours", acc: 32, eff: 25 },
          { id: 20, name: "none", acc: 45, eff: 15 },
        ],
      },
    ],
  };

  const [season, setSeason] = React.useState(data.seasons[0].id);
  const [selectedseasonvalue, Setselectedseasonvalue] = React.useState(
    data.seasons[0]
  );
  const [gameweeks, setGameweeks] = React.useState(data.seasons[0].gameweeks);
  const [gameweek, setGameweek] = React.useState(
    data.seasons[0].gameweeks[0].id
  );
  const [selectedGameweekvalue, setSelectedGameweekvalue] = React.useState(
    data.seasons[0].gameweeks[0]
  );

  const seasonChange = (event) => {
    const value = event.target.value;
    setSeason(value);

    const selectedSeason = _.find(data.seasons, function (s) {
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
    dispatch(loadUserdomains(`/${6}`));
  }, []);

  const dispatch = useDispatch();
  const userdomains = useSelector((state) => state.betfundata.userdomains.list);

  const [currentdomain, setCurrectdomain] = useState(0);

  const goleft = () => {
    if (currentdomain != 0) {
      setCurrectdomain((c) => c - 1);
    }
  };

  const goright = () => {
    if (currentdomain != userdomains.length - 1) {
      setCurrectdomain((c) => c + 1);
    }
  };

  return (
    <div className="domainpersondatacontainer">
      <Betleveldomainpersondata
        domainname={
          userdomains[0] ? userdomains[currentdomain].domainname : "loading..."
        }
        points={selectedseasonvalue.points}
        imageSrc="../../../noobBettor.jpg"
        stillright={currentdomain != userdomains.length - 1}
        stillleft={currentdomain != 0}
        goLeft={() => goleft()}
        goRight={() => goright()}
      />
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Accuracy
          </div>
          <div
            style={{
              width: "33%",
              color: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Effiency
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
            accuracy={data.totalAcc}
            efficiency={data.totalEff}
            canselect={false}
          />
          <AccuracyEfficiency
            name="seasons"
            value={season}
            accuracy={selectedseasonvalue.acc}
            efficiency={selectedseasonvalue.eff}
            changeselect={seasonChange}
            list={data.seasons}
          />
          <AccuracyEfficiency
            name="GW"
            value={gameweek}
            accuracy={selectedGameweekvalue.acc}
            efficiency={selectedGameweekvalue.eff}
            changeselect={gameweekChange}
            list={gameweeks}
          />
        </div>
      </div>
    </div>
  );
}
