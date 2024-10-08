import React from "react";
import { PlayerData } from "../playerData";
import "./scoreboard.css";

export function ScoreBoard(props: { playersData: PlayerData[] }) {
  const rowAmount = Math.max(...props.playersData.map((p) => p.turns.length));

  return (
    <div className="card" style={{ maxHeight: "70vh" }}>
      <table className="scoreTable">
        <thead>
          <tr>
            <th rowSpan={2}>Round</th>
            {props.playersData.map((p) => (
              <th colSpan={2} key={p.id}>
                {p.name}
              </th>
            ))}
          </tr>
          <tr>
            {props.playersData.map((p) => (
              <React.Fragment key={p.id}>
                <th>Throw</th>
                <th>Score</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rowAmount)].map((_, i) => (
            <tr key={i}>
              <td>{i}</td>
              {props.playersData.map((p) => (
                <React.Fragment key={p.id}>
                  <td
                    className={
                      i < p.turns.length && !p.turns[i].isValid
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {i < p.turns.length ? p.turns[i].throw : "-"}
                  </td>
                  <td>{i < p.turns.length ? p.turns[i].score : "-"}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
