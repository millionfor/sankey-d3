/* eslint-disable no-unused-vars */

'use strict'

import $ from 'jquery'
import D3sankey from '@/index.js'
import { startData, endData } from '@/util/_data'
import emitter from '@/util/events'

/**
 * initial_event termination_event
 */

let btnStart = $('#start')
let btnEnd = $('#end')

let o = {
  // id
  id: 'sankeyD3-aaaaa',
  targetEvent: 'start',
  data: startData,
  className: '__className',
  pageOperate: {
    show: true,
    text: ['下11111层', '上2222层']
  }
}

new D3sankey(o)

btnStart.click(() => {
  btnStart.addClass('active')
  btnEnd.removeClass('active')
  o.targetEvent = 'start'
  o.data = startData

  new D3sankey(o)
})
btnEnd.click(() => {
  btnEnd.addClass('active')
  btnStart.removeClass('active')
  o.targetEvent = 'end'
  o.data = endData

  new D3sankey(o)
})


let nodeDetails = function (opt) {
  console.log(opt)
}

// 事件 点击节点详情
emitter.on('node-details', nodeDetails)

emitter.removeListener('node-details', nodeDetails)
