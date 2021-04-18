import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Levellimits(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.levels.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.levels.onsuccess.message
  );
  const [limits, setLimits] = useState({
    id: props.initialLevel.id,
    [`${props.domainname}startpoints`]: props.initialLevel[
      `${props.domainname}startpoints`
    ],
    [`${props.domainname}endpoints`]: props.initialLevel[
      `${props.domainname}endpoints`
    ],
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let statelimits = { ...limits, [name]: value };
    setLimits(statelimits);
    dispatch(
      props.updatelimit({
        id: props.initialLevel.id,

        [name]: value,
        targetpoints: name,
      })
    );
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ marginRight: 10 }}>{props.initialLevel.name}</div>
      <input
        type="number"
        name={`${props.domainname}startpoints`}
        value={limits[`${props.domainname}startpoints`]}
        onChange={handleChange}
      />
      <input
        type="number"
        name={`${props.domainname}endpoints`}
        value={limits[`${props.domainname}endpoints`]}
        onChange={handleChange}
      />

      <div>
        {errormessage ? (
          <h6 style={{ color: "red" }}>{errormessage}</h6>
        ) : (
          <h6 style={{ color: "green" }}>{successmessage}</h6>
        )}
      </div>
    </div>
  );
}
