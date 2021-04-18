import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import { deleteCategory } from "../../features/categories/categorySlice";

export default function Addupdatecategory(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.categories.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.categories.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.categories.loading);

  const [category, setCategory] = useState({
    ...props.initialCategory,
  });

  const onchange = ({ currentTarget: input }) => {
    let data = { ...category };
    data[input.name] = input.value;
    setCategory(data);
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="Engname">Engname</label>
        <input name="Engname" value={category.Engname} onChange={onchange} />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="Arabname">Arabname</label>
        <input name="Arabname" value={category.Arabname} onChange={onchange} />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="color">color</label>
        <input name="color" value={category.color} onChange={onchange} />
      </div>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="delay">delay</label>
        <input name="delay" value={category.delay} onChange={onchange} />
      </div>

      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          props.update
            ? dispatch(props.onsubmit(`/${props.initialCategory.id}`, category))
            : dispatch(props.onsubmit(category))
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
          <h6>do you wanna delete category ?</h6>
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
                dispatch(deleteCategory(`/${props.initialCategory.id}`))
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
