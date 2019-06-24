'use strict'
import { Dimensions, PixelRatio } from 'react-native';

var adap = {
  uiWidth: 3840,//这里的值，是设计稿中的宽度，你们根据自己的设计稿改动，本人拿到的设计稿是iphone6的
  uiHeight: 2160,//这里的值，是设计稿中的高度，你们根据自己的设计稿改动，本人拿到的设计稿是iphone6的
  pixel: 1 / PixelRatio.get(),
  screenWidth: Dimensions.get('window').width,
  screenHeith: Dimensions.get('window').height,
  pixelRatio: PixelRatio.get(),
  fontScale: PixelRatio.getFontScale(),
  scale: Math.min(Dimensions.get('window').height / 2160, Dimensions.get('window').width / 3840),

  /*宽度适配，例如我的设计稿某个样式宽度是50pt，那么使用就是：utils.autoWidth(50)*/
  w: function (value) {
    return Dimensions.get('window').width * value / this.uiWidth;
  },
  /*高度适配，例如我的设计稿某个样式高度是50pt，那么使用就是：utils.autoheight(50)*/
  h: function (value) {
    return Dimensions.get('window').height * value / this.uiHeight;
  },
  get: function (url, successCallback, failCallback) {
    fetch(url).then((response) => response.text())
      .then((responseText) => {
        successCallback(JSON.parse(responseText));
      }).catch(function (err) {
        failCallback(err);
      });
  },
  /*字体大小适配，例如我的设计稿字体大小是17pt，那么使用就是：utils.setSpText(17)*/
  font: function (number) {
    number = Math.round((number * this.scale + 0.5) * this.pixelRatio / this.fontScale);
    return number / PixelRatio.get();
  },
  /*通过value删除数组元素*/
  removeByValue: function (arr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      }
    }
  },
  /*判断是否存在数组*/
  isInArray: function (arr, value) {
    let i = arr.length;
    while (i--) {
      if (arr[i] === value) {
        return true
      }
    }
  }
};

export default adap;
