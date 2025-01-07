# Cell cell

List items can form a list.

## Introduction

```tsx
import { Cell } from '@nutui/nutui-react'
```

## Sample code

### Basic usage

:::demo

<CodeBlock src='h5/demo1.tsx'></CodeBlock>

:::

### Custom content

:::demo

<CodeBlock src='h5/demo2.tsx'></CodeBlock>

:::

### Volume Crystal Lake County

:::demo

<CodeBlock src='h5/demo22.tsx'></CodeBlock>

:::

### Custom title area

:::demo

<CodeBlock src='h5/demo3.tsx'></CodeBlock>

:::

### Customize the right area

:::demo

<CodeBlock src='h5/demo4.tsx'></CodeBlock>

:::

### Vertically centered

The left and right contents of the Cell can be vertically centered through the `align` attribute.

:::demo

<CodeBlock src='h5/demo5.tsx'></CodeBlock>

:::

### Link | Group Usage

Use `nut-cell-group` to support `title` and `description`

:::demo

<CodeBlock src='h5/demo6.tsx'></CodeBlock>

:::

### Group usage

You can use the `divider` attribute to prevent the bottom lines between cells from displaying.

:::demo

<CodeBlock src='h5/demo7.tsx'></CodeBlock>

:::

## Cell.Group

### Props

| Properties | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | Group title | `ReactNode` | `-` |
| description | Group description | `ReactNode` | `-` |
| divider | Whether there is a dividing line between cells | `boolean` | `true` |

## Cell

### Props

| Properties | Description | Type | Default Value |
| --- | --- | --- | --- |
| title | title | `ReactNode` | `-` |
| description | description | `ReactNode` | `-` |
| extra | Description on the right | `ReactNode` | `-` |
| radius | corner radius | `string` | `6px` |
| align | Alignment along the vertical axis | `flex-start` \| `center` \| `flex-end` | `flex-start` |
| clickable | click style feedback | `boolean` | `false` |
| onClick | Click event | `onClick: (event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void` | `false` |

## Theme customization

### Style variables

The component provides the following CSS variables, which can be used to customize styles. For usage methods, please refer to [ConfigProvider component](#/zh-CN/component/configprovider).

| name | description | default value |
| --- | --- | --- |
| \--nutui-cell-title-color | Cell title font color | `$color-title` |
| \--nutui-cell-title-font-size | Cell title font size | `$font-size-base` |
| \--nutui-cell-description-color | Cell description font color | `$color-text` |
| \--nutui-cell-description-font-size | Cell description font size | `$font-size-s` |
| \--nutui-cell-extra-color | The font color described on the right side of the cell | `$color-text` |
| \--nutui-cell-extra-font-size | Description font size on the right side of the cell | `$font-size-base` |
| \--nutui-cell-border-radius | Cell fillet size | `6px` |
| \--nutui-cell-padding | Cell padding | `13px 16px` |
| \--nutui-cell-line-height | Cell line height | `20px` |
| \--nutui-cell-divider-left | Cell dividing line left margin | `16px` |
| \--nutui-cell-divider-right | Right margin of cell dividing line | `16px` |
| \--nutui-cell-divider-border-bottom | Cell divider line bottom border | `1px solid #f5f6f7` |
| \--nutui-cell-background-color | Cell background color | `$white` |
| \--nutui-cell-box-shadow | Cell shadow | `0px 1px 7px 0px rgba(237, 238, 241, 1)` |
| \--nutui-cell-group-title-padding | Title padding of cell group | `0 10px` |
| \--nutui-cell-group-title-color | The title font color of the cell group | `#909ca4` |
| \--nutui-cell-group-title-font-size | The title font size of the cell group | `$font-size-base` |
| \--nutui-cell-group-title-line-height | The title line height of the cell group | `20px` |
| \--nutui-cell-group-description-padding | Description padding of cell group | `0 10px` |
| \--nutui-cell-group-description-color | Description color of cell group | `#909ca4` |
| \--nutui-cell-group-description-font-size | Description font size of cell group | `$font-size-s` |
| \--nutui-cell-group-description-line-height | Description line height of cell group | `16px` |
| \--nutui-cell-group-background-color | Background color of cell group | `$white` |
| \--nutui-cell-group-wrap-margin | The margin of the cell group container | `10px` |
