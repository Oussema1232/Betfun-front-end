import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  loadLevelbydomainadmin,
  sousListLevelLimitsUpdated,
  editlevelslimits,
} from "../../features/levels/levelSlice";
import Levellimits from "./levellimits";

export default function LevelperdomainUpdate(props) {
  const dispatch = useDispatch();

  const betfundomains = useSelector((state) => state.betfundata.domains.list);

  const levelbydomainadmin = useSelector(
    (state) => state.betfundata.levels.listbydomainadmin
  );
  const levelslimits = useSelector((state) => state.betfundata.levels.souslist);

  const [domainId, setDomainId] = useState(
    betfundomains[0] && betfundomains[0].id
  );
  const [domainname, setDomainname] = useState(
    betfundomains[0] && betfundomains[0].name.split(" ").join("")
  );

  const handleChangedomain = (event) => {
    const value = event.target.value;
    setDomainId(value);
    let domainnamevalue = betfundomains.filter((d) => d.id == value);
    setDomainname(domainnamevalue[0].name);
    dispatch(loadLevelbydomainadmin(`/${value}`));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Update Limits</h1>
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
          {levelbydomainadmin.map((l) => (
            <Levellimits
              initialLevel={l}
              updatelimit={sousListLevelLimitsUpdated}
              domainname={domainname.split(" ").join("")}
            />
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          dispatch(editlevelslimits(`/${domainId}`, levelslimits));
        }}
      >
        ChangeLimits
      </button>
    </div>
  );
}
