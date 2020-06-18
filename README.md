# ts框架

### 使用方法
```
npm install
npm run watch
```

### 命令说明
npm run watch 开发使用 自动监听文件变化进行生成
npm run devStart 生成开发版文件
npm run gaStart 生成生产版文件
### 文件介绍
```
├── Scripts  js文件
│    ├── dev   ts的开发文件
│    ├── dist  生产文件也就是发布的文件·
│    ├── gulp  插件文件
│    └── utils 工具文件
├── Styles  样式文件
│    ├── dev   css的开发文件
│    ├── dist  生产文件也就是发布的文件
│    ├── gulp  插件文件
│    └── utils 工具文件
└── node    配置文件
     ├── gulp  gulp的配置
     │    ├── build 需要生成的文件配置 在jspages里面配置需要生成的ts文件
     │    └── config gulp里面各个路径的配置文件
     └─── karma 单元测试的配置文件
```