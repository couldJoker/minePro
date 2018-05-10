"use strict";
import {
  Loading,
  Message
} from 'element-ui';

//请求loading
export const load = {
  l: null,
  openLoading: () => {
    load.l = Loading.service({
      lock: true,
      text: '请求中……',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    });
  },
  closeLoading: () => {
    load.l.close();
  }
}


/** 
 * 调用高德地图   根据关键字检索可选用的地址选项
 */
export function getAddressDetailed(val, name, callBackFunc) {
  let arr = [];
  //全国检索
  AMap.plugin("AMap.Autocomplete", function () {
    //回调函数
    //实例化Autocomplete
    var autoOptions = {
      city: name //城市，默认全国
    };
    let autocomplete = new AMap.Autocomplete(autoOptions);
    //TODO: 使用autocomplete对象调用相关功能
    autocomplete.search(val, function (status, result) {
      if (result && result.tips && result.tips.length > 0) {
        for (let i = 0; i < result.tips.length; i++) {
          if (
            typeof result.tips[i].location === "string" ||
            typeof result.tips[i].location === "undefined"
          ) {
            result.tips.splice(i, 1);
            i--;
          } else {
            if (typeof result.tips[i].district !== "string") {
              result.tips[i].district = "";
            }
            if (typeof result.tips[i].address !== "string") {
              result.tips[i].address = "";
            }
            if (typeof result.tips[i].name !== "string") {
              result.tips[i].name = "";
            }
          }
        }
        arr = result.tips;
        for (let i of arr) {
          i.adrinfo = `${i.location.lng},${i.location.lat}`;
        }
      }
      callBackFunc(arr);
    });
  });
}


/** 
 * 将选中的地址的经纬度等详细信息放入form中
 */
export function confirmAddressInfo(val, data, city) {
  for (let i of data) {
    if (val === `${i.district}${i.address}${i.name}`) {
      let obj = {
        lnglat: i.adrinfo,
        address: val,
        city: city
      };
      return obj;
    }
  }
}


/** 
 * 将地址转化为检索框所需的数据格式
 */
export function formatAddress(data) {
  let addr = data.map((item) => Object.assign({}, {
    value: `${item.district}${item.address}${item.name}`,
    label: `${item.district}${item.address}${item.name}`
  }));
  return addr;
}

/**
 * 表格数据排序
 */
export function dataSort(data, currentPage) {
  if (data instanceof Array) {
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i].fNum = (i + 1) + (currentPage - 1) * 50;
      }
      return data;
    }
  }
}



/**
 * form表单检验
 */
export function formCheck(obj, name) {
  let result = false;
  obj.$refs[name].validate((valid) => {
    if (valid) {
      result = true;
    } else {
      Message.warning('请完善信息!');
      result = false;
    }
  });
  return result;
}
/**
 * form表单清空
 */
export function resetForm(obj, formName) {
  obj.$refs[formName].resetFields();
}

/**
 * 去掉文本的前后空格
 */
export function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 日期格式化
 * Format(val,"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * Format(val,"yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
export function dateFormat(val, fmt) { //author: meizz
  val = new Date(val);
  if (!fmt) {
    //fmt = 'yyyy-MM-dd hh:mm:ss.S';
    fmt = 'yyyy-MM-dd hh:mm:ss';
  }
  let o = {
    "M+": val.getMonth() + 1, //月份
    "d+": val.getDate(), //日
    "h+": val.getHours(), //小时
    "m+": val.getMinutes(), //分
    "s+": val.getSeconds(), //秒
    "q+": Math.floor((val.getMonth() + 3) / 3), //季度
    "S": val.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (val.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return fmt;
}

/**
 * 深度复制 (有问题   暂时不要使用)
 */
export function deepClone(source) {
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepClone(source[item]) : source[item];
  }
  return sourceCopy;
}

/**
 * 数组求差值
 */
export function diff(arrA, arrB) {
  return arrA.filter(function (i) {
    return arrB.indexOf(i) < 0;
  });
};

/**
 * 基础递归
 */
export function recursion(val, key, data) {
  try {
    let result = null;
    for (let item of data) {
      if (typeof item === 'undefined' && typeof item !== 'object') {
        return result;
      }
      for (let k in item) {
        if (key === k) {
          if (item[k] === val) {
            result = item;
          }
        }
      }
      if (result) {
        return result;
      }
      if (typeof item.children !== 'undefined' && item.children) {
        result = recursion(val, key, item.children);
      }
    }
    return result;
  } catch (error) {

  }

}

/** 
 * 数组降维
 */
export const reduction = arr => arr.reduce((begin, current) => {
  Array.isArray(current) ?
    begin.push(...reduction(current)) :
    begin.push(current);
  return begin
}, [])

/** 
 * 复制对象并全部置空 ( 方法有待完善  )
 */
export function resetObjValue(data) {
  if(!data) {
    return null;
  }
  let source = data instanceof Array ? [] : {};
  for (let item in data) {
    source[item] = typeof data[item] === 'undefined' ? undefined : typeof data[item] === 'object' ? data[item] ?
      data[item] instanceof Date ? null : resetObj(data[item]) : null : initValue(typeof data[item]);
  }
  return source;
}

function initValue(type) {
  console.log('type', type)
  let str = null;
  switch (type) {
    case 'number':
      str = NaN;
      break;
    case 'string':
      str = '';
      break;
  }
  return str;
}


/** 
 * 首字母小写
*/

