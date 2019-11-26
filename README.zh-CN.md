[English](./README.md) | [中文](./README.zh-CN.md)


react-font-svg
===

使用`react-font-svg`转换字体文件到`react`/`react-native`的`Icon`组件.

支持转化的字体格式:

- ttf
- woff/woff2
- otf
- eot

# 使用

```javascript
npm install -g react-font-svg
react-font-svg ./src/icons/fontawesome-webfont.ttf -d ./src/icons
```
生成的`Icon.js`，包含所有图标的svg字形(默认为`react-native`代码)，可以用在`react`/`react-native`项目中：


```javascript
/**
 * @file Icon.js
 * @author 
 */

import React from "react";
import Svg, {Path} from 'react-native-svg';

// icon glyphs
const glyphs = {
    'glass':'M1699 -198 q0 -23 -18 -36.5 q-18 -13.5 -38 -17.5 q-20 -4 -43 -4 l-1408 0 q-23 0 -43 4 q-20 4 -38 17.5 q-18 13.5 -18 36.5 q0 35 43 78 l632 632 l0 768 l-320 0 q-26 0 -45 19 q-19 19 -19 45 q0 26 19 45 q19 19 45 19 l896 0 q26 0 45 -19 q19 -19 19 -45 q0 -26 -19 -45 q-19 -19 -45 -19 l-320 0 l0 -768 l632 -632 q43 -43 43 -78 Z', 
    'ok':'M1643 178 l-136 -136 q-28 -28 -68 -28 q-40 0 -68 28 l-656 657 l-294 -295 q-28 -28 -68 -28 q-40 0 -68 28 l-136 136 q-28 28 -28 68 q0 40 28 68 l362 362 l136 136 q28 28 68 28 q40 0 68 -28 l136 -136 l724 -724 q28 -28 28 -68 q0 -40 -28 -68 Z' 
};

const Icon = props => (
    <Svg width={props.width || 120} height={props.height || 120} viewBox={props.viewBox || "0 -256 1792 1792"}>
        <Path fill={props.color || '#000'} d={glyphs[props.name] || ''}></Path>
    </Svg>
);

export default Icon;
```

引用使用方式：

```javascript
import React from 'react';
import Icon from './icons/Icon';

export default class App extends React.Component {
    render() {
        return (
            <>
            <Icon name="glass" color="#000" width="100" height="100" viewBox="0 0 1024 1024"/>
            <Icon name="ok" color="#000"/>
            </>
        );
    }
}

```


# Api方式使用

```javascript
const reactFontSvgConverter = require('react-font-svg');

const iconTexts = reactFontSvgConverter(
    './font/iconfont.ttf',
    {
        names: ['music', 'search'],
        unicodes: [0xf001, 0xf002],
        platform: 'react-native'
    });
// output
// {Icon: ''}
```

# 注意

- React Native 项目需要安装并引入 [`react-native-svg`](https://github.com/react-native-community/react-native-svg) 模块。
- `otf`、`woff`字体格式在某些情况下转换会报错，需要先转成`ttf`字体格式再进行转换。

# 选项

`rn-font-svg -h`

```
Usage
    $ rn-font-svg <file> [<output>]

  Example
    $ rn-font-svg ./src/font.ttf
    $ rn-font-svg ./src/font.ttf -n 'music,search' -u '0xf00d,0xf00e' -d ./src/icons


  Options,
    -n, --names                         glyph names to output eg. -n music,search
    -u, --unicodes                      unicode code points to output eg. -u 0xe001,0xe002
    -d, --dest                          output folder
    -p, --platform                      component template: react-native|react
```

# 相关链接

[FontEditor](https://github.com/ecomfe/fonteditor)

[fonteditor-core](https://github.com/kekee000/fonteditor-core)