const fs = require('fs')
const path = require('path')

const arrExtWhiteList = ['.js', '.ts']
const arrIgnoreList = ['dealFiles.js', 'packages', 'node_modules']

/**
 * 判断文件是否以拓展名白名单包含的字符串结尾
 * @returns
 */
const endsWith = (source) => {
  let isWith = false
  arrExtWhiteList.forEach((item) => {
    if (source.indexOf(item, source.length - item.length) !== -1) {
      isWith = true
    }
  })
  return isWith
}

/**
 * 递归遍历，获取指定文件夹下面的所有文件路径
 */
const getAllFiles = (filePath) => {
  let allFilePaths = []
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath)
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      // 属于屏蔽名单的不作处理
      if (arrIgnoreList.includes(file)) {
        continue
      }
      const currentFilePath = `${filePath}/${file}`
      const stats = fs.lstatSync(currentFilePath)
      if (stats.isDirectory()) {
        allFilePaths = allFilePaths.concat(getAllFiles(currentFilePath))
      } else {
        // 不属于拓展名白名单的不做处理
        if (!endsWith(file)) {
          continue
        }
        allFilePaths.push(currentFilePath)
      }
    }
  } else {
    console.error(`指定的目录${filePath}不存在！`)
  }

  return allFilePaths
}

/**
 * 处理遍历后文件内容逻辑
 * @param {*} content
 */
const dealContent = (content) => {
  // console.log(content);
  let contentTmp = content
  contentTmp = contentTmp
    // .replace(/ .*?\/\//g, '//')
    .replace(/[^:]\/\/.*?(\n|\r)/g, '\r')
    .replace(/\/\*.*?(\*\/)/g, '')
  return contentTmp
}

/**
 * 主方法
 */
const main = () => {
  const root = process.argv[2] || './'
  const srcDir = path.resolve(root)
  console.log('main', srcDir, root)
  const allFiles = getAllFiles(srcDir)
  console.log(`文件数量:${allFiles.length}`)
  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i]
    console.log(filePath)
    const content = fs.readFileSync(filePath).toString()
    const contentTmp = dealContent(content)
    fs.writeFileSync(filePath, contentTmp)
  }
}

main()
