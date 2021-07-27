## CSS

## box-sizing

box-sizing 属性可以被用来调整这些表现:

- `content-box` 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。

- `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。


## line-clamp控制文本行数

**限制在一个块元素显示的文本的行数。**

-webkit-line-clamp 是一个 不规范的属性（unsupported WebKit property），它没有出现在 CSS 规范草案中。

为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：

- display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
- -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
- text-overflow，可以用来多行文本的情况下，用省略号“...”隐藏超出范围的文本 。

```css
.line-clamp {
                 display: -webkit-box;
                 -webkit-box-orient: vertical;
                 -webkit-line-clamp: 4;            /*设置p元素最大4行，父元素需填写宽度才明显*/
                 text-overflow: ellipsis;
                 overflow: hidden;
                 /* autoprefixer: off */
                 -webkit-box-orient: vertical;
                  /* autoprefixer: on */
                  /*因为代码环境的关系-webkit-box-orient被过滤掉了 autoprefixer 这个关键字可以免除被过滤的动作*/
　　　　　　　　　　word-wrap:break-word;
　　　　　　　　　　word-break:break-all;
}
```



如果你标签内的是英文，**英文是不会自动换行**的，所以你需要让他自动换行添加如下代码即可：

```css
word-wrap:break-word;
word-break:break-all;
```

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
