import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import {
  
  updateDomain,
  postDomain,
  deleteDomain,
} from "../../features/domains/domainSlice";

export default function AddUpdateDomain(props) {
  const dispatch = useDispatch();
  
  const errormessage = useSelector(
    (state) => state.betfundata.domains.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.domains.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.domains.loading);

  const [domainname, setDomainname] = useState(props.initialDomain.name);
  const [domainId, setDomainId] = useState(props.initialDomain.id);
  const [file, setFile] = useState(props.initialDomain.name);

  

  const handleChangeName = (event) => {
    const value = event.target.value;
    setDomainname(value);
  };

  const handleChangelogo = (event) => {
    const value = event.target.files[0];
    setFile(value);
  };

  const submit = () => {
    const data = new FormData();

    data.append("domainname", domainname);

    data.append("file", file);

    dispatch(updateDomain(`/${domainId}`, data));
  };

  const submitpost = () => {
    const data = new FormData();
    data.append("domainname", domainname);

    data.append("file", file);

    dispatch(postDomain(data));
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
        <input
          type="text"
          value={domainname}
          name="domainname"
          onChange={handleChangeName}
        />
        <input type="file" name="file" onChange={handleChangelogo} />

        <button onClick={props.update ? submit : submitpost}>
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>
        {errormessage ? (
          <div style={{ color: "red" }}>Error: {errormessage}</div>
        ) : (
          <div style={{ color: "green" }}>{successmessage}</div>
        )}
        <DeleteModal buttonname="delete">
          <h6>do you wanna delete {props.initialDomain.name} ?</h6>
          {errormessage ? (
            <h6 style={{ color: "red" }}>{errormessage}</h6>
          ) : (
            <h6 style={{ color: "green" }}>{successmessage}</h6>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              className="createbetorleagueButton"
              onClick={() =>
                dispatch(deleteDomain(`/${props.initialDomain.id}`))
              }
            >
              Delete
            </div>
          </div>
        </DeleteModal>
      </div>
    </div>
  );
}
