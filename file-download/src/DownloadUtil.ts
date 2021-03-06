export class DownloadUtil {
  // 参考: https://github.com/Fintan-contents/example-chat/blob/master/frontend/src/framework/hooks/index.ts
  static download(blob: Blob, fileName: string) {
    // BlobデータへのURLを生成
    const url = URL.createObjectURL(blob);

    // そのURLを保持するリンクを生成
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);

    // ダウンロードの実行
    anchor.click();

    // リソースの開放
    URL.revokeObjectURL(url);
    document.body.removeChild(anchor);
  }
}
