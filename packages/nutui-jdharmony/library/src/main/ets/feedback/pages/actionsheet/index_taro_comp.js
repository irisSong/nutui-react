import { createNativePageConfig } from '@jd-oh/taro_library/src/main/ets/npm/@tarojs/plugin-framework-react/dist/runtime';
import '@jd-oh/taro_library/src/main/ets/npm/@tarojs/runtime';
import { jsx, Fragment } from '@jd-oh/taro_library/src/main/ets/npm/react/jsx-runtime';
import * as React from '@jd-oh/taro_library/src/main/ets/npm/react';
import ReactDOM from '@jd-oh/taro_library/src/main/ets/npm/@tarojs/react';

const component = /* @__PURE__ */jsx(Fragment, {});

var config = {
  "navigationBarTitleText": "ActionSheet"
};
const index = (function () {
  return createNativePageConfig(component, 'feedback/pages/actionsheet/index', React, ReactDOM, config);
});

export { config, index as default };
