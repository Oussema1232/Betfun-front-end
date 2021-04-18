import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateLeaguesgenres from "../../../commun/admin/addupdateleaguesgenre";
import { loadLeaguesgenres } from "../../../features/leaguesgenres/leaguegenreSlice";

export default function AdminLeaguesgenres() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLeaguesgenres());
  }, []);
  const genres = useSelector((state) => state.betfundata.leaguesgenres.list);
  const initialleaguesgenre = {
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
      <h1>Leagues genres</h1>
      <AddUpdateLeaguesgenres initialLeaguesgenre={initialleaguesgenre} />
      {genres.map((d) => (
        <div
          key={d.id}
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
            <div style={{ marginRight: 10 }}>{d.name}</div>
          </div>
          <AddUpdateLeaguesgenres update={true} initialLeaguesgenre={d} />
        </div>
      ))}
    </div>
  );
}
