import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateDomain from "../../../commun/admin/addupdatedomain";
import { loadDomains } from "../../../features/domains/domainSlice";


export default function AdminDomain() {
  const dispatch = useDispatch();
  const betfundomains = useSelector((state) => state.betfundata.domains.list);

  const initialdomain = {
    domainname: "",
    id: "",
  };

  useEffect(() => {
    dispatch(loadDomains());
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <h1>Domains</h1>
      <AddUpdateDomain initialDomain={initialdomain} />
      {betfundomains.map((d) => (
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
            <div style={{ marginRight: 10 }}>{d.domainname}</div>
            <img style={{ width: 50 }} src={d.logo} alt={d.domainname} />
          </div>
          <AddUpdateDomain
            update={true}
            initialDomain={d}
            betfundomains={betfundomains}
          />
        </div>
      ))}
    </div>
  );
}
