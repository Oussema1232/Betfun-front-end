import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateSeason from "../../../commun/admin/addupdateseason";
import UpdateSeasonstatus from "../../../commun/admin/updateseasonstatus";
import DeleteModal from "../../../commun/modal";
import { deleteDomain } from "../../../features/domains/domainSlice";
import { loadSeasons } from "../../../features/seasons/seasonSlice";
export default function AdminDomain() {
  const dispatch = useDispatch();
  const betfunseasons = useSelector((state) => state.betfundata.seasons.list);
  const successdelete = useSelector(
    (state) => state.betfundata.seasons.onsuccess.message
  );
  const errordelete = useSelector(
    (state) => state.betfundata.seasons.errors.message
  );

  const [isFinished, setIsfinished] = useState();

  useEffect(() => {
    dispatch(loadSeasons(`/`));
  }, []);
  const initialseason = {
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
      <h1>Seasons</h1>
      <AddUpdateSeason initialSeason={initialseason} />
      {betfunseasons.map((s) => (
        <div
          key={s.id}
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
            <div style={{ marginRight: 10 }}>{s.name}</div>
          </div>
          <AddUpdateSeason update={true} initialSeason={s} />
        </div>
      ))}
      <UpdateSeasonstatus  />
    </div>
  );
}
