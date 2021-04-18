import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSuggestions,
  deleteSuggestion,
} from "../../../features/suggestions/suggestionSlice";
import DeleteModal from "../../../commun/modal";

export default function AdminSuggestion() {
  const suggestions = useSelector((state) => state.betfundata.suggestions.list);
  const errormessage = useSelector(
    (state) => state.betfundata.suggestions.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.suggestions.onsuccess.message
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSuggestions(`/`));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <h1>suggestions</h1>

      <div
        style={{
          width: "100%",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",

          borderBottom: "1px dashed brown",
          marginBottom: 10,
        }}
      >
        {suggestions.map((s) => (
          <div
            key={s.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: 10,
              border: "1px solid blue",
            }}
          >
            <div
              style={{
                margin: 10,
                padding: 10,
                border: "1px dashed black",
              }}
            >
              {s.description}
            </div>
            <div
              style={{
                margin: 10,
                padding: 10,
                border: "1px dashed black",
              }}
            >
              {s.answer}
            </div>
            <div
              style={{
                margin: 10,
                padding: 10,
                border: "1px dashed black",
              }}
            >
              {s.userId}
            </div>
            <div
              style={{
                margin: 10,
                padding: 10,
                border: "1px dashed black",
              }}
            >
              {s.username}
            </div>
            <DeleteModal buttonname="delete">
              <h6>do you wanna delete this suggestion ?</h6>
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
                  onClick={() => dispatch(deleteSuggestion(`/${s.id}`))}
                >
                  Delete
                </div>
              </div>
            </DeleteModal>
          </div>
        ))}
      </div>
    </div>
  );
}
