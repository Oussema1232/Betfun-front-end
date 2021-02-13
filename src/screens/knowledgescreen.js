import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import KnowledgeComponent from "../components/questionsparts/knowledgecomponent";

import Categoriesknowledge from "../components/questionsparts/categoriesbackdrop";
import Playround from "../components/questionsparts/playround2";
import useSound from "use-sound";
import music from "../sounds/openalllearn.mp3";
import Player from "../commun/backgroundMusic";

export default function Knowledge(props) {
  const [showcursor, setShowcursor] = useState(true);

  const mouseCursorRef = React.createRef();

  return (
    <div
      onTouchStart={() => {
        setShowcursor(false);
      }}
      onMouseLeave={() => {
        setShowcursor(false);
      }}
      onMouseEnter={() => setShowcursor(true)}
      onMouseMove={(e) => {
        const isitplayround = props.location.pathname.slice(
          props.location.pathname.lastIndexOf("/") + 1
        );

        if (isitplayround == "playround") {
          setShowcursor(false);
        } else {
          const mouseCursor = mouseCursorRef.current;
          mouseCursor.style.top = e.pageY + "px";
          mouseCursor.style.left = e.pageX + "px";
        }
      }}
    >
      {showcursor && (
        <div className="cursor" ref={mouseCursorRef}>
          X
        </div>
      )}
      {/* <Player url="../sounds/openalllearn.mp3" /> */}
      <Switch>
        <Route path="/knowledge/categories" component={Categoriesknowledge} />
        <Route path="/knowledge/learngame" component={KnowledgeComponent} />
        <Route path="/knowledge/playround" component={Playround} />
      </Switch>
    </div>
  );
}
