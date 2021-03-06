import React, { useEffect, useState } from "react";
import { CsvUtil } from "./CsvUtil";

function App() {
  const [csv, setCsv] = useState<string>("");

  useEffect(() => {
    const csv: string = CsvUtil.stringify(
      [
        { keyName: "fruitName", headerName: "フルーツ" },
        { keyName: "price", headerName: "価格" },
      ],
      [
        { fruitName: "りんご", price: "100円" },
        { fruitName: "みかん", price: "200円" },
      ]
    );
    setCsv(csv);
  }, []);

  return (
    <div>
      <p>ここに生成されたCSVが表示されます</p>
      <pre>{csv}</pre>
    </div>
  );
}

export default App;
