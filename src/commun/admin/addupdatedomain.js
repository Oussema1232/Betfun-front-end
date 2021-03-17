import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";

import { loadDomains } from "../../features/domains/domainSlice";
import { updateDomain } from "../../features/domains/domainSlice";
import { postDomain } from "../../features/domains/domainSlice";

export default function AddUpdateDomain(props) {
  const dispatch = useDispatch();
  const betfundomains = useSelector((state) => state.betfundata.domains.list);
  const errormessage = useSelector(
    (state) => state.betfundata.domains.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.domains.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.domains.loading);

  const [domainname, setDomainname] = useState(props.initialDomain.domainname);
  const [domainId, setDomainId] = useState(props.initialDomain.id);
  const [file, setFile] = useState(props.initialDomain.domainname);

  useEffect(() => {
    dispatch(loadDomains());
  }, []);

  const handleChangeName = (event) => {
    const value = event.target.value;
    setDomainname(value);
  };
  const handleChangedomainId = (event) => {
    const value = event.target.value;
    console.log(value);
    setDomainId(value);
  };
  const handleChangelogo = (event) => {
    const value = event.target.files[0];
    setFile(value);
  };

  const submit = () => {
    const data = new FormData();

    data.append("domainname", domainname);
    data.append("domainId", domainId);
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

        <NativeSelect
          value={domainId}
          name="domainId"
          onChange={handleChangedomainId}
        >
          {betfundomains.map((d) => (
            <option value={d.id}>{d.domainname}</option>
          ))}
        </NativeSelect>

        <button onClick={props.update ? submit : submitpost}>
          {loading ? "loading ..." : props.update ? "Update" : "post"}
        </button>
        {errormessage ? (
          <div style={{ color: "red" }}>Error: {errormessage}</div>
        ) : (
          <div style={{ color: "green" }}>{successmessage}</div>
        )}
      </div>
    </div>
  );
}
