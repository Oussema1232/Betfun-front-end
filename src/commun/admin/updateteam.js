import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import {
  updateTeam,
  postTeam,
  deleteTeam,
} from "../../features/teams/teamSlice";

export default function UpdateTeam(props) {
  const dispatch = useDispatch();
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const loading = useSelector((state) => state.betfundata.teams.loading);
  const errormessage = useSelector(
    (state) => state.betfundata.teams.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.teams.onsuccess.message
  );

  const [teamname, setTeamname] = useState(props.initialTeam.name);
  const [plays, setPlays] = useState(props.initialTeam.plays);
  const [file, setFile] = useState(props.initialTeam.name);

  const handleChangeName = (event) => {
    const value = event.target.value;
    setTeamname(value);
  };
  const handleChangeplays = (event) => {
    const value = event.target.value;

    setPlays(value);
  };
  const handleChangelogo = (event) => {
    const value = event.target.files[0];
    setFile(value);
  };

  const submit = () => {
    const data = new FormData();

    data.append("name", teamname);
    data.append("plays", plays);
    data.append("file", file);

    dispatch(updateTeam(`/${props.initialTeam.id}`, data));
  };

  const submitpost = () => {
    const data = new FormData();
    data.append("name", teamname);
    data.append("domainId", currentdomain.id);
    data.append("file", file);

    dispatch(postTeam(data));
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
        <input
          type="text"
          id={"teamname" + props.initialTeam.id}
          value={teamname}
          name="teamname"
          onChange={handleChangeName}
        />
        <input type="file" name="file" onChange={handleChangelogo} />

        <NativeSelect
          id={"playornot" + props.initialTeam.id}
          value={plays}
          name="playornot"
          onChange={handleChangeplays}
        >
          <option value={1}>play</option>
          <option value={0}>no-play</option>
        </NativeSelect>

        <button onClick={props.update ? submit : submitpost}>
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>

        {props.update && (
          <DeleteModal buttonname="delete">
            <h6>do you wanna delete {props.initialTeam.name} ?</h6>
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
                onClick={() => {
                  dispatch(deleteTeam(`/${props.initialTeam.id}`));
                }}
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
