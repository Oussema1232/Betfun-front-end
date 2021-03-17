import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";

import { loadDomains } from "../../features/domains/domainSlice";
import { loadSeasons } from "../../features/seasons/seasonSlice";
import { updateSeason } from "../../features/seasons/seasonSlice";
import { postSeason } from "../../features/seasons/seasonSlice";

export default function AddUpdateCountry(props) {
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
              <option value={d.id}>{d.domainname}</option>
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
      </div>
    </div>
  );
}
