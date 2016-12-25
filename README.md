构建工具负责提供各个框架的整体解决方案，整体基于webpack, 包括资源引入方式，更了的打包的

JQuery


# Guide
***
> 你选择的方案为： react + webpack + react-router + es6 + react-hot-loader
***
#### 开始你的项目

开始一个项目只需要执行下面这条命令

    npm start

好了，已经自动帮你打开浏览器了
***

#### 访问你的项目

默认url是[http://localhost:8080"](http://localhost:8080")  你懂得，react会在后面后面自己加上的hash的，或者是[http://localhost:8080#index"](http://localhost:8080#index") 

***

#### 编辑你的项目

首先#index对应的页面在app/page下面，找到index.js修改即可

修改后就会自动更新哦~ 浏览器自己也没有刷就更新了这个就是react-hot（热更新的功劳了），也就是说你做了一堆操作之后，用热更新更新某一个组件，其他组件的状态还在哦~

***
#### 新增一个页面！
 在根目录下的app.js文件中，增加路由就好啦~ 
***

#### 还支持的

- 已经把react,react-dom,react-route抽成了单独的库，每次编译的时候不会重新编译这些库，缩短了编译时间哦~
- 每个route对应的page会单独打成一个包，按请求页面加载所需资源(按需加载)




