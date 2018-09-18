# model-request-cascader

> 模特要求级联选择器

## Usage
```pug
model-request-cascader(@request="showRequest")
```

## Events
```js
/**
 * 显示要求
 * @function [showRequest]
 * @param {Array} request
 */
showRequest (request) => {
  console.log(request)
}
```