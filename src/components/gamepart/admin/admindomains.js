import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateDomain from "../../../commun/admin/addupdatedomain";
import DeleteModal from "../../../commun/modal";
import { deleteDomain } from "../../../features/domains/domainSlice";
export default function AdminDomain() {
  const dispatch = useDispatch();
  const betfundomains = useSelector((state) => state.betfundata.domains.list);
  const successdelete = useSelector(
    (state) => state.betfundata.domains.onsuccess.message
  );
  const errordelete = useSelector(
    (state) => state.betfundata.domains.errors.message
  );

  const initialdomain = {
    domainname: "",
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
            <DeleteModal buttonname="delete">
              <h6>do you wanna delete {d.domainname} ?</h6>
              {errordelete ? <h6>{errordelete}</h6> : <h6>{successdelete}</h6>}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div
                  className="createbetorleagueButton"
                  onClick={() => dispatch(deleteDomain(`/${d.id}`))}
                >
                  delete
                </div>
              </div>
            </DeleteModal>
          </div>
          <AddUpdateDomain update={true} initialDomain={d} />
        </div>
      ))}
    </div>
  );
}
