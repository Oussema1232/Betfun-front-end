import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTeams } from "../../features/teams/teamSlice";
import UpdateTeam from "../../commun/admin/updateteam";
import Spincrescentcomponent from "../../commun/logos/spincrescentcomponent";

export default function Teams(props) {
  const dispatch = useDispatch();
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const loading = useSelector((state) => state.betfundata.teams.loading);
  const successmessage = useSelector(
    (state) => state.betfundata.teams.onsuccess.message
  );
  const errormessage = useSelector(
    (state) => state.betfundata.teams.errors.message
  );
  const teams = useSelector((state) => state.betfundata.teams.list);
  useEffect(() => {
    dispatch(loadTeams(`/${currentdomain.id}`));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 10,
        marginTop: 100,
        color: "black",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "99%", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {loading ? (
            <Spincrescentcomponent color="black" size="1x" />
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {successmessage ? (
                <div>success : {successmessage}</div>
              ) : (
                <div>error : {errormessage}</div>
              )}
            </div>
          )}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "2px solid blue",
          }}
        >
          <div>Post Team</div>
          <UpdateTeam initialTeam={{ id: "", name: "" }} />
        </div>
        {teams.map((t) => (
          <div
            style={{
              width: "100%",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px dashed brown",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: "100%",
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ marginRight: 10 }}>{t.name}</div>
              <img style={{ width: 50 }} src={t.logo} alt={t.name} />
            </div>
            <UpdateTeam update={true} initialTeam={t} />
          </div>
        ))}
      </div>
    </div>
  );
}
