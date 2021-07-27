
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