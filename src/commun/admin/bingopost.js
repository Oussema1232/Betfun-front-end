import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";

import { loadTeams } from "../../features/teams/teamSlice";
import { matchBingoResultscreated } from "../../features/matches/matcheSlice";

export default function Bingopost(props) {
  const dispatch = useDispatch();

  const bingos = [
    { value: "'1'", name: "1" },
    { value: "'x'", name: "x" },
    { value: "'2'", name: "2" },
  ];

  const [match, setMatch] = useState({
    bingo: `'${props.initialMatch.bingo}'`,
    goals1: props.initialMatch.goals1,
    goals2: props.initialMatch.goals2,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let statematch = {
      ...match,
      [name]: value,
      id: props.initialMatch.idMatch,
    };
    setMatch(statematch);
    dispatch(matchBingoResultscreated(statematch));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px dashed black",
          paddingBottom: 5,
          marginBottom: 5,
        }}
      >
        <NativeSelect value={match.bingo} name="bingo" onChange={handleChange}>
          {bingos.map((bingo) => (
            <option value={bingo.value}>{bingo.name}</option>
          ))}
        </NativeSelect>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="goals1">goals1</label>
          <input
            id="goals1"
            style={{ width: 35 }}
            type="text"
            value={match.goals1}
            name="goals1"
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="goals2">goals2</label>
          <input
            style={{ width: 35 }}
            type="text"
            value={match.goals2}
            name="goals2"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
