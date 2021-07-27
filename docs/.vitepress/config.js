const fs = require('fs-extra')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../'); // 项目根目录
const isFolder = (pathUrl) => { // 判断是否为文件夹
  const stat = fs.lstatSync(pathUrl);
  return stat.isDirectory()
}

const parseFolder = (folder, baseRoot) => {
  const root = `${baseRoot}/${folder}/`
  let res = fs.readdirSync(root)
  let files = []
  let hasReadme = false
  res.forEach(file => {
    if (isFolder(path.join(root, file))) {
      files.push(parseFolder(file, root))
    } else if (file.indexOf('README') === 0) {
      hasReadme = true
    } else {
      files.push(file)
    }
  })
  return {
    hasReadme,
    name: folder,
    files
  }
}

const generateChildrenRoutes = (config, folder = '') => {
  const {
    name,
    files,
    hasReadme
  } = config
  const children = files.map(item => {
    if (Array.isArray(item.files)) {
      return generateChildrenRoutes(item, `${folder}/${name}`)
    } else {
      const text = item.split('.md')[0]
      return {
        text,
        link: folder ? `${folder}/${name}/${text}` : `/${name}/${text}`
      }
    }
  })
  const result = {
    text: name,
    children
  }
  if (hasReadme) {
    result.link = `${folder}/${name}/README`
  }
  return result
}

const genFolderTree = (folder) => {
  let config = parseFolder(folder, ROOT_PATH);
  const sidebar = generateChildrenRoutes(config)
  return sidebar && sidebar.children
}

module.exports = {
  title: 'Hi, Blue Apple',
  description: 'My KnowledgeGraph.',
  base: "/KnowledgeGraph/",
  head: [
      [
        "meta",
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        },
      ],
  ],
  themeConfig: {
    search: true,
    // 顶部右侧导航栏
    nav: [
      {
        text: "🏠 首页", link: '/'
      },
      {
        text: "📅 基础知识", link: '/basic-knowledge/README', activeMatch: "^/basic-knowledge/"
      },
      {
        text: "🧐 项目思考", link: '/business-thinking/README', activeMatch: "^/business-thinking/"
      },
      {
        text: "👩‍💻 笔试实践", link: '/written-test-practice/README', activeMatch: "^/written-test-practice/"
      },
    ],
    // 侧边栏
    sidebar: {
      '/basic-knowledge/': genFolderTree('basic-knowledge'),
      '/business-thinking/': genFolderTree('business-thinking'),
      'written-test-practice': genFolderTree('written-test-practice')
    }
  }
}