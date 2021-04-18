import React from "react";
import { useSelector } from "react-redux";
import {  Switch } from "react-router-dom";
import KnowledgeComponent from "../components/questionsparts/knowledgecomponent";
import ProtectedRoute from "../commun/protectedRoute";
import Categoriesknowledge from "../components/questionsparts/categoriesbackdrop";
import Playround from "../components/questionsparts/playround2";

export default function Knowledge(props) {
  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  return (
    <div
      style={{
        fontFamily:
          currentuser.language == "Eng"
            ? "'Indie Flower', cursive"
            : "'Katibeh', cursive",
        overflow: "auto",
      }}
    >
      <Switch>
        <ProtectedRoute
          path="/knowledge/categories"
          component={Categoriesknowledge}
        />
        <ProtectedRoute
          path="/knowledge/learngame/:categoryname/:categoryId"
          component={KnowledgeComponent}
        />
        <ProtectedRoute
          path="/knowledge/playround/:categoryname/:difficulty"
          component={Playround}
        />
      </Switch>
    </div>
  );
}
