import React from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Spincrescentcomponenet from "./logos/spincrescentcomponent";

export default function UserdomainaddItem({
  loading,
  openalert,
  adduserdomain,
  domain,
  errormessage,
}) {
  const dispatch = useDispatch();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 5,
          marginLeft: 8,
          boxSizing: "bordeer-box",
          borderBottom: "1px solid #f9a828",
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: "white",
            overflow: "hidden",
          }}
        >
          <img
            src={domain.logo}
            alt={domain.name}
            style={{
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
          />
        </div>
        <div
          style={{
            marginLeft: 4,
            marginRight: 4,
            fontSize: 16,
            boxSizing: "border-box",
            width: 150,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          {domain.name}
        </div>
        <div style={{ width: 50 }}>
          {loading ? (
            <Spincrescentcomponenet size="2x" color="#07617d" />
          ) : (
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="2x"
              color="#07617d"
              style={{ cursor: "pointer", fontSize: 23 }}
              onClick={() => {
                dispatch(adduserdomain(domain));
                openalert();
              }}
            />
          )}
        </div>
      </div>
      {loading == false && (
        <div>
          {errormessage && (
            <div
              className="errorclass"
              style={{ textAlign: "center", fontSize: 10 }}
            >
              {errormessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
