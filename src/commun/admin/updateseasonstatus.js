import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSeasonbydomainadmin,
  updateSeason,
} from "../../features/seasons/seasonSlice";
import Seasonstatus from "./seasonstatus";

export default function UpdateSeasonstatus(props) {
  const dispatch = useDispatch();

  const betfundomains = useSelector((state) => state.betfundata.domains.list);

  const betfundomainseasons = useSelector(
    (state) => state.betfundata.seasons.listbydomainadmin
  );

  const [domainId, setDomainId] = useState(
    betfundomains[0] && betfundomains[0].id
  );

  const handleChangedomain = (event) => {
    const value = event.target.value;
    setDomainId(value);

    dispatch(loadSeasonbydomainadmin(`/${value}`));
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
        <NativeSelect
          value={domainId}
          name="domainId"
          onChange={handleChangedomain}
        >
          {betfundomains.map((d) => (
            <option value={d.id}>{d.name}</option>
          ))}
        </NativeSelect>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {betfundomainseasons.map((s) => (
            <Seasonstatus
              initialSeason={s}
              onsubmit={updateSeason}
              domainId={domainId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
