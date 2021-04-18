import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import {
  deleteLeaguegenre,
  updateLeaguegenre,
  postLeaguegenre,
} from "../../features/leaguesgenres/leaguegenreSlice";

export default function AddUpdateLeaguegenre(props) {
  const dispatch = useDispatch();
  const errormessage = useSelector(
    (state) => state.betfundata.leaguesgenres.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.leaguesgenres.onsuccess.message
  );

  const loading = useSelector(
    (state) => state.betfundata.leaguesgenres.loading
  );

  const [leaguesgenrename, setLeaguesgenrename] = useState(
    props.initialLeaguesgenre.name
  );

  const handleChangeName = (event) => {
    const value = event.target.value;
    setLeaguesgenrename(value);
  };

  const submitupdate = () => {
    dispatch(
      updateLeaguegenre(`/${props.initialLeaguesgenre.id}`, {
        name: leaguesgenrename,
      })
    );
  };

  const submitpost = () => {
    dispatch(postLeaguegenre({ name: leaguesgenrename }));
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
          value={leaguesgenrename}
          name="leaguesgenrename"
          onChange={handleChangeName}
        />

        <button onClick={props.update ? submitupdate : submitpost}>
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>
        {errormessage ? (
          <div style={{ color: "red" }}>Error: {errormessage}</div>
        ) : (
          <div style={{ color: "green" }}>{successmessage}</div>
        )}
        {props.update && (
          <DeleteModal buttonname="delete">
            <h6>do you wanna delete {props.initialLeaguesgenre.name} ?</h6>
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
                  dispatch(
                    deleteLeaguegenre(`/${props.initialLeaguesgenre.id}`)
                  )
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
