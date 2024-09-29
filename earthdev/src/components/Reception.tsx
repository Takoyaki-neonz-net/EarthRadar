import classes from "@/components/classes.module.css";
import { useState, useEffect, createContext, useContext } from "react";

export function Reception() {
  const [ExportP2P, setExportP2P] = useState(0);
  const [ExportTime, setExportTime] = useState(0);
  const [ExportJma, setExportJma] = useState(0);
  //"setExportP2P"→"ExportP2P"
  //"setExportTime"→"ExportTime"
  //"setExportJma"→"ExportJma"

  useEffect(
    () => {
      const startup = () => {
        // startup ロジック
      };
      startup();
    },
    [
      /* 依存関係 */
    ]
  );

  async function reception() {
    alert("受信しました。!");
    getData();
    getTime();
  }

  function getTime() {
    const now = new Date();
    const jpTime = now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
    console.log("日本時間:", jpTime);
    setExportTime(jpTime);
  }
  async function getData() {
    //apiに受信しに行く
    const APIP2P = new WebSocket("wss://api.p2pquake.net/v2/ws");

    APIP2P.onopen = function (event) {
      console.log("🟢OK");
      setExportP2P("🟢OK"); // 接続成功時に状態を更新
    };

    APIP2P.onclose = function (event) {
      console.log("🔴" + event.code);
      setExportP2P("🔴" + event.code); // 終了時に状態を更新
    };

    const APIJMA = await fetch(
      "https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json"
    );
    if (APIJMA.ok) {
      console.log("🟢OK");
      setExportJma("🟢OK");
    } else {
      console.log("🔴" + APIJMA.status);
      setExportJma("🔴" + APIJMA.status);
    }
  }

  return (
    <div>
      <main>
        <code>
          <br />
          JMA-API {exportJma}
          <br />
          P2P-API {exportP2P}
          <br />
          取得時間　{exportTime}
          <br />
        </code>
        P2P-APIが1001になるのは仕様です　気にしないでください！
        <br />
        <button className={classes.button} onClick={reception}>
          受信
        </button>
      </main>
    </div>
  );
}
