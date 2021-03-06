export interface CsvRecord {
  [key: string]: string;
}

export interface CsvColumn<T extends CsvRecord> {
  keyName: keyof T;
  headerName: string;
}

export class CsvUtil {
  /**
   * 単体のデータをCSVのルールに従いエスケープする
   *
   *  以下のエスケープを実施する
   *
   * - データ内のダブルクオートを２つのダブルクオートにエスケープ
   * - データ全体をダブルクオートで囲む
   *
   * @param value エスケープ対象のデータ
   * @returns エスケープ後のデータ
   */
  static escape = (value: string): string => {
    return `"${value.replace(/"/g, '""')}"`;
  };

  static stringify<T extends CsvRecord>(
    columns: CsvColumn<T>[],
    records: T[]
  ): string {
    const headerLine = columns
      .map((col) => CsvUtil.escape(col.headerName))
      .join(",");

    const valueLines = records.map((record) =>
      columns.map((col) => CsvUtil.escape(record[col.keyName])).join(",")
    );

    return [headerLine, ...valueLines].map((line) => line + "\r\n").join("");
  }
}
