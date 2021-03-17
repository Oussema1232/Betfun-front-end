import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import { updateMatch } from "../../features/matches/matcheSlice";
import { postMatch } from "../../features/matches/matcheSlice";
import { deleteMatch } from "../../features/matches/matcheSlice";
import { loadTeams } from "../../features/teams/teamSlice";
import DeleteModal from "../modal";

export default function Updatematch(props) {
  const dispatch = useDispatch();

  const [match, setMatch] = useState({
    team1Id: props.initialMatch.team1Id,
    team2Id: props.initialMatch.team2Id,
    played_on: props.initialMatch.played_on,
    cote_1: props.initialMatch.cote_1,
    cote_x: props.initialMatch.cote_x,
    cote_2: props.initialMatch.cote_2,
  });

  const teams = useSelector((state) => state.betfundata.teams.list);
  const loading = useSelector((state) => state.betfundata.teams.loading);

  const errormessage = useSelector(
    (state) => state.betfundata.matches.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.matches.onsuccess.message
  );

  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let statematch = { ...match, [name]: value };

    setMatch(statematch);
  };

  useEffect(() => {
    dispatch(loadTeams(`/${currentdomain.id}`));
  }, [currentdomain.id]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          borderBottom: "1px dashed black",
          paddingBottom: 5,
          marginBottom: 5,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="team1Id">team1</label>
          <NativeSelect
            value={match.team1Id}
            id="team1Id"
            name="team1Id"
            onChange={handleChange}
          >
            {!props.update && <option value=""></option>}
            {teams.map((team) => (
              <option value={team.id}>{team.name}</option>
            ))}
          </NativeSelect>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="team2Id">team1</label>
          <NativeSelect
            id="team2Id"
            value={match.team2Id}
            name="team2Id"
            onChange={handleChange}
          >
            {!props.update && <option value=""></option>}
            {teams.map((team) => (
              <option value={team.id}>{team.name}</option>
            ))}
          </NativeSelect>
        </div>

        <input
          type="datetime"
          value={match.played_on}
          id="played_on"
          name="played_on"
          onChange={handleChange}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="cote_1">cote_1</label>
          <input
            id="cote_1"
            style={{ width: 35 }}
            type="text"
            value={match.cote_1}
            name="cote_1"
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="cote_x">cote_x</label>
          <input
            style={{ width: 35 }}
            type="text"
            value={match.cote_x}
            name="cote_x"
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label for="cote_2">cote_2</label>
          <input
            style={{ width: 35 }}
            type="text"
            value={match.cote_2}
            name="cote_2"
            onChange={handleChange}
          />
        </div>
        <button
          onClick={() => {
            if (props.update) {
              dispatch(updateMatch(`/${props.initialMatch.idMatch}`, match));
            } else {
              dispatch(postMatch({ ...match, gameweekId: props.gameweekId }));
            }
          }}
        >
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>
        {props.update && (
          <DeleteModal buttonname="delete">
            <h6>do you wanna delete this match ?</h6>
            {errormessage ? (
              <h6 style={{ color: "red" }}>{errormessage}</h6>
            ) : (
              <h6 style={{ color: "green" }}>{successmessage}</h6>
            )}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div
                className="createbetorleagueButton"
                onClick={() =>
                  dispatch(deleteMatch(`/${props.initialMatch.idMatch}`))
                }
              >
                Delete
              </div>
            </div>
          </DeleteModal>
        )}
      </div>
    </div>
  );
}
