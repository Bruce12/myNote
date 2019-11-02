/**
 * markdown 生成工具
 * 作者：Bruce
 * 时间：2019-09-14
 */
// 接收用户传来饿 md 文件名字
const fileName = process.argv[2]
// 拿到完整路径
const fullPath = `${process.cwd()}/${fileName}`
// 读取文件内容
const fs = require('fs')
const content = fs.readFileSync(fullPath, 'utf8')
const highlight = require('highlight.js')
const marked = require('marked')
// 配置marked
marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  highlight: function(code) {
    return highlight.highlightAuto(code).value
  },
  gfm: true,
  smartLists: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false
})
const html = marked(content)
//导入css
const css = fs.readFileSync(`${__dirname}/css/github-markdown-css.css`, 'utf8')
const highlightCss = fs.readFileSync(`${__dirname}/node_modules/highlight.js/styles/vs.css`, 'utf8')
// 写入文件
fs.writeFileSync(`${process.cwd()}/${fileName}.html`, `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }

    @media (max-width: 767px) {
      .markdown-body {
        padding: 15px;
      }
    }
    ${css}
    ${highlightCss}
  </style>
</head>
<body>
  <div class="markdown-body">
    ${html}
  </div>
</body>
</html>`, 'utf8')