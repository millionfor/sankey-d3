
/**
 * 点击弹出层高亮菜单选项
 */
const prominPathTpl = (more, clicked, config) => {
  let str = ''
  let promPath = config.node.promPath
  if (!clicked) {
    str += `<div data-method="toggle-current-path">${promPath.text[0]}</div>`
  } else {
    str += `<div data-method="cancel-current-path">${promPath.text[1]}</div>`
  }
  if (config.node.details.show) {
    str += `<div data-method="detail">${config.node.details.text}</div>`
  }
  return str
}

/**
 * 流失tip
 */
const tooltipLineTpl = (e, sankeyObj) => {
  let str = ''
  str += `<span style="color:rgba(0,0,0,0.87);">${e.source.event_cname}</span>`
  str += `<span style="color:rgba(0,0,0,0.87);"> 到 </span>`
  str += `<span style="color:rgba(0,0,0,0.87);">${e.target.event_cname}</span>`
  str += `<div class="link-detail" style="border-top:1px solid #e3e3e3;padding-top: 5px;">`
  str += `<span style="color:#00b279;">( ${e.value} 会话数 )</span><br>`
  str += `<span style="color:rgba(0,0,0,0.87);">总流量的 ${e.percentage} %</span>`
  str += `</div>`
  return str
}

/**
 * 节点tip
 */
const tooltipNodeTpl = (e, sankeyObj) => {
  let str = ''
  str += `<span style="color:rgba(0,0,0,0.87);">${e.event_cname}</span>`
  str += `<br>`
  if (e.by_values) {
    str += `<span style="color:rgba(0,0,0,0.38);">${e.by_name} : </span>`
    str += `<span style="color: rgba(0,0,0,0.38)">${e.by_values}</span>`
    str += `<br>`
  } else {
    str += `<span style="color:#00b279;">( ${e.value} 会话数 )</span>`
  }
  if (!e.isEnd) {
    str += `<div class="node-detail" style="border-top:1px solid #e3e3e3;padding-top: 7px;">`
    str += `<ul>`
    str += `<li class="remain">`
    str += `<span>${e.remain} 留存量 ( ${e.remain_percent} % )</span>`
    str += `</li>`
    if (sankeyObj.inputTargetType_ === 'initial_event') {
      str += `<li class="lost">`
      str += `<span>${e.waste} 流失量 ( ${e.wastage_percent} % )</span>`
      str += `</li>`
    }
    str += `</ul>`
    str += `</div>`
  }
  return str
}

/**
 *
 */

export {
  prominPathTpl,
  tooltipLineTpl,
  tooltipNodeTpl
}
