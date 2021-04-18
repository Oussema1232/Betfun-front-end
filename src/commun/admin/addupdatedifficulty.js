import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import { deleteDifficulty } from "../../features/difficulties/difficultySlice";

export default function Addupdatequote(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.difficulties.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.difficulties.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.difficulties.loading);

  const [difficulty, setDifficulty] = useState({ ...props.initialDifficulty });

  const onchange = ({ currentTarget: input }) => {
    let data = { ...difficulty };
    data[input.name] = input.value;
    setDifficulty(data);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 20 }}>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="Engname">Engname</label>
        <input name="Engname" value={difficulty.Engname} onChange={onchange} />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="Arabname">Arabname</label>
        <input
          name="Arabname"
          value={difficulty.Arabname}
          onChange={onchange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="minCorrect">minCorrect</label>
        <input
          name="minCorrect"
          value={difficulty.minCorrect}
          onChange={onchange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="coefficient">coefficient</label>
        <input
          name="coefficient"
          value={difficulty.coefficient}
          onChange={onchange}
        />
      </div>
      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          props.update
            ? dispatch(
                props.onsubmit(`/${props.initialDifficulty.id}`, difficulty)
              )
            : dispatch(props.onsubmit(difficulty))
        }
      >
        {loading ? "loading ..." : props.update ? "Update" : "post"}
      </button>
      {errormessage ? (
        <div style={{ color: "red" }}>Error: {errormessage}</div>
      ) : (
        <div style={{ color: "green" }}>{successmessage}</div>
      )}
      {props.update && (
        <DeleteModal buttonname="Delete">
          <h6>do you wanna delete {props.initialDifficulty.name} ?</h6>
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
                dispatch(deleteDifficulty(`/${props.initialDifficulty.id}`))
              }
            >
              Delete
            </div>
          </div>
        </DeleteModal>
      )}
    </div>
  );
}
