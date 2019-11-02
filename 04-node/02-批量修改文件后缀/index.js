const fs = require('fs')
const path = require('path')

// 获取参数
const old = process.argv[2]
const now = process.argv[3]

// 获取命令行所在的工作目录
const dir = process.cwd()
const filenames = fs.readdirSync(dir)
console.log(dir)

const list = filenames.filter(item => {
  const isFile = fs.statSync(path.join(dir, item)).isFile()
  const matchExt = path.extname(item) === '.' + old
  return isFile && matchExt
})

list.forEach(item => {
  const source = path.join(dir, item)
  const target = path.join(dir, item.replace(old,now))
  fs.renameSync(source, target)
  console.log(`${item}success`)
})