import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

/**
 * キーワードをもとに検索を行う画面
 *
 * http://localhost:3000/?keyword=hoge
 * のように検索条件をクエリ文字列で表す
 */
export const TopPage: React.FC = () => {
  // URLのクエリ文字列を読み込み、keywordを取り出す
  const { search } = useLocation();
  const parameters = queryString.parse(search);
  const keywordParam =
    typeof parameters.keyword === "string" ? parameters.keyword : "";

  // フォームへの入力内容を保持するReactステート
  // 初期値はクエリ文字列から取り出したkeywordにする
  const [keywordForm, setKeywordForm] = useState<string>(keywordParam);

  // 検索条件になっているキーワードを保持するReactステート
  // 初期値はクエリ文字列から取り出したkeywordにする
  const [searchCondition, setSearchCondition] = useState<{ keyword: string }>({
    keyword: keywordParam,
  });

  // 検索結果を保持するステート
  // 値のないときは、検索中とみなす
  const [searchResult, setSearchResult] = useState<string | undefined>(
    undefined
  );

  // 検索処理
  // 検索条件 searchCondition が変化するたびに発火する
  const history = useHistory();
  useEffect(() => {
    console.info(`検索イベント発火 keyword=${searchCondition.keyword}`);

    // 本来はここで検索APIを呼び出す
    sleep(3000).then(() => {
      setSearchResult(`条件${searchCondition.keyword || "なし"}で検索しました`);

      // 表示中のURLのクエリ文字列を書き換える
      history.replace(
        `?${queryString.stringify({
          keyword: searchCondition.keyword,
        })}`
      );
    });
  }, [searchCondition, history]);

  // 検索ボタンを押したときの処理
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // formタグのデフォルトの挙動である画面遷移を防ぐ
    e.preventDefault();

    // searchConditionを更新する
    // これにより検索処理が動き出す
    setSearchCondition({ keyword: keywordForm });
  };

  return (
    <div>
      <h1>トップページ</h1>

      <div>
        <h2>検索条件</h2>
        <form onSubmit={onSubmit}>
          <p>キーワードを入力してください</p>
          <input
            type="text"
            name="keyword"
            value={keywordForm}
            onChange={(e) => setKeywordForm(e.target.value)}
          ></input>
          <input type="submit" value="検索"></input>
        </form>
      </div>

      <div>
        <h2>検索結果</h2>
        <p>{searchResult || "検索結果がありません"}</p>
      </div>

      <div>
        <hr></hr>
        <Link to="/other">別のページへ行く</Link>
      </div>
    </div>
  );
};
