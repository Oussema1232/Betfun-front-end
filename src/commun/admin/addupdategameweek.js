import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import { deleteGameweek } from "../../features/gameweeks/gameweekSlice";

export default function Addupdategameweek(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.gameweeks.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.gameweeks.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.gameweeks.loading);

  const [gameweek, setGameweek] = useState({ ...props.initialGameweek });

  const months = [
    { id: 0, monthname: "January" },
    { id: 1, monthname: "February" },
    { id: 2, monthname: "March" },
    { id: 3, monthname: "April" },
    { id: 4, monthname: "May" },
    { id: 5, monthname: "June" },
    { id: 6, monthname: "July" },
    { id: 7, monthname: "August" },
    { id: 8, monthname: "September" },
    { id: 9, monthname: "October" },
    { id: 10, monthname: "November" },
    { id: 11, monthname: "December" },
  ];

  const onchange = ({ currentTarget: input }) => {
    let data = { ...gameweek };
    data[input.name] = input.value;
    setGameweek(data);
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ marginRight: 10 }}>{props.initialGameweek.name}</div>
      <input name="name" value={gameweek.name} onChange={onchange} />
      <NativeSelect value={gameweek.month} name="month" onChange={onchange}>
        {months.map((m) => (
          <option key={m.id} value={m.monthname}>
            {m.monthname}
          </option>
        ))}
      </NativeSelect>
      <NativeSelect
        value={gameweek.seasonId}
        name="seasonId"
        onChange={onchange}
      >
        {props.seasons.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </NativeSelect>
      <NativeSelect
        value={gameweek.domainId}
        name="domainId"
        onChange={onchange}
      >
        {props.domains.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </NativeSelect>

      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          props.update
            ? dispatch(props.onsubmit(`/${props.initialGameweek.id}`, gameweek))
            : dispatch(props.onsubmit(gameweek))
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
        <DeleteModal buttonname="delete">
          <h6>do you wanna delete {props.initialGameweek.name} ?</h6>
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
                dispatch(deleteGameweek(`/${props.initialGameweek.id}`))
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
