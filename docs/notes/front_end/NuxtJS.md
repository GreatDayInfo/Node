# Nuxt



## V4.1.3

- 说明：

  - 默认情况下使用服务器端渲染 `server-side rendering by default`
  - NodeJS 确保使用偶数编号的版本`Node.js: Make sure to use an even numbered version`
- 常见问题

  - [创建项目时报错：ERROR Error: Failed to download template from registry.....](https://jsnoteclub.com/blog/nuxt-fetch-failed/)







### 约定

- [`app/components/`](https://nuxt.com/docs/4.x/guide/directory-structure/app/components)目录中创建的组件，可直接使用`<文件名 />`，无需额外`import`
- [`app/pages/`](https://nuxt.com/docs/4.x/guide/directory-structure/app/pages)目录中的每个文件都代表一个路由
- 将`<NuxtPage />`组件添加到[`app/app.vue`](https://nuxt.com/docs/4.x/guide/directory-structure/app)作为`app/pages`路由入口，需删除入口其他template内容
- `app/layouts/`公共布局（如页眉和页脚），其中使用`<slot />`组件显示内容。默认使用`app/layouts/default.vue`文件
  - 自定义布局可以设置为页面元数据的一部分

#### 资源/样式

- `app/assets/`
  - 【自然位置 natural place】CSS样式 local stylesheets；样式表将内联呈现在Nuxt的HTML中，style设置scoped仍有效
- `public`
  - `public/fonts` 字体
    - https://nuxt.com/docs/4.x/getting-started/styling#working-with-fonts

```vue
<img src="~/assets/img/nuxt.png" /> <!-- app/assets/ 资源 -->
<img src="/img/nuxt.png" alt="Discover Nuxt" /> <!-- public资源 -->


<script>
 // 使用静态导入以实现服务器端兼容性
import '~/assets/css/first.css'
// 动态导入与服务器端不兼容
import('~/assets/css/first.css')
</script>
<style>
@import url("~/assets/css/second.css");
 
// 使用 scss 样式
@use "~/assets/scss/main.scss";
</style>
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'], // 公共样式配置，将应用到所有页面中
  app: {
    head: {
      // 外部样式表 external stylesheets
      link: [{ 
        rel: 'stylesheet',
        href:'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' 
      }],
    },
  },
})


// xxx.vue 动态添加样式表 Dynamically Adding Stylesheets
// 在特定页面使用 useHead 在head中动态设置
useHead({
  link: [{ 
    rel: 'stylesheet', 
    href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }],
})

```



#### plugins插件

- Nuxt会自动读取`app/plugins/`目录中的文件，并在创建Vue应用程序时加载它们
- 可使用`.server`or或`.client`，区分在服务器或客户端加载的插件
- 只有目录顶层的文件（或任何子目录中的索引文件）才会自动注册为插件

```bash
# 只有 foo.ts 和 bar/index.ts 会被注册。
-| plugins/
---| foo.ts      // scanned
---| bar/
-----| baz.ts    // not scanned
-----| foz.vue   // not scanned
-----| index.ts  // currently scanned but deprecated


# 方案二 nuxt.config.ts
export default defineNuxtConfig({
  plugins: [
    '~/plugins/bar/baz',
    '~/plugins/bar/foz',
  ],
})

```











#### 路由

- `<NuxtLink>`进行页面跳转，可以防止整页刷新，并允许动画过渡
  - 当`<NuxtLink>`进入客户端的viewport时，会自动提前预取链接页面的组件和有效负载（生成的页面），从而加快导航速度

```vue
<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">About</NuxtLink></li>
        <li><NuxtLink to="/posts/1">Post 1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">Post 2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

```











## 其他备注

### 网络请求

- 通用渲染：类php/Ruby的传统服务器呈现，
- 类型
  - `$fetch`
    - 适用于用户操作的数据请求

  - `useFetch`：`$fetch`的包装器，在通用渲染中获取一次数据
    - 适用于基于页面状态需要重复获取数据
    - 返回值是响应式，多数不需要返回值再触发其他响应的请求，显得多余

  - `useAsyncData`：似于`useFetch`，但提供了更细粒度的控制

- 注意
  - 在Vue组件的setup函数中使用[`$fetch`函数](https://nuxt.com/docs/4.x/api/utils/dollarfetch)执行数据获取，这可能会导致数据被获取两次，一次在服务器上（渲染HTML），另一次在客户端上（当HTML被水合时），增加交互时间并导致不可预测的行为；而useFetch和useAsyncData通过确保在服务器上调用API，并将数据转发到客户端来解决此问题
  - 可通过[`useNuxtApp().payload`](https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload)访问的JavaScript对象。它在客户端上使用，以避免[在合并期间](https://nuxt.com/docs/4.x/guide/concepts/rendering#universal-rendering)在浏览器中执行代码时重新获取相同的数据。

- 最佳实践
  - 最佳实践应该是参考官方的[custom-useFetch](https://link.juejin.cn?target=https%3A%2F%2Fnuxt.com%2Fdocs%2Fguide%2Frecipes%2Fcustom-usefetch)，先利用`plugin`把`$fetch`封装一下（类似axios的封装），再把此实例覆盖掉 useFetch 里的封装的 `$fetch`，这样需要服务端渲染时，使用`useFetch`，其他前端交互产生的请求使用 `useNuxtApp().$api`即可
    - 我现在发现用 nuxt 做全栈（中小型内容站），useFetch不用封装，可以简单封一下$fetch，用来增加 headers 和 toast










![image-20240310231810882](images/NuxtJS/image-20240310231810882.png)

![image-20240310231831289](images/NuxtJS/image-20240310231831289.png)