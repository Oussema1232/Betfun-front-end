import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateinformation from "../../../commun/admin/addupdateinformation";
import {
  loadInformations,
  postInformation,
  updateInformation,
} from "../../../features/informations/informationSlice";

export default function AdminInformation() {
  const dispatch = useDispatch();

  const betfuncategories = useSelector(
    (state) => state.betfundata.categories.list
  );
  const betfuninformations = useSelector(
    (state) => state.betfundata.informations.list
  );

  const [categoryId, setcategoryId] = useState(
    betfuncategories[0] && betfuncategories[0].id
  );

  const handleChangecategory = (event) => {
    const value = event.target.value;
    setcategoryId(value);

    dispatch(loadInformations(`/${value}`));
  };

  const initialinformation = {
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
      <h1>informations</h1>
      <AddUpdateinformation
        initialinFormation={initialinformation}
        onsubmit={postInformation}
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
      {betfuninformations.map((q) => (
        <AddUpdateinformation
          update={true}
          initialInformation={q}
          onsubmit={updateInformation}
        />
      ))}
    </div>
  );
}
