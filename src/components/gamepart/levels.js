import React from "react";
import LevelandLimits from "../../commun/logos/levelandLimits";

export default function Levels() {
  const levels = [
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
    { logo: "../../../../NaturalBettor.jpg" },
    { logo: "../../../../BeastBettor.jpg" },
    { logo: "../../../../DragonBettor.jpg" },
    { logo: "../../../../ShowtimeBettor.jpg" },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        padding: 10,
        marginTop: 100,
        color: "#eeeeee",
        boxSizing: "border-box",
      }}
    >
      {levels.map((lev) => (
        <LevelandLimits
          src={lev.logo}
          startingpoints={1500}
          endingpoints={2600}
        />
      ))}
    </div>
  );
}
