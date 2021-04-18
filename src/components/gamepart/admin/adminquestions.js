import React, { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import AddUpdatequestion from "../../../commun/admin/addupdatequestion";
import {
  loadQuestions,
  postQuestion,
  updateQuestion,
} from "../../../features/questions/questionSlice";

export default function Adminquestion() {
  const dispatch = useDispatch();

  const betfuncategories = useSelector(
    (state) => state.betfundata.categories.list
  );
  const betfunquestions = useSelector(
    (state) => state.betfundata.questions.list
  );

  const [categoryId, setcategoryId] = useState(
    betfuncategories[0] && betfuncategories[0].id
  );

  const [cote, setCote] = useState("");

  const handleChangecategory = (event) => {
    const value = event.target.value;
    setcategoryId(value);

    dispatch(loadQuestions(`/${value}`));
  };

  const initialquestion = {
    id: "",
    Engdescription: "",
    Arabdescription: "",
    categoryId: "",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <h1>questions</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
        }}
      >
        <h6>Update all cotes</h6>
        <input
          name="cote"
          value={cote}
          onChange={(e) => setCote(e.currentTarget.value)}
        />
        <button onClick={() => dispatch(updateQuestion(`/`, { cote }))}>
          Update cotes
        </button>
      </div>
      <AddUpdatequestion
        initialQuestion={initialquestion}
        onsubmit={postQuestion}
      />
      <NativeSelect
        value={categoryId}
        name="categoryId"
        onChange={handleChangecategory}
      >
        {betfuncategories.map((c) => (
          <option value={c.id}>{c.Engname}</option>
        ))}
      </NativeSelect>
      {betfunquestions.map((q) => (
        <AddUpdatequestion
          update={true}
          initialQuestion={q}
          onsubmit={updateQuestion}
        />
      ))}
    </div>
  );
}
