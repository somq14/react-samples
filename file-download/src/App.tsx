import axios from "axios";
import React from "react";
import { DownloadUtil } from "./DownloadUtil";

function App() {
  const onClickTextDownload = () => {
    // ダウンロードしたいファイルの内容
    const fileContent = [
      '"フルーツ","価格"\r\n',
      '"りんご","100円"\r\n',
      '"みかん","200円"\r\n',
    ].join("");

    // ダウンロードしたい文字列をBlobに変換する
    // 文字化け対策のため、ファイル先頭にBOMを挿入し、ファイルがUTF-8であることを明示する
    const UTF8_BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([UTF8_BOM, fileContent], {
      type: "text/csv",
    });

    DownloadUtil.download(blob, "fruits.csv");
  };

  const onClickBinaryDownload = async () => {
    const res = await axios.get<Blob>(
      "https://namaraii.com/files/vim-cheatsheet.pdf",
      {
        // サーバーに対してPDFがほしいと伝える
        headers: {
          Accept: "application/pdf",
        },
        // レスポンスをJSONではなくBlobとして受け取る
        responseType: "blob",
      }
    );
    const blob = res.data;
    DownloadUtil.download(blob, "cheatsheet.pdf");
  };

  return (
    <div>
      <div>
        <button onClick={onClickTextDownload}>CSVダウンロード</button>
      </div>
      <div>
        <button onClick={onClickBinaryDownload}>PDFダウンロード</button>
      </div>
    </div>
  );
}

export default App;
