import * as d3 from 'd3'
/**
 * 桑吉图工具内方法
 */
const mergeArray = (arr, ctArr) => {
  for (var merArr = arr.concat(ctArr), legpncr = 0; legpncr < merArr.length; ++legpncr) {
    for (var legnumde = legpncr + 1; legnumde < merArr.length; ++legnumde) {
      merArr[legpncr].id === merArr[legnumde].id && merArr.splice(legnumde--, 1)
    }
  }
  return merArr
}

/**
 * 文本溢出处理
 */
const textSpillover = (e) => {
  for (let sankeyThis = d3.select(e), sankeyDp = sankeyThis.node().getComputedTextLength(), fnTextSpillover = sankeyThis.text(); sankeyDp > 100 && fnTextSpillover.length > 0;) { // eslint-disable-line
    fnTextSpillover = fnTextSpillover.slice(0, -1), // eslint-disable-line
    sankeyThis.text(fnTextSpillover + '...'), // eslint-disable-line
    sankeyDp = sankeyThis.node().getComputedTextLength() // eslint-disable-line
  }
}

/**
 * 遍历路径id是否存在
 */
const isIdExistence = (option, id) => {
  if (option.size === 0) return false
  let flag = false
  option.forEach((v) => {
    if (v === id) {
      flag = true
    }
  })
  return flag
}

export {
  mergeArray,
  textSpillover,
  isIdExistence
}
