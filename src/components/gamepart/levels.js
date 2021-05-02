import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LevelandLimits from "../../commun/logos/levelandLimits";
import { loadLevelbydomainadmin } from "../../features/levels/levelSlice";
import Spincrescentcomponenet from "../../commun/logos/spincrescentcomponent";

export default function Levels() {
  const dispatch = useDispatch();
  const currentdomain = useSelector(
    (state) => state.betfundata.currentdomain.data
  );
  const domainlevels = useSelector(
    (state) => state.betfundata.levels.listbydomainadmin
  );

  const loading = useSelector((state) => state.betfundata.levels.loading);
  const errormessage = useSelector(
    (state) => state.betfundata.levels.errors.message
  );

  useEffect(() => {
    if (currentdomain) dispatch(loadLevelbydomainadmin(`/${currentdomain.id}`));
  }, [currentdomain]);

  return (
    <>
      {loading ? (
        <div style={{ paddingLeft: "50%", paddingTop: "20%" }}>
          <Spincrescentcomponenet size="2x" color="#2e383f" />
        </div>
      ) : (
        <>
          {errormessage ? (
            <div className="loadingerrorMessage">
              <div
                className="betstabLine headerBets"
                style={{
                  fontSize: 20,
                  backgroundColor: "#ececeb",
                  border: "none",
                }}
              >
                {errormessage}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                padding: 10,
                marginTop: 100,
                color: "#fbfbfb",
                boxSizing: "border-box",
              }}
            >
              {domainlevels.map((lev) => (
                <LevelandLimits
                  src={lev.logo}
                  startingpoints={
                    currentdomain.name &&
                    lev[`${currentdomain.name.split(" ").join("")}startpoints`]
                      ? lev[
                          `${currentdomain.name.split(" ").join("")}startpoints`
                        ]
                      : "X"
                  }
                  endingpoints={
                    currentdomain.name &&
                    lev[`${currentdomain.name.split(" ").join("")}endpoints`]
                      ? lev[
                          `${currentdomain.name.split(" ").join("")}endpoints`
                        ]
                      : "X"
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
