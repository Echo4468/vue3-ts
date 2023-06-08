import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//如果你对打包后的文件大小不是很在乎，那么使用完整导入element-plus会更方便,app.use(ElementPlus)
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'

//我们现在是按需引入element-plus，则先需要安装两个插件 npm install -D unplugin-vue-components unplugin-auto-import
//然后去vue.config.js配置构建工具vite或者是webpack,ps改变配置文件后要重新启动
createApp(App).use(router).mount('#app')
