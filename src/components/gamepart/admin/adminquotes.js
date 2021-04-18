import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddUpdatequote from "../../../commun/admin/addupdatequote";
import {
  loadQuotes,
  postQuote,
  updateQuote,
} from "../../../features/quotes/quoteSlice";

export default function AdminQuote() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQuotes(`/`));
  }, []);

  const betfunquotes = useSelector((state) => state.betfundata.quotes.list);

  const initialquote = {
    description: "",
    author: "",
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
      <h1>quotes</h1>
      <AddUpdatequote initialQuote={initialquote} onsubmit={postQuote} />
      {betfunquotes.map((q) => (
        <AddUpdatequote update={true} initialQuote={q} onsubmit={updateQuote} />
      ))}
    </div>
  );
}
