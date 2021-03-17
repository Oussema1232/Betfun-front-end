import React from "react";
import ProgressBarWithLabel from "../../commun/progressBarwithlabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarAndCrescent } from "@fortawesome/free-solid-svg-icons";
import backwall from "../../img/knowledgeback.jpg";

export default function Knowledgedata() {
  return (
    <div className="knowledgepersondatacontainer">
      <div
        style={{
          height: 50,
          fontWeight: "bold",
          fontSize: 13,
          width: "99%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>Knowledge</div>
        <div>12360 pts</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>123</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          maxWidth: 300,
          display: "flex",

          justifyContent: "center",
          alignItems: "space-between",
          flexWrap: "wrap",
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
          <div
            key={c}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              margin: 6,
              marginBottom: 10,
            }}
          >
            <div style={{ marginBottom: 5, fontSize: 13 }}>Category</div>
            <ProgressBarWithLabel progress={0} />
          </div>
        ))}
      </div>
    </div>
  );
}
