## BFC


##### **什么是BFC**

(*Block Formatting Context*)块级格式化上下文



BFC是CSS中的一个渲染机制，就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干。

简单来说，BFC 实际上是一块区域，在这块区域中遵循一定的规则，有一套独特的渲染规则。



##### **触发BFC的条件**

+ 根元素或其它包含它的元素

+ 浮动元素 (元素的 `float` 不是 `none`)

+ 绝对定位元素 (元素具有 `position` 为 `absolute` 或 `fixed`)

+ 内联块 (元素具有 `display: inline-block`)

+ 表格单元格 (元素具有 `display: table-cell`，HTML表格单元格默认属性)

+ 表格标题 (元素具有 `display: table-caption`, HTML表格标题默认属性)

+ 具有`overflow` 且值不是 `visible` 的块元素

+ 弹性盒（`flex`或`inline-flex`）
+ display: flow-root
+ column-span: all



##### **BFC的约束规则**

+ 内部的盒会在垂直方向一个接一个排列（可以看作BFC中有一个的常规流）

+ 处于同一个BFC中的元素相互影响，可能会发生外边距重叠

+ 每个元素的margin box的左边，与容器块border box的左边相接触(对于从左往右的格式化，否则相反)，即使存在浮动也是如此

+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

+ 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算

+ 浮动盒区域不叠加到BFC上



#####  **BFC可以解决的问题**

- 垂直外边距重叠问题，父元素设置overflow: hidden

  会有哪些现象 https://www.w3.org/TR/CSS2/box.html#collapsing-margins

- 去除浮动：父元素设置overflow: hidden触发BFC实现清除浮动，防止父元素高度塌陷，后面的元素被覆盖，实现文字环绕等等。

- 自适用两列布局（`float` + `overflow`）

MDN的解释  https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context