import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import DeleteModal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSeason } from "../../features/seasons/seasonSlice";

export default function Seasonstatus(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.seasons.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.seasons.onsuccess.message
  );
  const [isFinished, setIsFinished] = useState(props.initialSeason.isFinished);

  useEffect(() => setIsFinished(props.initialSeason.isFinished), [
    props.initialSeason,
  ]);

  const handleChangeisFinished = (event) => {
    const value = event.target.value;

    setIsFinished(value);
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ marginRight: 10 }}>{props.initialSeason.name}</div>
      <NativeSelect
        value={isFinished}
        name="isFinished"
        onChange={handleChangeisFinished}
      >
        <option value={1}>isFinished</option>
        <option value={0}>notFinished</option>
      </NativeSelect>
      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          dispatch(
            props.onsubmit(`/${props.initialSeason.id}/${props.domainId}`, {
              isfinished: isFinished,
            })
          )
        }
      >
        Update
      </button>
      <DeleteModal buttonname="delete">
        <h6>do you wanna delete {props.initialSeason.name} ?</h6>
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
                deleteSeason(`/${props.initialSeason.id}/${props.domainId}`)
              )
            }
          >
            Delete
          </div>
        </div>
      </DeleteModal>
    </div>
  );
}
