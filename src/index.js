
'use strict'

import './index.scss'
import _ from 'lodash'
import $ from 'jquery'
import D3UserPath from './util/sankey'
import config from './util/config'

const D3sankey = function () {
  this.init.apply(this, arguments)
}

D3sankey.prototype = {
  // 初始化
  init (opt) {
    D3UserPath.init($.extend(true, _.cloneDeep(config), _.cloneDeep(opt)))
  }
}

export default D3sankey
