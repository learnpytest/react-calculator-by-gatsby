<h1 align="center">
  React Calculator By Gatsby
</h1>

簡易計算機可以支援基本運算例如加、減、乘、除運算。

- Demo

| Version | Compatibility | 
| :-----| ----: |
| 1.x | React 18、Node 18、Gatsby 5 | 
 
**Getting Started**

 - [安裝](#安裝)

 - [使用說明](#使用方法)

## 安裝
    需 Node 18 以上版本

    ```shell
    # 查詢 Node 版本
    nvm list

    # 安裝 Node 18 以上版本，專案使用 19.1.0
    nvm install 19.1.0

    # 安裝以後使用
    nvm use 19.1.0
    ```

    安裝專案

    ```shell
    # 下載專案進入資料夾

    # 安裝相關套件
    npm install
    ```

    開啟專案

    ```shell
    npm run develop
    ```
    Your site is now running at http://localhost:8000!

## 使用說明

    - 計算機包含 0 到 9 數字按鈕與 +、-、*、/ 運算子，按下按鈕可以在畫面上方即時顯示「算式」
    - 按下 C 鍵清除所有運算
    - 數字輸入與計算上限為 2^32，超過會顯示超過數字上限不能再輸入更多，按下 C 鍵清除所有運算重新輸入
    - 按下「 = 」功能鍵後可以顯示「結果」，可以繼續輸入進行運算，或按下 C 鍵清除所有運算重新輸入