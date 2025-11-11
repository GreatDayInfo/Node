# [React+](https://zh-hans.react.dev/)

- [React 基础部分笔记](https://www.yuque.com/fechaichai/qeamqf/xbai87#e3638cf5)
- https://message163.github.io/react-docs/

> - 以`use`开头的函数被称为Hook，且只能在【组件/其他Hook】的**顶层**调用hook
>
>   - 如果想在一个条件或循环中使用 `useState`，请提取一个新的组件并在组件内部使用它
>
> - 组件件数据共享：
>
>   ```jsx
>  // 通过标签传值:数据、函数
>   <MyButton count={count} onClick={handleClick} />
>  // 通过{函数参数}接收
>   function MyButton({ count, onClick }) {
>     return (
>       <button onClick={onClick}>
>        Clicked {count} times
>       </button>
>    );
>   }
>   ```
> 
> - 官网推荐框架：Next.js、Remix、Gatsby、[Expo](https://docs.expo.dev/tutorial/introduction/)（用于原生应用）
> 
>   - [Next.js 的 App Router](https://nextjs.org/docs) 是对 Next.js API 的重新设计，旨在实现 React 团队的全栈架构愿景。它让你在异步组件中获取数据，这些组件甚至能在服务端构建过程中运行
> 
> - 不要忘了还有浏览器插件 React  Developer Tools 可以使用





## 入口文件

```js
// react 18 及以后
import ReactDOM from 'react-dom';
import App from 'App';

// 创建root
const root = ReactDOM.createRoot(document.getElementById('root'));
//通过root渲染App
root.render(<App />);
            
            
// react 17及之前
import ReactDOM from 'react-dom';
import App from 'App';

ReactDOM.render(<App />, document.getElementById('root'););
```









## 概念/工具

### Bable

> JavaScript 编译器,提供了JavaScript的编译过程，能够将源代码转换为目标代码 ，过程：AST -> Transform -> Generate
>
> - 官网 https://babeljs.io/
> - 查看AST https://astexplorer.net/
> - Babel所有的包 https://babeljs.io/docs/babel-traverse

- 核心功能
  - 语法转换：将新版本的 JavaScript 语法转换为旧版本的语法
  - Polyfill：通过引入额外的代码，使新功能在旧浏览器中可用
  - JSX: 将JSX语法转换成普通的JavaScript语法
  - 插件: 为Babel提供自定义功能





### SWC

> SWC 既可用于编译，也可用于打包。对于编译，它使用现代 JavaScript 功能获取 JavaScript / TypeScript 文件并输出所有主流浏览器支持的有效代码。**`SWC在单线程上比 Babel 快 20 倍，在四核上快 70 倍。`**
>
> - v8编译原理 https://juejin.cn/post/7291135064843304994#heading-0
> - swc官网 https://swc.rs/



- 为什么快？
  - 编译型 Rust 是一种编译型语言，在编译时将代码转化为机器码（底层的 CPU 指令）。这种机器码在执行时非常高效，几乎不需要额外的开销。
  - 解释型 JavaScript 是一种解释型语言，通常在浏览器或 Node.js 环境中通过解释器运行。尽管现代的 JavaScript 引擎（如 V8 引擎）使用了 JIT（即时编译）技术来提高性能，但解释型语言本质上还是需要更多的运行时开销。
- [核心功能](https://message163.github.io/react-docs/tools/swc.html#核心功能)
  - JavaScript/TypeScript 转换 可以将现代 JavaScript（ES6+）和 TypeScript 代码转换为兼容旧版 JavaScript 环境的代码。这包括语法转换（如箭头函数、解构赋值等）以及一些 polyfill 的处理
  - 模块打包 SWC 提供了基础的打包功能，可以将多个模块捆绑成一个单独的文件
  - SWC 支持代码压缩和优化功能，类似于 Terser。它可以对 JavaScript 代码进行压缩，去除不必要的空白、注释，并对代码进行优化以减小文件大小，提高加载速度
  - SWC 原生支持 TypeScript，可以将 TypeScript 编译为 JavaScript
  - SWC 支持 React 和 JSX 语法，可以将 JSX 转换为标准的 JavaScript 代码。它还支持一些现代的 React 特性





### Virtual DOM

> 用JavaScript对象去描述一个DOM结构，虚拟DOM不是直接操作浏览器的真实DOM，而是首先对 UI 的更新在虚拟 DOM 中进行，再将变更高效地同步到真实 DOM 中

- 优点
  - 性能优化：直接操作真实 DOM 是比较昂贵的，尤其是当涉及到大量节点更新时。虚拟 DOM 通过减少不必要的 DOM 操作，主要体现在diff算法的复用操作，其实也提升不了多少性能。
  - 跨平台性：虚拟 DOM 是一个与平台无关的概念，它可以映射到不同的渲染目标，比如浏览器的 DOM 或者移动端`(React Native)`的原生 UI



### React Fiber

> Fiber 是 React 16 引入的一种新的协调引擎，用于解决和优化 React 应对复杂 UI 渲染时的性能问题
>
> - React源码解析英文版 https://pomb.us/build-your-own-react/
> - 未使用fiber版本 https://claudiopro.github.io/react-fiber-vs-stack-demo/stack.html
> - 已使用fiber版本 https://claudiopro.github.io/react-fiber-vs-stack-demo/fiber.html



- 实现的4个目标
  - 可中断的渲染：Fiber 允许将大的渲染任务拆分成多个小的工作单元（Unit of Work），使得 React 可以在空闲时间执行这些小任务。当浏览器需要处理更高优先级的任务时（如用户输入、动画），可以暂停渲染，先处理这些任务，然后再恢复未完成的渲染工作。
  - 优先级调度：在 Fiber 架构下，React 可以根据不同任务的优先级决定何时更新哪些部分。React 会优先更新用户可感知的部分（如动画、用户输入），而低优先级的任务（如数据加载后的界面更新）可以延后执行。
  - 双缓存树（Fiber Tree）：Fiber 架构中有两棵 Fiber 树——current fiber tree（当前正在渲染的 Fiber 树）和 work in progress fiber tree（正在处理的 Fiber 树）。React 使用这两棵树来保存更新前后的状态，从而更高效地进行比较和更新。
    - 提前计算缓存下一个状态，由依次计算变更，升级为直接切换，较少切换时间
  - 任务切片：在浏览器的空闲时间内（利用 requestIdleCallback思想），React 可以将渲染任务拆分成多个小片段，逐步完成 Fiber 树的构建，避免一次性完成所有渲染任务导致的阻塞。



### 任务切片

- [浏览器一帧做些什么](https://message163.github.io/react-docs/principle/vdom.html#浏览器一帧做些什么)
  1. 处理事件的回调click...事件
  2. 处理计时器的回调
  3. 开始帧
  4. 执行requestAnimationFrame 动画的回调
  5. 计算机页面布局计算 合并到主线程
  6. 绘制
  7. 如果此时还有空闲时间，执行requestIdleCallback





### requestidlecallback

> 提供一种机制，允许开发者在浏览器空闲时运行低优先级的任务，而不会影响关键任务和动画的性能



[requestidlecallback 执行阶段](https://message163.github.io/react-docs/principle/requestidlecallback.html#requestidlecallback-执行阶段)

1. 处理事件的回调click...事件
2. 处理计时器的回调
3. 开始帧
4. 执行requestAnimationFrame 动画的回调
5. 计算机页面布局计算 合并到主线程
6. 绘制
7. 如果此时还有空闲时间，执行requestIdleCallback



```js
/*
- requestIdleCallback(callBack,options);
	- callBack
		- deadline 参数
			- deadline.timeRemaining() 返回是否还有空闲时间(毫秒)
			- deadline.didTimeout 返回是否因为超时被强制执行(布尔值)
	- options
		- timeout 指定回调的最大等待时间（毫秒）,指定时间内没有空闲，回调会强制执行，避免任务无限期推迟
*/

// 模拟了在浏览器空闲时，渲染1000条dom元素，非常流畅

const total = 1000; // 定义需要生成的函数数量，即1000个任务
const arr = [];    // 存储任务函数的数组

// 生成1000个函数并将其添加到数组中
function generateArr() {
    for (let i = 0; i < total; i++) {
        // 每个函数的作用是将一个 <div> 元素插入到页面的 body 中
        arr.push(function() {
            document.body.innerHTML += `<div>${i + 1}</div>`; // 将当前索引 + 1 作为内容
        });
    }
}
generateArr(); // 调用函数生成任务数组

// 用于调度和执行任务的函数
function workLoop(deadline) {
    // 检查当前空闲时间是否大于1毫秒，并且任务数组中还有任务未执行
    if (deadline.timeRemaining() > 1 && arr.length > 0) {
        const fn = arr.shift(); // 从任务数组中取出第一个函数
        fn(); // 执行该函数，即插入对应的 <div> 元素到页面中
    }
    // 再次使用 requestIdleCallback 调度下一个空闲时间执行任务
    requestIdleCallback(workLoop);
}

// 开始调度任务，在浏览器空闲时执行 workLoop
requestIdleCallback(workLoop,{ timeout: 1000});
```





### MessageChannel

> 初衷是为了方便在不同的上下文之间进行通讯，例如`web Worker`,`iframe` ；它提供了两个端口（port1 和 port2），通过这些端口，消息可以在两个独立的线程之间双向传递

```js
// 创建 MessageChannel
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;

// 设置 port1 的消息处理函数
port1.onmessage = (event) => {
    console.log('Received by port1:', event.data);
    port1.postMessage('Reply from port1'); // 向 port2 发送回复消息
};

// 设置 port2 的消息处理函数
port2.onmessage = (event) => {
    console.log('Received by port2:', event.data);
};

// 通过 port2 发送消息给 port1
port2.postMessage('Message from port2');
```





### react简易版调度器

```js

const ImmediatePriority = 1; // 立即执行的优先级, 级别最高 [点击事件，输入框，]
const UserBlockingPriority = 2; // 用户阻塞级别的优先级, [滚动，拖拽这些]
const NormalPriority = 3; // 正常的优先级 [redner 列表 动画 网络请求]
const LowPriority = 4; // 低优先级  [分析统计]
const IdlePriority = 5;// 最低阶的优先级, 可以被闲置的那种 [console.log]

// 获取当前时间
function getCurrentTime() {
    return performance.now();
}

class SimpleScheduler {
    constructor() {
        this.taskQueue = []; // 任务队列
        this.isPerformingWork = false; // 当前是否在执行任务

        // 使用 MessageChannel 处理任务调度
        const channel = new MessageChannel();
        this.port = channel.port2;
        channel.port1.onmessage = this.performWorkUntilDeadline.bind(this);
    }

    // 调度任务
    scheduleCallback(priorityLevel, callback) {
        const curTime = getCurrentTime();
        let timeout;
        // 根据优先级设置超时时间
        switch (priorityLevel) {
            case ImmediatePriority:
                timeout = -1;
                break;
            case UserBlockingPriority:
                timeout = 250;
                break;
            case LowPriority:
                timeout = 10000;
                break;
            case IdlePriority:
                timeout = 1073741823;
                break;
            case NormalPriority:
            default:
                timeout = 5000;
                break;
        }

        const task = {
            callback,
            priorityLevel,
            expirationTime: curTime + timeout // 直接根据当前时间加上超时时间
        };

        this.push(this.taskQueue, task); // 将任务加入队列
        this.schedulePerformWorkUntilDeadline();
    }

    // 通过 MessageChannel 调度执行任务
    schedulePerformWorkUntilDeadline() {
        if (!this.isPerformingWork) {
            this.isPerformingWork = true;
            this.port.postMessage(null); // 触发 MessageChannel 调度
        }
    }

    // 执行任务
    performWorkUntilDeadline() {
        this.isPerformingWork = true;
        this.workLoop();
        this.isPerformingWork = false;
    }

    // 任务循环
    workLoop() {
        let curTask = this.peek(this.taskQueue);
        while (curTask) {
            const callback = curTask.callback;
            if (typeof callback === 'function') {
                callback(); // 执行任务
            }
            this.pop(this.taskQueue); // 移除已完成任务
            curTask = this.peek(this.taskQueue); // 获取下一个任务
        }
    }

    // 获取队列中的任务
    peek(queue) {
        return queue[0] || null;
    }

    // 向队列中添加任务
    push(queue, task) {
        queue.push(task);
      // 根据优先级排序，优先级高的在前 从小到大
        queue.sort((a, b) => a.expirationTime - b.expirationTime);
    }

    // 从队列中移除任务
    pop(queue) {
        return queue.shift();
    }
}

// 测试
const scheduler = new SimpleScheduler();

scheduler.scheduleCallback(LowPriority, () => {
    console.log('Task 1: Low Priority');
});

scheduler.scheduleCallback(ImmediatePriority, () => {
    console.log('Task 2: Immediate Priority');
});

scheduler.scheduleCallback(IdlePriority, () => {
    console.log('Task 3: Idle Priority');
});

scheduler.scheduleCallback(UserBlockingPriority, () => {
    console.log('Task 4: User Blocking Priority');
});

scheduler.scheduleCallback(NormalPriority, () => {
    console.log('Task 5: Normal Priority');
});
```







### 面试题

- 为什么React不用原生requestIdleCallback？
  - 兼容性差
  - `控制精细度` React 要根据组件优先级、更新的紧急程度等信息，更精确地安排渲染的工作
  - `执行时机`requestIdleCallback(callback) 回调函数的执行间隔是 50ms（W3C规定），也就是 20FPS，1秒内执行20次，间隔较长
  - `差异性` 每个浏览器实现该API的方式不同，导致执行时机有差异有的快有的慢
- requestIdleCallback替代方案是什么？
  - MessageChannel
  - 宏任务中会在下次事件循环中执行，不会阻塞当前页面的更新。`MessageChannel` 是一个宏任务
  - `MessageChannel` 能较快执行，在 0～1ms 内触发，像 setTimeout 即便设置 timeout 为 0 还是需要 4～5ms。相同时间下，MessageChannel 能够完成更多的任务
  - 若浏览器不支持 `MessageChannel`，还是得降级为 setTimeout







## 基础入门



### tsx/jsx

- 绑定class需要用className
- 事件使用`onXXX`，如`onClick`
- tsx 使用泛型
  - 正常写泛型语法会跟tsx语法冲突，他会把泛型理解成是一个元素，解决方案后面加一个,即可
- 渲染 html 代码片段 dangerouslySetInnerHTML
  - dangerouslySetInnerHTML 的值是一个对象，该对象包含一个名为 __html 的属性，且值为你想要插入的 HTML 字符串
- 注意
  - 不支持直接展示对象，可转化为JSON呈现

```jsx
// 示例：便于快速回顾
function App() {
  const num: number = 333
  const fn = () => 'test'
  const value:string = 'A'
  const styles = { color: 'red' }
  const arr: string[] = ["小满","中满","大满"]
  return (
    <>
      {'11' /** 字符串用法 */}
      {num /** 变量用法 */}
      {fn() /** 函数用法 */}
      {new Date().getTime() /** 日期用法 */}

			//绑定class(className) id 属性等等 都是一样的，可绑定多个className
 			<div data-index={value} className={`${value} class2`} style={styles} id={value}>{value}</div>

			// 遍历 类比v-for
			{
            arr.map((item) => {
                return <div>{item}</div>
            })
       }

			// 类比 v-if
     {flag ? <div>真的</div> : <div>假的</div>}
    </>
  )
}



function App() {
  const value: string = '小满'
  const clickTap = <T,>(params: T) => console.log(params);  // 使用泛型
          
  const value: string = '<section style="color:red">小满</section>'
  return (
    <>
      <div onClick={() => clickTap(value)}>{value}</div>
      // 渲染 html内容
      <div dangerouslySetInnerHTML={{ __html: value }}></div>
    </>
  )
}
```



### 前置补充

> 代码转化器：[HTML to JSX (transform.tools)](https://transform.tools/html-to-jsx)

- 定义组件

  - **React组件的名称必须以大写字母开头**，否则它们将无法运行！，相反HTML 标签则必须是小写字母
  - 组件可以渲染其他组件，但是 **请不要嵌套他们的定义**，性能差+bug产生；应在顶层定义每个组件。

- JSX

  - 为什么多个 JSX 标签需要被一个父元素包裹？
    - jsx 在底层其实被转化为了 JavaScript 对象，你不能在一个函数中返回多个对象，除非用一个数组把他们包装起来
  - 内联 `style` 属性 使用驼峰命名法编写
  - class  类定义改写为 className

- 纯函数与副作用

  > 组件应该只 **返回** 它们的 JSX，而不 **改变** 在渲染前就已存在的任何对象或变量（改变会导致多次调用）；多组件共用此变量时，会导致无法预测的结果。

  - 副作用
    - 无需处理事件处理程序的副作用，因为组件内部的事件处理程序不会在渲染期间运行
    - 无法避免的外层副作用，可使用`useEffect`方法将其包裹，告诉React在渲染结束后再执行它
  - 尽可能的精简 state 的使用（用于必要的交互）
    - 特定组件中、它们的公共父组件、单独创建组件管理，并添加在外层
  - 优势：
    - 可用于服务器组件，相同用的输入给出相同的结果。
    - 提升性能，[跳过渲染](https://zh-hans.react.dev/reference/react/memo)未更改输入值的组件

- 状态管理

  - reducer
    - Reducer 可以让您合并多个状态变量到一个对象中并巩固所有相关的逻辑！
    - [将状态提取到一个 reducer 中](https://zh-hans.react.dev/learn/extracting-state-logic-into-a-reducer)







### hook

> - 函数式组件无生命周期的概念
> - hooks是React 16.8.0+增加，只能在函数式组件中使用（ 可通过开发者工具查看hooks状态 ）
> - 只能在**函数最外层**调用 Hook，不能嵌套在if/for/其它函数中调用（react按照hooks的调用顺序识别每一个hook） 
> - 只能在组件或其他自定义hook中调用

- useState     `[ value,setValue ] = useState( defaultValue )`
- useEffect      副作用 `useEffect(()=>{...})`
- useContext    实现跨组件间的数据传输

- useReducer
- useCallback
- useMemo  缓存状态，类似于计算属性，只有指定依赖的值发生变化时才会执行相应的计算，而不会被其他不相关的更新触发
- React.mome  缓存props，当props未发生变化时，跳过子组件的渲染
- useRef
- 自定义hook：实质就是个外部定义的函数，换成类似hook的写法
- [React 18 新hooks](https://zhuanlan.zhihu.com/p/562815409)
  - useId   生成全局唯一id，可以用在client和service端
  - useTransition：
    - 搭配`startTransition`来使用，如果用户需要在UI上感知到transition，react提供了一个hooks`useTransition`来获取transition的状态。
  - useDeferredValue
    - `deferring（延迟）`一个值，跟我们经常提到的debounce和throttle有点类似。在React 18中，当传递给`useDeferredValue`的值发生变化时，React会根据当前**渲染的优先级**来返回之前的值或者是最新的值
  - **useSyncExternalStore**
    - 





#### 自定义hook

> 自定义以 use 开头的函数，实现实现逻辑的封装和复用。

- 实现思路
  - 声明一个 use 开头的函数
  - 在函数体内部封装任何可复用的逻辑即可
  - 把组件中用到的状态/回调，return 出去（对象或数据）
  - 在需要使用的组件中，执行自定义use函数，解构并使用其中的状态/回调
  - 自定义hooks可以调用其他hooks(内置的hooks和自定义的hooks)

```jsx
// 自定义hook举例：
import { useState } from 'react'
function useToggle(){
    // 可复用的逻辑
    const [value,setValue] = useState(true)
    const taggle = () => setState(!value);
    return {taggle,value}
}
function App(){
    const {value,taggle} = useToggle();
    return (
    <div>
            <p>{value ? "1" : "2"}</p>
            <button onClick={taggle}</button>>tagger</button>
     </div>
    )
}
```





#### 状态相关

##### useState

- React中为单向数据流，Vue数据双向绑定

- 更新机制
  
  - 异步更新：实现性能优化，因此无法及时获取set之后的新数据，天然的set函数防抖
    - 避免中间状态丢失，使用函数作为set的参数，可获取到上一次修改后的值
  - 自带`防抖`，防止频繁的更新
    - 多次执行相同的操作更新状态时，React 会进行比较，默认屏蔽后续的更新行为
  
- 注意

  - 数组类型操作，直接修改原数组及对应set不会生效

  

  | 避免使用 (会改变原始数组)          | 推荐使用 (会返回一个新数组）      |
  | :--------------------------------- | :-------------------------------- |
  | 添加元素 push，unshift             | concat，[...arr] 展开语法（例子） |
  | 删除元素 pop，shift，splice        | filter，slice（例子）             |
  | 替换元素 splice，arr[i] = ... 赋值 | map（例子）                       |
  | 排序 reverse，sort                 | 先将数组复制一份（例子）          |

```tsx
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState<String | Number>(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存 initValue是初始值  xxx是数据名  setXxx修改数据的函数
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数（数组解构赋值，位置对应，命名随意）
		useState中传递函数，需返回初始化的值，其中的函数尽在初始化时执行一次
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(prev => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值

const [from,setFrom] = useState({name:'xxx',age:12})
setFrom({...from,name:'new'})
setFrom({name:'new',age:13})

const [obj,setObj] = useState(()=>{
  // 这里的逻辑尽在初始化时执行一次
  return {name:'xxx',age:12}
})

```

![image-20230329185514560](images/React+/image-20230329185514560.png)



```jsx
// 特别的示例：
// - num 永远展示0，因为setCount执行会导致组件重新 rerender 
// - num2 为理想的值，useRef只在初始化时执行一次，组件reRender后useRef的值不会被重新初始化
function App() {
   let num = 0
   let num2 = useRef(0)
   let [count, setCount] = useState(0)
   const handleClick = () => {
      setCount(count + 1)
      num = count;
      num2 = count;
   };
   return (
      <div>
         <button onClick={handleClick}>增加</button>
         <div>{count}:{num}:{num2}</div>
      </div>
   );
}

export default App;
```





##### useReducer

- 作用：和useState类似，用于管理相对复杂的状态，可封装指定的处理事件

```jsx
// 1.定义reducer函数，根据不同的action返回不同的新状态
function reducer(state,action){
    // 处理逻辑
    switch(action.type){
        case 'INC': return state+1;
        case 'DEC': return state-1;
        case 'SET': return action.payload;
        default : return state; 
    }
}
// 2.在组件中调用useReducer，并传入reducer函数和初始状态值
// init 为可选的初始化函数，initialArg作为init函数入参使用
// 当init存在时，使用init函数的返回值作为默认值，否则取第二个参数initialArg作为默认值
const [state,dispatch] = useReducer(reducer,initial Arg,init?)
// 3.事件触发时，通过dispatch派发一个action对象(通知reducer要返回那个新状态并渲染UI)
dispatch({type:'INC'});
dispatch({type:'SEt',payload:100});
```



##### useSyncExternalStore

> 用于从外部存储获取状态并在组件中同步显示

- 场景
  - 订阅外部 store 例如( redux,Zustand`德语`)
  - 订阅浏览器API 例如(online,storage,location)等
  - 抽离逻辑，编写自定义hooks
  - 服务端渲染支持
- 用法`const res = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`
  - subscribe：用来订阅数据源的变化，接收一个回调函数，在数据源更新时调用该回调函数。
  - getSnapshot：获取当前数据源的快照（当前状态）。
  - getServerSnapshot?：在服务器端渲染时用来获取数据源的快照。

- 注意
  - `getSnapshot` 返回的快照必须是不可变的。如果返回可变对象，应该在每次调用时返回新对象
  - 如果使用服务端渲染，必须提供 `getServerSnapshot`

- 工作时机
  - **组件挂载时**：
    - React 调用 `subscribe(callback)` 订阅外部存储，并存储其返回的**取消订阅函数**。
    - 当外部存储变化时，`subscribe` 内部会调用 `callback`，触发组件重新渲染。
  - **组件卸载或依赖变化时**：
    - React 会自动调用之前返回的**取消订阅函数**，清理旧的订阅。
    - 如果依赖项变化（如 `subscribe` 函数本身变化），React 会重新调用新的 `subscribe` 函数，并再次存储新的取消订阅函数。
  - **重新渲染时**：
    - 如果 `subscribe` 函数依赖项未变化，React 会复用之前的订阅，不会重复订阅。




```tsx
import { useSyncExternalStore } from 'react';

function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    (callback) => {
      // 1. 订阅事件（组件挂载时执行）
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine
  );
  return isOnline;
}

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```







#### 副作用



##### useEffect

- 使用场景：

  - 在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
    - 常见副作用：发ajax请求数据获取、手动更改真实DOM、localstorage、设置订阅 / 启动定时器
  - 用于创建不是由事件引起，而是由渲染本身引起的操作，例如：发起请求、更改DOM等
  - 实现防抖，监听数据变化，return中返回取消定时

- 执行时机

  | 依赖项（第二个参数） | 副作用函数执行时机                  |
  | -------------------- | ----------------------------------- |
  | [ ]                  | 只在初次渲染时执行一次              |
  | 没有写               | 组件初次渲染 + 组件更新时执行       |
  | 添加特定依赖项       | 组件初次渲染 + 依赖项发生变化时执行 |

- 清除副作用，执行时机：组件卸载时

  - 在副作用函数中添加的定时器等操作，通过在 useEffect 中 通过 return 返回的函数中清理
  
- 副作用举例

  - 操作引用类型
  - 操作本地存储例如`localStorage`
  - 调用外部API，例如`fetch` `ajax`
  - 操作`DOM`
  - 计时器


```jsx
/* 语法和说明: */
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行 return
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) 
  // 第二个参数如果指定的是[], 回调函数只会在第一次render()后执行一次，
	// 如果不写，会检测所有数据变化时就执行，\
	// 如果传入数据名，会检测数据变化时再执行
    
/* useEffect Hook 可看做如下三个函数的组合	*/
        componentDidMount()		// 第二个参数为 []
        componentDidUpdate()   	// 
    	componentWillUnmount()   // 有return返回值时，可当成componentWillUnmount钩子



// 相当于 componentDidMount 和 componentDidUpdate:
// 可以访问到组件的 props 和 state。在每次渲染后调用副作用函数 —— 包括第一次渲染时
  useEffect(() => {    
      // 使用浏览器的 API 更新页面标题   
      document.title = `You clicked ${count} times`;  
  });


// 例：清除副作用
useEffect(()=>{
   const timer = setInterval(()=>{...},1000);
   return ()=>{
   		clearInterval(timer);	// 清除副作用（组件卸载时自动执行）    
   } 
},[])
```





##### useLayoutEffect

> 用于在浏览器重新绘制屏幕之前触发。与 useEffect 类似

- 应用场景
  - 需要同步读取或更改DOM：例如，你需要读取元素的大小或位置并在渲染前进行调整。
  - 防止闪烁：在某些情况下，异步的useEffect可能会导致可见的布局跳动或闪烁。例如，动画的启动或某些可见的快速DOM更改。
  - 模拟生命周期方法：如果你正在将旧的类组件迁移到功能组件，并需要模拟 componentDidMount、componentDidUpdate和componentWillUnmount的同步行为。

| 区别     | useLayoutEffect                      | useEffect                            |
| :------- | :----------------------------------- | :----------------------------------- |
| 执行时机 | 浏览器完成布局和绘制`之前`执行副作用 | 浏览器完成布局和绘制`之后`执行副作用 |
| 执行方式 | 同步执行                             | 异步执行                             |
| DOM渲染  | 阻塞DOM渲染                          | 不阻塞DOM渲染                        |

```tsx
useLayoutEffect(() => {
  // 副作用代码
  return () => {
    // 清理代码
  }
}, [dependencies]);
```





#### useRef

- 使用场景

  - 处理DOM元素或需要在组件渲染之间保持持久性数据
    - current属性存放拿到的dom对象【与 class类式组件中的 React.createRef() 】
    - 使用 useState并修改状态，会导致组件重新render，发生的数据丢失，可用useRef保存
      - 如定时器的保存，用于后续清除定时器

- 注意

  - 组件在重新渲染的时候，useRef的值不会被重新初始化
  - 改变 ref.current 属性时，React 不会重新渲染组件。React 不知道它何时会发生改变，因为 ref 是一个普通的 JavaScript 对象
    - 除了 初始化 外不建议在渲染期间写入或者读取 ref.current，否则会使组件行为变得不可预测
    - useRef的值不能作为useEffect等其他hooks的依赖项，因为它并不是一个响应式状态
  - react 19之前 useRef不能直接获取子组件的实例，需使用forwardRef，19及之后可以使用useRef

- ```jsx
  (1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
  (2). 语法1: const refContainer = React.useRef()
  	 语法2: import { useRef,useEffect } from "React"
  		   const h1ref = useRef(null)
              
         useEffect(()=>{
         	console.log(h1ref.current)
         },[])
              
         `<div ref={ h1ref }></div> `
  (3). 作用:保存标签对象,功能与React.createRef()一样
  ```






#### useImperativeHandle

- 场景
  - 在父组件中调用子组件的方法，或者访问子组件的属性，类似于Vue的`defineExpose`
- 参数
  - ref: 父组件传递的ref对象
  - createHandle: 返回值，返回一个对象，对象的属性就是子组件暴露给父组件的方法或属性
  - deps?:[可选] 依赖项，当依 赖项发生变化时，会重新调用createHandle函数，类似于`useEffect`的依赖项




```tsx
// 父组件中
function App() {
   const childRef = useRef<ChildRef>(null)
   const showRefInfo = () => {
      console.log(childRef.current)
   }
   return (
      <div>
         <h2>我是父组件</h2>
         <button onClick={showRefInfo}>获取子组件信息</button>
         <button onClick={() => childRef.current?.addCount()}>操作子组件+1</button>
         <button onClick={() => childRef.current?.subCount()}>操作子组件-1</button>
         <hr />
         <Child ref={childRef}></Child>
      </div>
   );
}


// 子组件中 
interface ChildRef {
   name: string
   count: number
   addCount: () => void
   subCount: () => void
}
// React18.2 
onst Child = forwardRef<ChildRef>((props, ref) => {...})
// React19
const Child = ({ref}: { ref: React.Ref<ChildRef> }) => {
   const [count, setCount] = useState(0)
   //重点
   useImperativeHandle(ref, () => {
      return {
         name: 'child',
         count,
         addCount: () => setCount(count + 1),
         subCount: () => setCount(count - 1)
      }
   })
   return <div>
      <h3>我是子组件</h3>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>增加</button>
      <button onClick={() => setCount(count - 1)}>减少</button>
   </div>
}
```





#### useContext

- 实现跨组件间的数据传输
  - 可以传递数据、方法

- 注意
  - 如果使用多个相同的Context组件，内层会覆盖外层的Context


```jsx
1. 使用createContext 创建Context对象
2. 在顶层组件通过Provider 提供数据
3. 在底层组件通过useContext函数获取数据
import { createContext, useContext } from 'react'

const MyContext = createContext({xxx}) // 创建Context上下文,可传入默认值

function Foo() {  
    return <div>Foo <Bar/></div>
}

function Bar() {  
    // 底层组件通过useContext函数获取数据  
    const data = useContext(MyContext)  
    return <div>Bar {data.name}</div>
}

function App() {  
    return (    
        // 顶层组件通过Provider 提供数据    
        <!-- 18版本 -->
				<!-- <MyContext.Provider value={{name:'this is name'}}>	
            <div><Foo/></div>    
        </MyContext.Provider>  -->
      
       <!-- 19版本 -->
       <MyContext value={{name:'this is name'}}> 
             <div><Foo/></div>    
       </MyContext>
    )
}

export default App
```

![image-20230330110824808](images/React+/image-20230330110824808.png)







#### useId

- `useId`用于生成全局唯一id的hooks，可用在client、service端，能够避免其他id产品的水合问题

- 适用场景：生成唯一 ID、用来连接 HTML 元素，比如 label 和 input。

  ![image-20240403173559928](images/React+/image-20240403173559928.png)

```jsx
import { useId } from 'react';
const CheckBox = () => {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input type="checkbox" name="react" id={id} />
    </>
  )
}
```











#### 优化



##### useTransition

> 用于管理UI的过渡状态，特别是长时间运行的状态更新。允许标记“过渡”状态，从而优先处理更重要的更新，同时延迟处理过渡更新。 React 18 引入的一个 Concurrent Mode（并发模式）特性，它允许在不阻塞 UI 的情况下更新状态，特别适用于需要优先处理用户交互的场景。



- 使用场景
  - 频繁的修改状态时使用，但不属于防抖截流的替代品，防抖截流能从逻辑上减少执行，而 useTransition依旧都会执行
  - 关注于【状态过渡 - 列表/tab页的变化】
    - 不适合 输入框 / 滚动，中间状态会被忽略掉
- 注意
  - **不是节流/防抖替代品**：`useTransition` 不是用来优化频繁事件的，它只是让 React 能更好地调度工作
  - **状态更新必须可序列化**：传递给 `startTransition` 的回调必须是同步的，不能包含异步操作，如 setTimeOut，async
  - **与 Suspense 配合**：当过渡中的组件挂起时，`isPending` 会保持 true，直到 Suspense 边界解决
  - **性能考量**：过渡更新可能会被中断和重新启动，确保你的渲染逻辑能够处理这种情况

```tsx
// 用法
const [isPending,startTranstion] = useTransition()

// 示例：
import { useTransition } from 'react';

function MyComponent() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      // 在这里设置状态更新，当不阻塞UI的情况下更新
      // 若UI正在渲染，此处会被延后执行，将原本任务高优先级的状态更新视为低优先级的“过渡”
      setState(newState);
    });
  }

  return (
    <div>
      {isPending ? 'Loading...' : null}
      <button onClick={handleClick}>Start Transition</button>
    </div>
  );
}
```





##### useDeferredValue

> 用于延迟某些状态的更新，直到主渲染任务完成，避免由于频繁更新而导致的性能问题

- 使用场景
  - 高频更新的内容（如输入框、滚动等）非常有用
  - 关注于【单个值更新 - 输入框 / 滚动的过渡】，相比于useTransition延迟更久一些
- 区分
  - useTransition关注点是`状态的过渡`，允许开发者控制某个更新的延迟更新，还提供了过渡标识，让开发者能够添加过渡反馈
  - useDeferredValue主要关注点是`单个值`的延迟更新。它允许你把特定状态的更新标记为低优先级
- 注意
  - `useDeferredValue` 并不是防抖,防抖是需要一个固定的延迟时间，譬如1秒后再处理某些行为，但是useDeferredValue并不是一个固定的延迟，它会根据用户设备的情况进行延迟，当设备情况好，那么延迟几乎是无感知的
  - 并不会忽略掉中间值，

```tsx
// 返回延迟更新的值,在初始渲染期间，返回的延迟值deferredValue将与您提供的值value相同
const deferredValue = useDeferredValue(value)

// 举例：
import React, { useState, useTransition, useDeferredValue } from 'react'
import { Input, List } from 'antd'
import mockjs from 'mockjs'
interface Item {
   name: number
   address: string
}
export const App = () => {
   const [val, setVal] = useState('')
   const [list] = useState<Item[]>(() => {
    // 使用 Mock.js 生成模拟数据
      return mockjs.mock({
         'list|10000': [
            {
               'id|+1': 1,
               name: '@natural',
               'address': '@county(true)',
            }
         ]
      }).list
   })
   const deferredQuery = useDeferredValue(val)
   const isStale = deferredQuery !== val // 检查是否为延迟状态
   const findItem = () => {
      //过滤列表，仅在 deferredQuery 更新时触发
      return list.filter(item => item.name.toString().includes(deferredQuery))
   }
   return (
      <div>
         <Input value={val} onChange={(e) => setVal(e.target.value)} />
         <List style={{opacity: isStale ? '0.2' : '1', transition: 'all 1s'}} renderItem={(item) => <List.Item>
            <List.Item.Meta title={item.name} description={item.address} />
         </List.Item>} dataSource={findItem()}>
         </List>
      </div>
   )
}

export default App
```







##### useCallback

- 在组件多次重新渲染时，缓存组件内部的函数
  - 但其缓存在内存中，切勿滥用
- 入参
  - callback：回调函数
  - deps：依赖项数组，当依赖项发生变化时，回调函数会被重新创建，跟useEffect一样。
- 出参
  - 返回一个记忆化的回调函数，可以减少函数的创建次数，提高性能。
- 注意
  - 需有所节制的使用，盲目可能会导致不必要的性能损失。useCallback本身也需要一定的性能开销
    - 父组件的重新渲染，会导致所有的子组件都重新渲染，可利用useCallback避免重新渲染
  - useCallback并不是为了阻止函数的重新创建，而是通过依赖项来决定是否返回新的函数或旧的函数，从而在依赖项不变的情况下确保函数的地址不变

```jsx
// 使用useCallback包裹函数后，可保证在组件渲染时保持函数引用的稳定，在传递给子组件的引用不变
import { useCallback } from 'react'

// 改造前
const changeHandler = (value)=>{ console.log(value) }	
// 改造后
const changeHandler = useCallback(() => {
  doSomething(a, b);
}, [a, b]);	
```









##### uesMemo

- 作用：在组件每次重新渲染时，缓存计算的结果，只有当指定的依赖项发生变化时，才再次执行计算的函数
- 使用场景：
  - 当需要缓存复杂计算结果时
  - 当需要避免不必要的重新计算时
  - 当计算逻辑复杂且耗时时，例如递归的计算-避免不相关的更新触发较大的计算逻辑
- 出参：回调函数执行的结果
- 注意事项：
  - 不要过度使用，只在确实需要优化的组件上使用
  - 如果依赖项经常变化，useMemo 的效果会大打折扣
  - 如果计算逻辑简单，使用 useMemo 的开销可能比重新计算还大


```jsx
import { useMemo } from 'react'
// 基础语法
useMemo(()=>{
    // 依赖变化时，才重新计算并返回结果
    return ...
},[xxx])

const [count1,setCount1] = useState(0)
const [count2,setCount2] = useState(0)

const result = useMemo(()=>{
    // 使用useMemo做缓存后，可确保只有依赖项count1发生变化时才会重新执行计算并返回
    return count1+1;
},[count1])

return (<>
    	<button onClick={()=>setCount1(count1+1)}>{{count1}}</button>
    	<button onClick={()=>setCount2(count2+1)}>{{count2}}</button>
    	{{result}}
    	</>)
```



##### React.Memo

> React默认渲染机制：只要父组件重新渲染，子组件就会无脑重新渲染

- 作用：允许组件在Props没有没有改变时，跳过渲染，从而节约性能
  - 通过对前后props进行**浅比较**，如果前后props不一致，将重新渲染，反之不进行渲染，使用缓存中的组件。
- props的比较机制
  - 使用memo缓存组件后，会对每一个prop使用`Object.is`比较，只有全部为true时，才会跳过渲染
  - prop是简单类型
    - Object.is(3,3);			// true
  - prop 是复杂类型 - 每次重新执行，都会产生新的对象/数组引用
    - 可结合 useMemo或useState使用，从而保证引用的类型地址不会变化
    - Object.is([],[]);			// false

```jsx
// 使用memo函数包裹生成的缓存组件只有在props发生变化时才会重新渲染
import {mome} from 'react'

const MomoSon = memo(function Son(props){
    // ...
}) 
```

![image-20230803105940870](images/React+/image-20230803105940870.png)





#### useDebugValue

- 专为开发者调试自定义 Hook 而设计的 React Hook。它允许你在 React 开发者工具中为自定义 Hook 添加自定义的调试值







#### React.forwardRef

> 作用：使用ref暴露子组件的DOM节点交给父组件 React19逐步淘汰

```jsx
import {forwardRef,useRef} from 'react'
// 子组件  使用forwardRef包裹子组件
const Input =forwardRef((props,ref)=>{
    return <input ref={ref} type='type'/>
})

// 父组件 
function App(){
    const inputRef = useRef(null)
    return <Input  ref={inputRef}/>;
}
```







### 组件

- react中没有全局组件/局部组件概念，哪里引入哪里用



#### 全局组件

```tsx
// 诸多方案中的一个示例
import ReactDom from 'react-dom/client'
import './index.css'
const Message = () => {
    return (
        <div>
            提示组件
        </div>
    )
}
interface Itesm {
    messageContainer: HTMLDivElement
    root: ReactDom.Root
}
const queue: Itesm[] = []
window.onShow = () => {
    const messageContainer = document.createElement('div')
    messageContainer.className = 'message'
    messageContainer.style.top = `${queue.length * 50}px`
    document.body.appendChild(messageContainer)
    const root = ReactDom.createRoot(messageContainer)
    root.render(<Message />) //渲染组件
    queue.push({
        messageContainer,
        root
    })
    //2秒后移除
    setTimeout(() => {
        const item = queue.find(item => item.messageContainer === messageContainer)!
        item.root.unmount() //卸载
        document.body.removeChild(item.messageContainer)
        queue.splice(queue.indexOf(item), 1)
    }, 2000)
}

//声明扩充
declare global {
    interface Window {
        onShow: () => void
    }
}

export default Message


// 实际使用

( <button onClick={() => window.onShow()}>确认</button> )
```









#### Fragment 空标签

- 可简写为`<></>` ，表示空标签
- 使用场景:
  - 需要将key传递给标签，此时不能使用`<></>`


```jsx
// 需要传递key值时:
import { Fragment } from 'React';
<Fragment key={xxx}></Fragment>
// 
```



#### Helmet 动态head

- 用来在页面组件中动态修改页面的`<head>`中的标签，如修改标题`<title>`、`<link>` `<meta>`等时，可以用这个实现

```jsx
import { Helmet } from 'react-helmet-async';

<Helmet>
	<title> User: Account Settings | Minimal UI</title>
</Helmet>
```













#### 组件间通信

- props   支持所有类型
- 状态提升
  - useContext
  - 定义在共同的父组件中
- 发布订阅模式
  - 浏览器原生 new Event('事件名')
  - [mitt](https://www.npmjs.com/package/mitt) 等三方包

```tsx
/* 组件 props 传参，类型设置 */
interface Props {
  title?:string
  children?:React.ReactNode
}
// 方式1:
const Card1 = (props:Props)=>{
  return <div>{props.title}</div>
}
// 方式2:
import React from 'react'
const Card2: React.FC<Props> = (props){
  return <div>{props.title}</div>
}


/* props默认值 */
// 方式1:对props进行结构赋默认值
const Card1 = ({title='默认title'}:Props)=>{
  return <div>{props.title}</div>
}
// 方式2:声明默认对象
// Partital来自TS与法，将对应类型所有参数都定义为可选
const defalutPorps:Partital<Props>={
  title:'默认标题'
}
const Card1 = (props:Props)=>{
  const {title} = [...defalutPorps, ...props]
  return <div>{props.title}</div>
}
```





- 兄弟组件通讯：状态提升，由公共父组件管理

- 跨层级组件通讯 useContext

- 父传子

  - 子组件通过props参数接收，父组件通过子组件标签传递的数据

  - 可以使用 `<Avatar {...props} />` 展开语法转发所有 props，但不要过度使用它
  - `<Card><Avatar /></Card>` 嵌套将作为 `Card` 组件的 `prop.children`，不影响其他标签属性传递
  - Props 是只读的时间快照：每次渲染都会收到新版本的 props，修改时可通过设置 state

  ```jsx
  // 基础用法
  import Avatar from './Avatar.js';
  function Card({ children,type }) {
    return <div className="card"> {children} </div>;
  }
  export default function Profile() {
    return (
      <Card type='xxx'>
        <Avatar size={100} person={{  name: 'Katsuko Saruhashi', imageId: 'YfeOqp2' }} />
      </Card>
    );
  }
  
  /*
  扩展：render props :向组件内部动态传入带有内容的结构（标签/组件）
  	Vue中: 
  		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
  	React中:
  		使用children props: 通过组件标签体传入结构
  		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性
  */
  
  <A render={(data) => <C data={data}></C>}></A>
    // A组件: {props.render(内部state数据)} ???【存疑】
    // C组件: 读取A组件传入的数据显示 {props.data}
  ```

- 子传父：子组件中调用父组件方法并传值

  ```jsx
  // 注意：不建议将父组件中的setState传递给子组件，子组件应只关心数据的使用渲染，而不包含修改
  // 父组件中
  function getMsg(data){...}
  <A onGetMsqg={getMsg}></A>
                    
  // 子组件中
  function A({onGetMsqg}){
      return (
      	<div onClick= { ()=>onGetMsqg('son') }>send</div>
      )
  }
  ```









#### 组件分类

##### 函数式组件(无状态)

- 函数式组件中，this默认指向 undefined，
  - 原因：babel编译时，执行js严格模式，影响this执行
- 组件首字母必须大写，否则会被解析为html标签，导致报错！
- 函数式组件 **必须有返回值**
- render() 函数中，写函数标签，并且首字母大写！
- 执行 `ReactDOM.render(......)`的过程
  1. React 解析组件标签，找到  MyComponent组件
  2. 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中

```jsx
// 1.创建函数式组件（组件名就是函数名）
function MyComponent(){
   console.log(this)    // undefined
   return <h2>函数自定义组件（适用于【简单组件】）</h2>
}
// 2.渲染组件到页面
ReactDOM.render(<MyComponent/>,document.getElementById('test'));
```



##### 类式组件(有状态)

-  注意：
   1. 必须写render函数，且必须有返回值
-  执行 `ReactDOM.render(......)`的过程
   1. React 解析组件标签，找到  MyComponent组件
   2. 发现组件是使用类定义的，随后new这个类的实例，并通过该实例调用到原型上的render方法
   3. 将render返回的虚拟DOM转为真实DOM，随后呈现在页面中
-  render函数中，this指向当前组件实例对象

```jsx
// 1.创建类式组件  继承自 React.Component
class Welcome extends React.Component {
  // render 放在 Welcome的原型对象上(Welcome组件实例对象)，供实例使用
  render() {
    return <h1>类式组件，适用于【复杂组件】的定义</h1>;
  }
}
// 渲染组件到页面
ReactDOM.render(<Welcome/>,document.getElementById('test'));
```









##### 非受控组件(现用现取)

- 内容现用现取，不经过state管理
- 过于依赖视图，频繁使用ref

```jsx
//创建组件
class Login extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault(); // 阻止默认事件 表单提交 
    const { username, password } = this;
    alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`);
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input ref={(c) => (this.username = c)} type='text' name='username' />
        密码：
        <input ref={(c) => (this.password = c)} type='password' name='password' />
        <button>登录</button>
      </form>
    );
  }
}
//渲染组件
ReactDOM.render(<Login />, document.getElementById("test"));
```



##### 受控组件

- 经过state管理的数据，减少 ref 的使用

```jsx
//创建组件
class Login extends React.Component{
	//初始化状态
	state = {
		username:'', //用户名
		password:'' //密码
	}
	//保存用户名到状态中
	saveUsername = (event)=>{
		this.setState({username:event.target.value})
	}
	//保存密码到状态中
	savePassword = (event)=>{
		this.setState({password:event.target.value})
	}
	//表单提交的回调
	handleSubmit = (event)=>{
		event.preventDefault() //阻止表单提交
		const {username,password} = this.state
		alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
	}
	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				用户名：<input onChange={this.saveUsername} type="text" name="username"/>
				密码：<input onChange={this.savePassword} type="password" name="password"/>
				<button>登录</button>
			</form>
		)
	}
}
//渲染组件
ReactDOM.render(<Login/>,document.getElementById('test'))
```

- **函数柯里化方式**，简化上面代码，核心如下：
  - saveFormData 函数：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

```jsx
class Login extends React.Component {
  //保存表单数据到状态中
  saveFormData = (dataType) => {
    return (event) => {
      this.setState({ [dataType]: event.target.value });
    };
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        用户名：
        <input onChange={this.saveFormData("username")} type='text' name='username' />
        密码：
        <input onChange={this.saveFormData("password")} type='password' name='password' />
        <button>登录</button>
      </form>
    );
  }
}
```

- 不使用柯里化方式实现

```jsx
class Login extends React.Component{
	// 保存表单数据到状态中  同时接收需要的参数，进行状态设置
	saveFormData = (dataType,event)=>{
		this.setState({[dataType]:event.target.value})
	}
   
   // 传递时： onChange 函数接收返回值中调用 this.saveFormData 并传入所有参数，会立即执行
	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
				密码：<input onChange={event => this.saveFormData('password',event) } type="password" name="password"/>
				<button>登录</button>
			</form>
		)
	}
}
```









## 进阶内容



### [React路由](https://www.yuque.com/fechaichai/qeamqf/smoknz#JRD2D)

- 创建路由实例 `createBrowserRouter`
- 使用路由标签`RouterProvider`
- 路由跳转`useNavigate  Link`
- 路由参数  `useSearchParams   useParams`
- 嵌套路由`children    <Outlet />`
- 路由模式：`createHashRouter    createBrowerRouter`

```jsx
// 安装 react-router-dom
npm i react-router-dom

import { createBrowserRouter,RouterProvider, useNavigate,Link, useSearchParams,useParams,Outlet } from 'react-router-dom';

// 创建Router实例，并配置路由对应关系
const router = createBrowserRouter([
	{
        path: '/instance/trajectory/detail/:id',
        component: lazy(() => import('../layouts/instance/trajectory/detail')),
    },
    {
        path: '/',
        component: lazy(() => import('../layouts')),
        // 嵌套子路由 定义
        children:[
            // 默认二级路由，不使用path配置
            {
                 index:true,
            	component: lazy(() => import('../layouts/instance/detail')),
            },
            {
                 path: 'detail/:id',
            	component: lazy(() => import('../layouts/instance/detail')),
            }
        ]
    },
    // 404 路由配置,放置在路由末尾，path为 *
    {
        path:'*'，
        component: lazy(() => import('../404')),
    }
])

// 使用Router
<RouterProvider router={router}></RouterProvider>


// 路由跳转 navigate
const Login =()=>{
    const navigate = useNavigate();
    return (
        <div>
            {/* 声明式写法 */}
            <Link to='/active'>路由跳转</Link>
            {/* 编程式写法，并传url参数 */}
            <button onClick={()=>navigate('/active?id=100')}>路由跳转</button>
            {/* 嵌套路由出口 <Outlet/>  */}
            <Outlet/> 
        </div>
    )
}

// 获取url路由参数  /active?id=100
const [params] = useSearchParams();
let id = params.get('id');
// 获取路径参数 /active/:id  /active/100  id为路由配置时的占位符命名
const params = useParams();
let id = params.id



/* 路由配置中制定路径参数 :id
{
    path: '/instance/trajectory/detail/:id',
    component: lazy(() => import('../layouts/instance/trajectory/detail')),
  },
*/
```







### 性能优化

#### useLayoutEffect/useEffect

- useLayoutEffect 和 useEffect 的最大差别在于执行时机的不同，useEffect 会在浏览器绘制完成之后调用，而 useLayoutEffect 则会在 React 更新 dom 之后，浏览器绘制之前执行，并且会阻塞后面的绘制过程，因此适合在 useLayoutEffect 中进行更改布局、及时获取最新布局信息等操作。
- 使用场景：
  - 为了避免在 React render中多次声明 ResizeObserver 实例，我们可以把实例化过程放在 useLayoutEffect 或 useEffect 中。并且在非 SSR 场景中，我们应该尽量使用 useLayoutEffect 而不是 useEffect。







### 路由懒加载

> 指路由的JS资源只有在被访问时才会动态获取，可优化项目首次打开的时间

```jsx
// 1.使用lazy函数将组件动态导入
import { Suspense,lazy } from 'react'
const Home = lazy(()=>import('@/pages/Home'))

// 2.使用组件时，通过 <Suspense> 包裹，提供异步渲染能力
// fallback属性用于指定在组件加载完成前显示的内容
<Suspense fallback={'记载中'}><Home /></Suspense>
```




### 组件优化

1. Component的2个问题 

   > 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低
   >
   > 2. 只要当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

2. **原因**：Component中的 shouldComponentUpdate() 生命周期钩子总是返回 true

3. 解决：

   ```js
   // 办法1: 
   	借助shouldComponentUpdate()生命周期钩子
   	比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
       //控制组件更新的“阀门”
       shouldComponentUpdate(nextProps,nextState){
           console.log(this.props,this.state);  // 当前的props和state
           console.log(nextProps,nextState); 	// 接下来要变化的目标props和目标state
           return !this.state.xxx===nextState  // 可根据值得变化控制是否掉 render函数
       }
   
   // 办法2:  
   	使用PureComponent
   	PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
   // 注意: 
   	只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
   	因此不要直接修改state数据, 而是要产生新数据
   
   
   // 项目中一般使用PureComponent来优化
   // 1.引入 PureComponent
   import React,{PureComponent} from 'react'
   // 2.使用PureComponent创建组件
   export default class Count extends PureComponent {
       xxx...
   } 
   
   ```

   



### 错误边界

> 错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

- 特点：

  只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

- 使用方式：

  ```js
  // getDerivedStateFromError 配合 componentDidCatch
  state={hasError:""}
  // 生命周期函数，一旦后代组件报错，就会触发
  static getDerivedStateFromError(error) {
      console.log(error);
      // 在render之前触发
      // 返回新的state
      return {
          hasError: true,
      };
  }
  
  componentDidCatch(error, info) {
      // 统计页面的错误。发送请求发送到后台去
      console.log(error, info);
  }
  ```

  





### CDN优化

> 优化点：体积较大的非业务JS文件，如 react、react-dom等，不需要经常做变动，直接CDN缓存即可
>
> - 利用CDN的缓存特性，将非业务JS文件排除在打包之外。
> - 以CDN的方式重新引入资源
> - 不同打包工具配置不同....【TODO:待完善】





### 打包体积分析

> 通过分析打包体积，能更好的进行项目优化

- 使用步骤

  1. 安装分析打包体积的包 yarn add source-map-explorer

  2. 在package.json.中的scripts 标签中，添加分析打包体积的命令

  3. 对项目打包 yarn build （如果已经打包，可跳过）

  4. 运行分析命令：yarn analyze

  5. 通过浏览器打开的页面，进行分析

     ```js
     // package.json 中：
     // source-map-explorer 'build/static/js/*.js' 表示分析打包后的所有js文件
     "script":{
       "analyze":"source-map-explorer 'build/static/js/*.js'"
     }
     ```

  ![image-20230402225930811](images/React+/image-20230402225930811.png)







## 周边库

### react-hook-form

- https://www.jianshu.com/p/fa6e3d76bcaa

```jsx
yarn add react-hook-form

import React from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstname" ref={register} /> {/* register an input */}
      <input name="lastname" ref={register({ required: true })} />
      {errors.lastname && 'Last name is required.'}
      <input name="age" ref={register({ pattern: /\d+/ })} />
      {errors.age && 'Please enter number for age.'}
      <input type="submit" />
    </form>
  );
}
```







### react-cookies

> 可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效
> 大小4K左右
> 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题
> 存在 XSS 注入的风险，只要打开控制台，就可以随意修改它们的值

```js
// 下载依赖
cnpm install  react-cookies --save-dev
// 引入
import cookie from 'react-cookies'

cookie.save('userId', "123"); // 存
cookie.load('userId')    // 取
cookie.remove('userId')  // 删

// 设置失效时间
let inFifteenMinutes = new Date(new Date().getTime() + 24 * 3600 * 1000);//一天
cookie.save('userId', "123",{ expires: inFifteenMinutes });

// 补充：
名字相同cookie是可以同时存在的，cookie不仅有名字和值两个属性，还有域（domain）、路径（path）等属性，不同的域、不同的路径下可以存在同样名字的cookie。

```







### [Ant Design](https://ant.design/index-cn)

- 按需引入：[在 create-react-app 中使用 - Ant Design](https://3x.ant.design/docs/react/use-with-create-react-app-cn)
- 自定义主题：
  - [在 create-react-app 中使用 - Ant Design](https://3x.ant.design/docs/react/use-with-create-react-app-cn)
  - [定制主题 - Ant Design](https://3x.ant.design/docs/react/customize-theme-cn)

```js
// 1.安装
yarn add antd
// 2.看文档使用即可
```











### 没看的部分

- 123-125   性能优化
- 127+
- 路由：
  - 路由的配置
  - 动态路由
  - React路由的原理
- Redux-Saga   **周六**
  - ![image-20221020190402295](images/React+/image-20221020190402295.png)
  - ![image-20221020190428101](images/React+/image-20221020190428101.png)
- D3.js  v4.x  **周日**
  - 基本用法、曲线图、柱状图。。。
  - ![image-20221020191024040](images/React+/image-20221020191024040.png)
  - ![image-20221020191037747](images/React+/image-20221020191037747.png)
  - ![image-20221020191046378](images/React+/image-20221020191046378.png)
- git
  - [Git教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/896043488029600)
  - [Git 原理入门 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2018/10/git-internals.html)
  - merge、cherry-pick、reset、checkout、branch...
  - github  基本使用
- Linux基本使用（看pdf网站？）
- JS代码规范（看pdf网站？）
- JS知识
  - webpage 教程？
  - babel教程？
  - js设计模式（看pdf网站？）
- [HTML+CSS基础教程-慕课网 (imooc.com)](https://www.imooc.com/learn/9)
- [SVG 图像入门教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2018/08/svg.html)
- 







## 使用记录

### 基础细节

- React组件首字母大小写，使用时带`< />`

  ```jsx
  function Header() {
    return <h1>Develop. Preview. Ship.</h1>;
  }
   
  function HomePage() {
    return (
      <div>
        {/* Nesting the Header component */}
        <Header />
      </div>
    );
  }
   
  const root = ReactDOM.createRoot(app);
  root.render(<Header />);
  ```

  







### 深度监视

> 使用global声明的class 都不会被编译成哈希字符串
>
> 使用的组件的样式大部分都是使用全局样式 使用局部方式声明class 经过编译后 无法与组件的默认样式class匹配 样式自然无法进行覆盖，要覆盖默认样式就需要 使用全局样式 需要使用global 声明的class
> 这样就不会被编译成哈希字符串 也就能覆盖默认样式了

```css
:global(.ant-back-top) {
    right: 20px;
    bottom: 80px;
}
```



### @符配置 别名路径

> - cra创建的项目，默认将所有工程化配置，都隐藏在react-script包中；如果要修改CRA的默认配置有以下两种方案：
>   - 通过第三方库修改，@craco/craco  （推荐）
>   - 通过执行 yarn eject 命令，释放 react-scripts 中的所有配置到项目中

- 实现步骤

  1. 安装修改CAR配置的包：yarn add -D @craco/craco

  2. 在项目根目录中创建配置文件：craco.config.js ，并在配置文件中配制路径别名

  3. 修改 package.json 中的脚本命令（有时候不需要修改？）

  4. 在代码中 使用@符号表示 src目录的绝对路径

  5. 重启项目，配置生效

     ```js
     // craco.config.js 文件配置
     const path = req
     module.exports = {
       webpack: {
         alias:{
           "@":path.resolve(__dirname,"src")
         }
       }
     }
     
     // package.json 
     "scripts":{
       "start": "craco start",
       "build": "craco build", 
       ......
     }
     ```

  6. 让vscode 识别@符号，并进行代码提示

     ```json
     // 属于 vscode配置 与项目本身无关
     // 在项目根目录创建 jsconfig.json 配置文件，并添加以下配置
     {
       "compilerOptions": {
         "baseUrl": "./",
         "paths": {
           "@/*":[
             "src/*"
           ]
         }
       }
     }
     ```

     



### 文件下载

```jsx
// 借助a标签下载文件
<a href={xxx} download>下载</a>   // 错误方式
<a href={require('xxx')} download>下载</a>   // 正确方式，用 require这种方式去引用路径，src 同理
```







### 优化配置CDN

> 通过 craco修改webpack配置，对第三方包使用CDN优化
>
> https://www.bilibili.com/video/BV1Z44y1K7Fj/?p=154&spm_id_from=pageDriver&vd_source=49059bedc59884104ea6ef0a6e552378

```

```





### vite+react项目搭建

- https://zhuanlan.zhihu.com/p/456407867?utm_id=0

![image-20230412143944687](images/React+/image-20230412143944687.png)









### Docusaurus记录



- 配置文件   https://docusaurus.io/zh-CN/docs/api/docusaurus-config
- 指南   https://docusaurus.io/zh-CN/docs/category/guides
- 关于组件的弹出
  - 可以直接在 `node_modules/@docusaurus/theme-classic/src/theme` 查看所有组件，再通过命令弹出
  - 更粗暴的方法（不建议）
    - `node_modules/@docusaurus/theme-classic/src/theme` 中找到组件所在文件夹，将整个文件夹复制到 `src/theme` 下。这样能得到最原始的ts文件，同时所能修改的地方也就越多，更方便的个性化。

```sh
# 查看内部的所有组件
yarn run swizzle @docusaurus/theme-classic -- --list

# 弹出/暴露 指定组件
yarn run swizzle @docusaurus/theme-classic 组件名 -- --eject --typescript

```





##### 添加文档/博客

- 文档：在`src/docs`目录下新建 `.jsx` 或 `.md` 文件，也可在当前目录下新建文件夹并创建这些文件
- 博客：在`src/blog`目录下新建 `.jsx` 或 `.md` 文件，也可在当前目录下新建文件夹并创建这些文件

- 使用图片/静态资源（建议）：
  - 资源保存路径，相对当前md文档：`./static/${filename}` 
  - 可使用 Typora 设置图像存储位置，方便🍜



- 注意点：
  - 任何下划线 _ 开头的文件都会被忽略
  - 映射到同一路由的多个页面，将只能访问最后创建的页面
  - 在md文档中支持使用 JSX语法及React组件

https://markdown.com.cn/cheat-sheet.html

###### Category metadata

1. 在相应的文件夹下添加`_category_. json`或`_category_.yml`文件

```JSON
# 示例：
{
  "position": 2.5,            // 所在目录在侧边栏中显示的排序，[number]
  "label": "Tutorial",        // 所在目录在侧边栏中显示的文本,[string]
  "collapsible": true,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "title": "Tutorial overview"
  },
  "customProps": {
    "description": "This description can be used in the swizzled DocCard"
  }
}
```

###### [文档 Metadata fields](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-docs#tags)

- 文档顺序
  - 默认情况下，侧边栏中的项目将按字母顺序（文件和文件夹名称）生成。
  - 在md文档前使用 metadata fields配置的 `sidebar_position`  排序
- 

```Markdown
---
title: xxx                    # 文本标题+备用值（侧边栏、下篇/上篇按钮...),[string]
sidebar_position: 2           # 文档排序，[number]
sidebar_label: xxx            # 文该档在侧边栏中显示的文本,[string]
pagination_label: xxx         # 文档在上一篇/下一篇按钮中显示的文本,[string]

slug: /bonjour                # 文档url,默认为文件路径/docs/guide/hello，将其URL改为/docs/bonjour
id:xxx                        # 文档的唯一 ID,默认值:文件路径（包括文件夹,不含扩展名）,[string]
pagination_prev: xxx          #「上篇文档」按钮链接到的文档 ID。
pagination_next：xxx          # 「下篇文档」按钮链接到的文档 ID, [string | null]
......
---

xxx 文档内容
xxxxxxx。文档正文
xxxxxxxxxx
```

###### [博客 Metadata fields](https://docusaurus.io/zh-CN/docs/api/plugins/@docusaurus/plugin-content-blog#path)

```Markdown
<!-- 示例： -->

---
title: Welcome Docusaurus v2
description: This is my first post on Docusaurus 2.
slug: welcome-docusaurus-v2
date: 2021-09-13T10:00
authors:
  - name: Joel Marcey
    title: Co-creator of Docusaurus 1
    url: https://github.com/JoelMarcey
    image_url: https://github.com/JoelMarcey.png
  - name: Sébastien Lorber
    title: Docusaurus maintainer
    url: https://sebastienlorber.com
    image_url: https://github.com/slorber.png
tags: [hello, docusaurus-v2]
image: https://i.imgur.com/mErPwqL.png
hide_table_of_contents: false
---


# Welcome to this blog. 
正文 xxxxxxxx
```

##### 翻译 - 使用 Crowdin

https://docusaurus.io/zh-CN/docs/i18n/crowdin#upload-the-sources

流程：上传Crowdin - 翻译 - 从Crowdin下载

1. 安装Crowdin CLI ：
   1. 安装：`yarn add @crowdin/cli@3`
   2. 测试是否可以运行Crowdin CLI：`yarn crowdin --version`
2. 上传所有 JSON 和 Markdown 翻译文件：
   1. 在项目中运行  `yarn crowdin upload`
3. Crowdin界面中对项目文件内容进行翻译调整（例图：）
4. 下载翻译好的 JSON 和 Markdown文件： `yarn crowdin download`





##### Navbar items类型： 

1.  doc : 用于添加文档链接，当用户点击链接时，将跳转到您的文档页面。 
2.  dropdown : 用于创建下拉列表，下拉列表中可以包含多个链接。 
3.  external : 用于添加外部链接，当用户点击链接时，将跳转到指定的外部网站。 
4.  localeDropdown : 用于多语言站点的Dropdown，下拉列表中会展示所有支持的语言选项。 
5.  search : 用于添加搜索框，用户可以在搜索框中输入关键字来搜索您网站的内容。

