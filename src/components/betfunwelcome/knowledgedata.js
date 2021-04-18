import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProgressBarWithLabel from "../../commun/progressBarwithlabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import { loadKnowledgestats } from "../../features/knowledgestats/knowledgestatsSlice";

export default function Knowledgedata() {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.betfundata.currentuser.data);
  const currentprofile = useSelector(
    (state) => state.betfundata.currentprofile.data
  );
  const knowledgestats = useSelector(
    (state) => state.betfundata.knowledgestats.list
  );
  const loadingknowledgestats = useSelector(
    (state) => state.betfundata.knowledgestats.loading
  );
  const errormessage = useSelector(
    (state) => state.betfundata.knowledgestats.errors.message
  );

  useEffect(() => {
    dispatch(
      loadKnowledgestats(
        `/${currentprofile.id ? currentprofile.id : currentuser.id}`
      )
    );
  }, [currentprofile]);

  return (
    <div className="knowledgepersondatacontainer">
      <div
        style={{
          height: 50,
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 13,
          width: "99%",
          display: "flex",
          justifyContent: "space-between",
          
        }}
      >
        <div>Knowledge</div>
        <div>
          {loadingknowledgestats ? "..." : knowledgestats.totalpoints} pts
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            
          }}
        >
          <div>{Math.trunc(knowledgestats.totalpoints / 100)}</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              
              alignItems: "center",
              marginLeft: 5,
            }}
          >
            <div
              style={{
                width: 20,
                height: 15,
                boxSizing: "border-box",
                backgroundColor: "grey",

                borderBottom: "1px solid grey",
                borderTopLeftRadius: 45,
                borderTopRightRadius: 45,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                color="#fbfbfb"
                icon={faStarAndCrescent}
                size="xs"
              />
            </div>
            <div
              style={{
                display: "flex",
                width: 20,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 6,

                  backgroundColor: "grey",
                }}
              ></div>
              <div style={{ width: 3 }}></div>
              <div
                style={{
                  width: 4,
                  height: 8,

                  backgroundColor: "grey",
                  borderBottomRightRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
              ></div>
              <div style={{ width: 3 }}></div>
              <div
                style={{
                  width: 5,
                  height: 6,

                  backgroundColor: "grey",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {loadingknowledgestats ? (
        <div
          style={{
            width: "100%",
            flexGrow: 1,
            width: 300,
            display: "flex",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          loading ...
        </div>
      ) : (
        <>
          {errormessage ? (
            <div
              style={{
                width: "100%",
                flexGrow: 1,
                width: 300,
                display: "flex",
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {errormessage}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                flexGrow: 1,

                display: "flex",
                justifyContent: "center",
                alignItems: "space-between",
                flexWrap: "wrap",
              }}
            >
              {knowledgestats.categories.map((c) => (
                <div
                  key={c.category}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    width: 70,
                    marginRight: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      marginBottom: 8,
                      fontSize: 13,
                    }}
                  >
                    {c.category}
                  </div>
                  <ProgressBarWithLabel progress={Number(c.percentage)} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
