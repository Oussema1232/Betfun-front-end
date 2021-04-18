import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdatedifficulty from "../../../commun/admin/addupdatedifficulty";
import {
  loadDifficulties,
  postDifficulty,
  updateDifficulty,
} from "../../../features/difficulties/difficultySlice";

export default function AdminDifficulty() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDifficulties(`/`));
  }, []);

  const betfundifficulties = useSelector(
    (state) => state.betfundata.difficulties.list
  );

  const initialdifficulty = {
    Engname: "",
    Arabname: "",
    coefficient: "",
    minCorrect: "",
    id: "",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <h1>Difficulties</h1>
      <AddUpdatedifficulty
        initialDifficulty={initialdifficulty}
        onsubmit={postDifficulty}
      />
      {betfundifficulties.map((q) => (
        <AddUpdatedifficulty
          update={true}
          initialDifficulty={q}
          onsubmit={updateDifficulty}
        />
      ))}
    </div>
  );
}
