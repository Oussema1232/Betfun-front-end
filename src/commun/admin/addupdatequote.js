import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import { deleteQuote } from "../../features/quotes/quoteSlice";

export default function Addupdatequote(props) {
  const dispatch = useDispatch();

  const errormessage = useSelector(
    (state) => state.betfundata.quotes.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.quotes.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.quotes.loading);

  const [quote, setQuote] = useState({ ...props.initialQuote });

  const onchange = ({ currentTarget: input }) => {
    let data = { ...quote };
    data[input.name] = input.value;
    setQuote(data);
  };

  return (
    <div style={{ display: "flex", marginBottom: 20 }}>
      <div style={{ display: "flex", flexDirection: "Column" }}>
        <label for="description">description</label>
        <textarea
          name="description"
          value={quote.description}
          onChange={onchange}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label for="description">author</label>
        <input name="author" value={quote.author} onChange={onchange} />
      </div>
      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          props.update
            ? dispatch(props.onsubmit(`/${props.initialQuote.id}`, quote))
            : dispatch(props.onsubmit(quote))
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
          <h6>do you wanna delete {props.initialQuote.name} ?</h6>
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
              onClick={() => dispatch(deleteQuote(`/${props.initialQuote.id}`))}
            >
              Delete
            </div>
          </div>
        </DeleteModal>
      )}
    </div>
  );
}
