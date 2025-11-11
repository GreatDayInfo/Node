# VueUse

> 本内容由 DeepSeek 辅助生成

### 一、浏览器交互类

1. **`useClipboard` 剪贴板操作**
   实现复制文本到剪贴板，自动处理浏览器权限和响应式状态：

   ```javascript
   import { useClipboard } from '@vueuse/core';
   const { copy, copied, text } = useClipboard();
   // 复制操作
   copy('要复制的文本');
   // copied.value 表示是否复制成功
   ```

   支持动态读取剪贴板内容，需浏览器权限（`usePermission`检查）126。

2. **`useMouse` 鼠标追踪**
   实时获取鼠标坐标：

   ```javascript
   const { x, y } = useMouse();
   // x.value 和 y.value 是响应式坐标值
   ```

3. **`useFullscreen` 全屏控制**
   切换浏览器全屏模式：

   ```javascript
   const { isFullscreen, toggle } = useFullscreen();
   <button @click="toggle">切换全屏</button>
   ```

4. **`onClickOutside` 外部点击检测**
   检测点击元素外部事件，适用于关闭下拉菜单或弹窗：

   ```javascript
   import { onClickOutside } from '@vueuse/core';
   const target = ref(null);
   onClickOutside(target, () => console.log('点击外部区域'));
   <div ref="target">点击外部触发事件</div>
   ```

------

### 二、状态管理与存储

1. **`useStorage` 本地存储**
   自动同步数据到 `localStorage` 或 `sessionStorage`，支持响应式更新：

   ```javascript
   const state = useStorage('key', { name: 'Vue' }, localStorage);
   state.value.name = 'Vue3'; // 自动同步到存储
   ```

2. **`useVModel` 双向绑定增强**
   简化父子组件的双向数据绑定：

   ```javascript
   const model = useVModel(props, 'propName', emit);
   model.value = '新值'; // 自动触发更新
   ```

3. **`useRefHistory` 历史记录管理**
   记录变量的变化历史，支持撤销/重做：

   ```javascript
   const counter = ref(0);
   const { undo, redo } = useRefHistory(counter)
   ```

------

### 三、UI与交互工具

1. **`useDateFormat` 日期格式化**
   将日期格式化为响应式字符串：

   ```javascript
   const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss');
   <div>{{ formatted }}</div>
   ```

2. **`useDebounceFn` 防抖/节流**
   优化高频操作（如搜索输入）：

   ```javascript
   const debouncedFn = useDebounceFn(fn, 500); // 防抖
   const throttledFn = useDebounceFn(fn, 500, { maxWait: 1000 }); // 节流
   ```

3. **`useDraggable` 元素拖拽**
   使元素可拖拽，返回坐标和样式：

   ```javascript
   import { useDraggable } from '@vueuse/core';
   const el = ref(null);
   const { x, y, style } = useDraggable(el);
   <div ref="el" :style="style">拖拽我</div>
   <p>坐标：x={{ x }}, y={{ y }}</p>
   ```
   
4. **`useFocusTrap` 焦点锁定**
   将焦点限制在指定元素内（如模态框）：

   ```javascript
   const container = ref(null);
   useFocusTrap(container, { immediate: true });
   ```

------

### 四、设备与传感器

1. **`useDark` 暗黑模式**
   自动检测或切换系统主题：

   ```javascript
   const isDark = useDark({ selector: 'body' }); // 应用样式到body
   ```

2. **`useVibrate` 设备震动**
   触发设备振动（需浏览器支持）：

   ```javascript
   const { vibrate } = useVibrate({ pattern: [300, 100] });
   vibrate(); // 振动300ms，暂停100ms
   ```

3. **`useBluetooth` 蓝牙交互**
   访问蓝牙设备API：

   ```javascript
   const { requestDevice } = useBluetooth();
   requestDevice(); // 请求连接设备
   ```

------

### 五、其他实用工具

1. **`useFetch` 网络请求**
   封装异步请求，支持拦截器和自动取消：

   ```javascript
   const { data, error } = useFetch('https://api.example.com')
   ```

2. **`useHead` 页面头部管理**
   动态修改页面标题或注入脚本：

   ```javascript
   useHead({ title: '新标题', meta: [...] });
   ```

3. **`useBase64` 文件转码**
   将文件转换为Base64编码：

   ```javascript
   const file = ref();
   const base64 = useBase64(file);
   <input type="file" @change="file = $event.target.files[0]">
   ```

------

### 学习建议

1. **按需学习**：根据项目需求选择相关函数，优先掌握高频工具如 `useStorage` 和 `useClipboard`。
2. **查阅文档**：结合[VueUse官网](https://vueuse.org/)查看完整API和示例。
3. **组合使用**：如 `useDebounceFn` 结合 `useFetch` 实现防抖搜索23。

通过上述分类和示例，你可以快速定位所需功能并集成到项目中。更多方法可参考搜索结果中的完整示例