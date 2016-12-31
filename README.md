构建工具负责提供整体解决方案，基于webpack, 分别包含jquery，react和vue三种方案；
每个方案中包含依赖资源下载，资源引入方式，目录规范，编码规范，并且针对每个项目都提供了脚手架，方便快速开发

####启动项目
   
    npm run dev 

开发时启动都是只需要执行这个命令，在结束进程时，要两次 `Ctrl + C`  
开发完成之后需要验证编译后的结果，执行如下命令
    
    
    npm run pro 
    


####访问项目

默认路由都是localhost:8080/#index 

##JQuery

 - 包含前端路由
 - 自选前端模板（目前只推荐handlebars，支持不包含模板方案）
 - 脚手架，用于创建页面(包含路由)，组件(widget)
 - es6（默认支持，建议使用）

 ###目录规范
 - common/js  : 存放共有js文件，如PGTool.js
 - common/lib : 存放共有库文件，如jquery.js
 - page : 存放页面内容，html,css，js在一个文件夹下,样式文件使用less添加css的命名空间，避免样式污染，
 - resource/css : 存放公共css（非页面使用级别）
 - resource/font : 公共字体资源
 - resource/font : 公共图片资源
 - widget : 其他组件，可以被Page调用，如menu组件



##React

  - 自选数据流库，（包含reflux和redux，支持不选择）
  - 热更新
  - react-router 
  - es6 
  - 组件脚手架
  
 ###目录规范
  - common/js  : 存放共有js文件，如PGTool.js
  - common/lib : 存放共有库文件，如jquery.js
  - page : 存放页面内容，html,css，js在一个文件夹下,样式文件使用less添加css的命名空间，避免样式污染，
  - resource/css : 存放公共css（非页面使用级别）
  - resource/font : 公共字体资源
  - resource/font : 公共图片资源
  - components : 组件，可以被Page调用，如menu组件
  - actions : 存放公共数据流action
  - stores  : 存放公共store（属于组件的store放在component组件自己目录中）
  

### 还支持的

- 已经把react,react-dom,react-route抽成了单独的库，每次编译的时候不会重新编译这些库，缩短了编译时间
- 每个route对应的page会单独打成一个包，按请求页面加载所需资源(按需加载)


##Vue

  - vue-router 
  - vue template  
  - es6
  - 组件脚手架
  
  目录规范类似react；
  
  





