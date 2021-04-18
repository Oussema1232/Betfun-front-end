import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import {
  updateLevel,
  deleteLevel,
  postLevel,
} from "../../features/levels/levelSlice";

export default function AddUpdatelevel(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.levels.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.levels.onsuccess.message
  );
  const loading = useSelector((state) => state.betfundata.levels.loading);
  const [levelname, setlevelname] = useState(props.initialLevel.name);

  const [file, setFile] = useState(props.initialLevel.name);

  const handleChangeName = (event) => {
    const value = event.target.value;
    setlevelname(value);
  };

  const handleChangelogo = (event) => {
    const value = event.target.files[0];
    setFile(value);
  };

  const submit = () => {
    const data = new FormData();

    data.append("name", levelname);

    data.append("file", file);
    props.update
      ? dispatch(updateLevel(`/update/${props.initialLevel.id}`, data))
      : dispatch(postLevel(data));
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
          value={levelname}
          name="levelname"
          onChange={handleChangeName}
        />
        <input type="file" name="file" onChange={handleChangelogo} />

        <button onClick={submit}>
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>
        {errormessage ? (
          <div style={{ color: "red" }}>Error: {errormessage}</div>
        ) : (
          <div style={{ color: "green" }}>{successmessage}</div>
        )}
        {props.update && (
          <DeleteModal buttonname="delete">
            <h6>do you wanna delete {props.initialLevel.name} ?</h6>
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
                  dispatch(deleteLevel(`/${props.initialLevel.id}`))
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
