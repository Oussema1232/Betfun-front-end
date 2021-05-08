import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modal";
import { deleteQuestion } from "../../features/questions/questionSlice";

export default function Addupdatequestion(props) {
  const dispatch = useDispatch();
  const betfuncategories = useSelector(
    (state) => state.betfundata.categories.list
  );

  const inputs = [
    { id: 1, name: "Engdescription" },
    { id: 2, name: "Arabdescription" },
    { id: 3, name: "EngAnswerone" },
    { id: 4, name: "EngAnswertwo" },
    { id: 5, name: "EngAnswerthree" },
    { id: 6, name: "EngAnswerfour" },
    { id: 7, name: "EngCorrectAnswer" },
    { id: 8, name: "ArabAnswerone" },
    { id: 9, name: "ArabAnswertwo" },
    { id: 10, name: "ArabAnswerthree" },
    { id: 11, name: "ArabAnswerfour" },
    { id: 12, name: "ArabCorrectAnswer" },
    { id: 13, name: "cote" },
    { id: 15, name: "suggestorId" },
  ];

  const errormessage = useSelector(
    (state) => state.betfundata.questions.errors.message
  );
  const successmessage = useSelector(
    (state) => state.betfundata.questions.onsuccess.message
  );

  const loading = useSelector((state) => state.betfundata.questions.loading);

  const [question, setQuestion] = useState({
    ...props.initialQuestion,
  });

  const onchange = ({ currentTarget: input }) => {
    let data = { ...question };
    data[input.name] = input.value;
    setQuestion(data);
  };
  const rtl = (element) => {
    if (element.setSelectionRange) {
      element.setSelectionRange(0, 0);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 20 }}>
      {inputs.map((i) => (
        <div style={{ display: "flex", flexDirection: "Column" }}>
          <label for={i.name}>{i.name}</label>
          <textarea
            name={i.name}
            style={{ textAlign: "end", direction: "RTL" }}
            value={question[i.name]}
            onChange={onchange}
            onKeyUp={(e) => rtl(e)}
          />
        </div>
      ))}
      <NativeSelect
        value={question.categoryId}
        name="categoryId"
        onChange={onchange}
      >
        {betfuncategories.map((c) => (
          <option value={c.id}>{c.Engname}</option>
        ))}
      </NativeSelect>
      <button
        style={{ marginLeft: 10 }}
        onClick={() =>
          props.update
            ? dispatch(props.onsubmit(`/${props.initialQuestion.id}`, question))
            : dispatch(props.onsubmit(question))
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
          <h6>do you wanna delete question ?</h6>
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
                dispatch(deleteQuestion(`/${props.initialQuestion.id}`))
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
