import { CsvUtil } from "../CsvUtil";

test("エスケープのテスト", () => {
  expect(CsvUtil.escape("")).toBe('""');
  expect(CsvUtil.escape("abc")).toBe('"abc"');
  expect(CsvUtil.escape('"a"b"c"')).toBe('"""a""b""c"""');
});

test("CsvUtil.stringifyの使い方", () => {
  // 以下のようなデータをCSV化する例を示します
  interface DietDiary {
    date: Date;
    weight: number;
    memo?: string;
  }

  const diary: DietDiary[] = [
    {
      date: new Date(2021, 3, 1),
      weight: 50,
      memo: "ダイエットはじめました",
    },
    {
      date: new Date(2021, 3, 2),
      weight: 50.99,
      memo: '"2,000円のラーメン"をたべた\nおいしかった',
    },
    {
      date: new Date(2021, 3, 3),
      weight: 52.005,
      memo: "",
    },
    {
      date: new Date(2021, 3, 4),
      weight: 52.004,
      memo: undefined,
    },
  ];

  // number型やData型のデータが含まれるので、一旦string型に変換します
  // memoはstring?型なので、これもstring型に変換します
  const formattedDiary = diary.map(({ date, weight, memo }) => {
    return {
      date: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`,
      weight: weight.toFixed(2),
      memo: memo || "",
    };
  });

  // CsvUtilにヘッダーの名前と、データの列を渡します
  const expected = CsvUtil.stringify(
    [
      {
        keyName: "date",
        headerName: "記録日",
      },
      {
        keyName: "weight",
        headerName: "体重",
      },
      {
        keyName: "memo",
        headerName: "備考",
      },
    ],
    formattedDiary
  );

  // こんな感じにCSVの文字列が生成されます
  const actual =
    '"記録日","体重","備考"\r\n' +
    '"2021/3/1","50.00","ダイエットはじめました"\r\n' +
    '"2021/3/2","50.99","""2,000円のラーメン""をたべた\nおいしかった"\r\n' +
    '"2021/3/3","52.01",""\r\n' +
    '"2021/3/4","52.00",""\r\n';

  expect(expected).toBe(actual);
});
