import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateLevel from "../../../commun/admin/addupdatelevel";
import { loadLevels } from "../../../features/levels/levelSlice";

import LevelperdomainUpdate from "../../../commun/admin/levelperdomainlimits";

export default function AdminLevels() {
  const dispatch = useDispatch();
  const betfunlevels = useSelector((state) => state.betfundata.levels.list);

  useEffect(() => {
    dispatch(loadLevels(`/`));
  }, []);
  const initiallevel = {
    name: "",
    id: "",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <h1>Levels</h1>
      <AddUpdateLevel initialLevel={initiallevel} />
      {betfunlevels.map((l) => (
        <div
          key={l.id}
          style={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",

            borderBottom: "1px dashed brown",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: "100%",
              height: 50,
              marginBottom: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: 10 }}>{l.name}</div>
            <img style={{ width: 50 }} src={l.logo} alt={l.logo} />
          </div>
          <AddUpdateLevel update={true} initialLevel={l} />
        </div>
      ))}
      <LevelperdomainUpdate />
    </div>
  );
}
