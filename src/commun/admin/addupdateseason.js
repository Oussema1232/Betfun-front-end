import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";

import {
  deleteSeason,
  updateSeason,
  postSeason,
} from "../../features/seasons/seasonSlice";

export default function AddUpdateSeason(props) {
  const dispatch = useDispatch();
  const errormessage = useSelector(
    (state) => state.betfundata.seasons.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.seasons.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.seasons.loading);

  const betdomains = useSelector((state) => state.betfundata.domains.list);

  const [seasonname, setSeasonname] = useState(props.initialSeason.name);
  const [domainId, setDomainId] = useState(betdomains[0] && betdomains[0].id);

  const handleChangeName = (event) => {
    const value = event.target.value;
    setSeasonname(value);
  };
  const handleChangedomainId = (event) => {
    const value = event.target.value;

    setDomainId(value);
  };

  const submitupdate = () => {
    dispatch(updateSeason(`/${props.initialSeason.id}`, { name: seasonname }));
  };

  const submitpost = () => {
    dispatch(postSeason({ name: seasonname, domainId: domainId }));
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
          value={seasonname}
          name="seasonname"
          onChange={handleChangeName}
        />

        {!props.update && (
          <NativeSelect
            value={domainId}
            name="domainId"
            onChange={handleChangedomainId}
          >
            <option value=""></option>
            {betdomains.map((d) => (
              <option value={d.id}>{d.name}</option>
            ))}
          </NativeSelect>
        )}

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
                  dispatch(deleteSeason(`/${props.initialSeason.id}`))
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
