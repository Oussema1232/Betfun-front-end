import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import { deleteInformation } from "../../features/informations/informationSlice";

export default function Addupdateinformation(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.informations.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.informations.onsuccess.message
  );

  const categories = useSelector((state) => state.betfundata.categories.list);

  const loading = useSelector((state) => state.betfundata.informations.loading);

  const [information, setInformation] = useState({
    ...props.initialInformation,
  });

  const onchange = ({ currentTarget: input }) => {
    let data = { ...information };
    data[input.name] = input.value;
    setInformation(data);
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="Engdescription">Engdescription</label>
        <textarea
          name="Engdescription"
          value={information.Engdescription}
          onChange={onchange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="Arabdescription">Arabdescription</label>
        <textarea
          name="Arabdescription"
          value={information.Arabdescription}
          onChange={onchange}
        />
      </div>
      {!props.update && (
        <NativeSelect
          value={information.categoryId}
          name="categoryId"
          onChange={onchange}
        >
          <option value=""></option>
          {categories.map((d) => (
            <option value={d.id}>{d.Engname}</option>
          ))}
        </NativeSelect>
      )}

      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          props.update
            ? dispatch(
                props.onsubmit(`/${props.initialInformation.id}`, information)
              )
            : dispatch(props.onsubmit(information))
        }
      >
        {loading ? "loading ..." : props.update ? "Update" : "post"}
      </button>
      {errormessage ? (
        <div style={{ color: "red" }}>Error: {errormessage}</div>
      ) : (
        <div style={{ color: "green" }}>{successmessage}</div>
      )}
      {props.update && (
        <DeleteModal buttonname="Delete">
          <h6>do you wanna delete Information ?</h6>
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
                dispatch(deleteInformation(`/${props.initialInformation.id}`))
              }
            >
              Delete
            </div>
          </div>
        </DeleteModal>
      )}
    </div>
  );
}
