# SideCode
SideCode α ver.

## What's this?
ソースコードと解説を横並びに掲載した上で他のページに埋め込めるようにするためのサービス。
卒業研究の作品です。

Show description besides source code, and it may possible to be enmbedded reference from other pages.
My graduation research project.

## Where to use
https://gyoubumasataka.github.io/sidecode_hub/
Released in github pages.

## How to use

### ページを作るまで
記述用ページでソースコードと解説を書きます。
左のテキストエリアがソースコード用、右が解説用です。
(ソースコード自体は既存のテキストエディタで書くことを推奨します)

ソースコードで解説を入れたい部分を
[desc (解説タイトル)] ソースコード [/desc (解説タイトル)]
みたいに挟みます。
解説も同様に
[desc (解説タイトル)] 解説 [/desc (解説タイトル)]
のように記述します。
範囲選択して上部の「Tag-Insert」ボタンを押せば勝手に入れてくれます。右のテキストエリアでタイトルを指定できます(空白なら勝手に補完します)。
解説の内容とタイトルは結びつくので，同じ解説を入れたいのでなければタイトルは被せないように。

「Preview-Tab」ボタンか「PreviewInWindow」でプレビューが見られます。

「ExportInFile」ボタンで，閲覧(埋め込み参照)用に変換したファイルを保存できます。
(本当はサーバー建てて保存するべきだと思いますが、手間と時間の関係でそこまでできてないです)

保存したファイルを何らかの形でオンライン上に保存したら，埋め込み参照自体はできるはずです。

### 実際の参照
個人ブログとかに埋め込むのはできると思うんですが、Qiitaとかはセキュリティ上不可能です。
そのためのChrome用拡張機能が「sidecode_Extensions」です。
sidecode_Entensions.zipをDLして、Chromeに適用してください
(パッケージ化されていない拡張機能を読み込む)。
(これも本音はwebストアに限定でいいので配布したかったんですが、大学のgmailアカウントはお金を払う権限がないのでデベロッパ登録ができません)
素の状態だとQiita、note、弊githubPagesで動きます。(この辺は変更するかも)

Qiitaなどに埋め込みたい際はリンクを張り付ける際に
https://gyoubumasataka.github.io/sidecode_hub/redirect.html?(埋め込みたいページのURL)
という方式にしてください。(カッコは実際には要らない)
拡張機能が有効ならリンクの真下に埋め込んでくれます。
そうじゃなくてもリンクを踏めば勝手にリダイレクトで飛ばしてくれます。

## これから
使い方を説明するページか動画あたりでも作った方がいいかも。
あとはバグ修正とか……

## 既存のバグ
・ソースコード内に<div> ~~ </div>みたいにhtmlのタグエリア指定があると出力時にバグる
 - 変換方式上とても辛い。超がんばればたぶん直せます。
