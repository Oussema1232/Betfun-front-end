import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdateCategory from "../../../commun/admin/addupdatecategory";
import {
  loadCategories,
  updateCategory,
  postCategory,
} from "../../../features/categories/categorySlice";

export default function AdminCountry() {
  const categories = useSelector((state) => state.betfundata.categories.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories(`/Eng`));
  }, []);

  const initialcategory = {
    id: "",
    Engname: "",
    Arabname: "",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 10,
        // marginTop: 100,
      }}
    >
      <h1>categories</h1>
      <AddUpdateCategory
        initialCategory={initialcategory}
        onsubmit={postCategory}
      />
      {categories.map((c) => (
        <div
          key={c.id}
          style={{
            width: "100%",
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",

            borderBottom: "1px dashed brown",
            marginBottom: 10,
          }}
        >
          <AddUpdateCategory
            update={true}
            initialCategory={c}
            onsubmit={updateCategory}
          />
        </div>
      ))}
    </div>
  );
}
