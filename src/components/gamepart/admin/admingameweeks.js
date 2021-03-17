import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import { loadGameweeks } from "../../../features/gameweeks/gameweekSlice";
import { updateGameweek } from "../../../features/gameweeks/gameweekSlice";
import { postGameweek } from "../../../features/gameweeks/gameweekSlice";
import Addupdategameweek from "../../../commun/admin/addupdategameweek";

export default function AdminGameweeks(props) {
  const dispatch = useDispatch();

  const initialGameweek = { name: "", month: "", seasonId: "", domainId: "" };

  const betfundomains = useSelector((state) => state.betfundata.domains.list);
  const betfunseasons = useSelector((state) => state.betfundata.seasons.list);

  const betfundomaingameweeks = useSelector(
    (state) => state.betfundata.gameweeks.list
  );

  const [domainId, setDomainId] = useState(
    betfundomains[0] && betfundomains[0].id
  );

  const handleChangedomain = (event) => {
    const value = event.target.value;
    setDomainId(value);

    dispatch(loadGameweeks(`/${value}`));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Gameweeks</h1>
      <Addupdategameweek
        initialGameweek={initialGameweek}
        onsubmit={postGameweek}
        domains={betfundomains}
        seasons={betfunseasons}
      />
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
            <option value={d.id}>{d.domainname}</option>
          ))}
        </NativeSelect>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {betfundomaingameweeks.map((g) => (
            <Addupdategameweek
              update={true}
              initialGameweek={g}
              onsubmit={updateGameweek}
              domains={betfundomains}
              seasons={betfunseasons}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
