import React, { Component } from 'react';


var index = React.createClass({

    getInitialState () {
        return {}
    },
    componentDidMount () {

    },
    render() {
        return (
            <div class="index-page-logs">
                <header>Welcome to the new Fontend Build Tools</header>
                <p style="color: #ca9f9f">该构建工具基于fis3，其支持以下功能</p>
                <ul class="logs">       
                    <li>性能优化、</li>           
                    <li>资源加载（异步、同步、按需、预加载、依赖管理、合并、内嵌）</li>
                    <li>模块化开发</li>           
                    <li>自动化工具</li>           
                    <li>开s发规范</li>           
                    <li>代码部署</li>    
                </ul>
                <p>目前你选择的项目适合构建小型多页项目，请在和index.html同目录级别下创建其他页面，</p>
                <p>组件请放在widget下(会自动帮你进行模块化),如果你有通用的js文件请放在common/js下，</p>
                <p>如果是通用的库文件，请放在common/lib下(这两个目录下没有进行自动模块化，所以你有立即执行的文件也行放在这两个文件下),</p>
                <p>图片，字体等资源请放在resource下</p>
                <footer>good luck~</footer>
            </div>
        )

    }
})

module.export = index;