import * as d3 from 'd3'
import $ from 'jquery'
import './sankeyExtend.js'
import emitter from './events'
import { mergeArray, textSpillover, isIdExistence } from './util'
import { prominPathTpl, tooltipLineTpl, tooltipNodeTpl } from './template'

/* eslint-disable */
let _config = {} // CONST
let _sankeyObj = {} // D3Object

let D3UserPath = {
  /**
   * 初始化
   */
  init (opt) {
    _config = opt
    // 新容器
    _sankeyObj.sankeyContainer = $(`#${_config.id}`)
    // 图表
    _sankeyObj.sankeyContainer_ = $(`#${_config.id}-chart`)
    // 清空
    _sankeyObj.sankeyContainer.html('')
    // 插入dom
    this.insertEleHandle()

    // 无数据状态
    if (JSON.stringify(opt.data) === "{}") {
      $(`#${_config.id}-chart`).html('<div class="no-data">无数据</div>')
      return
    }

    // 起始事件
    _sankeyObj.inputTargetType_ = _config.targetEvent === 'start' ? 'initial_event' : 'termination_event'
    _sankeyObj.originalGraphData_ = {}
    _sankeyObj.MAX_LAYERS = 0
    _sankeyObj.flag = false
    _sankeyObj.isMenuShow = false
    _sankeyObj.paramObj_ = {
      source_type: _sankeyObj.inputTargetType_ // 开始 要对应btn上的data-value
    }
    _sankeyObj.originalGraphData_ = _config.data
    _sankeyObj.originalGraphData_.links.forEach(function (e) {
      for (var t = 0; t < e.length; t++) {
        if (e[t].is_wastage === true) {
          var n = e[t]
          e[t] = e[e.length - 1],
          e[e.length - 1] = n
        }
      }
    })
    _sankeyObj.MAX_LAYERS = _sankeyObj.originalGraphData_.nodes.length

    // 默认长度
    _sankeyObj.currentLayer = _sankeyObj.MAX_LAYERS > _config.defaultLayers ? _config.defaultLayers : _sankeyObj.MAX_LAYERS

    // 初始化桑吉图 { 路径线条处理 }
    this.initSankey(this.formatSankeyData(_sankeyObj.currentLayer))

    // 翻页处理
    this.renderLayerControl()

    // 事件处理
    this.initSankeyEvents()
  },

  /**
   * dom元素初始化处理
   */
  insertEleHandle () {
    let style = _config.pageOperate.lineStyle;
    let layerContainer = `<div id="layer-control" class="layer-control"></div>`
    let chartContainer = `<div id="${_config.id}-chart" style="overflow-x: scroll;cursor: grab;" class="scrollbar"></div>`
    let str = `<div class='sankey-model ${_config.className}'>${chartContainer + (_config.pageOperate.show ? layerContainer : '')}</div>`
    _sankeyObj.sankeyContainer.append(str)
  },

  /**
   * 数据处理
   */
  formatSankeyData (currentLayer) {
    let sankeyData = {
      nodes: [],
      links: []
    }
    if (!currentLayer || currentLayer > _sankeyObj.originalGraphData_.nodes.length) {
      currentLayer = _sankeyObj.originalGraphData_.nodes.length
      _sankeyObj.MAX_LAYERS = _sankeyObj.originalGraphData_.nodes.length
    }
    let boxWidth = 130 * (currentLayer - 1) + 130 * currentLayer
    let chartW = _sankeyObj.sankeyContainer.width()
    _config.screen.width = chartW > boxWidth ? chartW - 10 : boxWidth

    let num
    let atomData = _sankeyObj.originalGraphData_
    let nodeMap = {}

    switch (_sankeyObj.paramObj_.source_type) {
      case 'initial_event':
        for (num = 0; currentLayer - 1 > num; num++) {
          sankeyData.nodes = sankeyData.nodes.concat(atomData.nodes[num])
          sankeyData.links = sankeyData.links.concat(atomData.links[num])
        }
        sankeyData.nodes = sankeyData.nodes.concat(atomData.nodes[num])
        if (sankeyData.nodes.length === 1) {
          sankeyData.links = sankeyData.links.concat(atomData.links[0])
        }
        break
      case 'termination_event':
        var r = atomData.nodes.length
        for (num = r - currentLayer; r - 1 > num; num++) {
          sankeyData.nodes = sankeyData.nodes.concat(atomData.nodes[num])
          sankeyData.links = sankeyData.links.concat(atomData.links[num])
        }
        sankeyData.nodes = sankeyData.nodes.concat(atomData.nodes[r - 1])
        if (sankeyData.links.length === 0) {
          sankeyData.links.push({
            isStart: true,
            source: '1_start',
            target: sankeyData.nodes[0].id,
            times: sankeyData.nodes[0].value
          })
        }
    }
    sankeyData.nodes.forEach(function (v) {
      nodeMap[v.id] = v
      v.event_cname = v.event_name === 'more' ? '更多' : v.event_name || '未知'
    })
    sankeyData.links = sankeyData.links.map(function (v) {
      var item = {
        source: nodeMap[v.source],
        target: nodeMap[v.target],
        value: v.times
      }
      return v.hasOwnProperty('is_wastage') && v.is_wastage === true ? (item.is_wastage = true,
      nodeMap[v.source].waste = v.times) : v.hasOwnProperty('isStart') ? v.hasOwnProperty('isStart') && (item.is_wastage = false,
      item.isStart = true) : (item.is_wastage = false,
      nodeMap[v.source].waste = 0),
      item
    })

    return sankeyData
  },

  /**
   * 初始化桑吉图
   */
  initSankey (data) {
    // 数据
    let pathData = data
    // 边距
    let screenM = _config.screen.margin
    // 图表宽度
    let screenW = _config.screen.width - screenM.left - screenM.right
    // 图表高度
    let screenH = _config.screen.height - screenM.top - screenM.bottom
    // 图表定义岂止类型与传参不一样
    let targetType = _sankeyObj.inputTargetType_ === 'initial_event' ? 'ltr' : 'rtl'

    let d3Chart = d3.select(`#${_config.id}-chart`).append('svg')
      .attr('width', screenW + screenM.left + screenM.right)
      .attr('height', screenH + screenM.top + screenM.bottom).append('g')
      .attr('transform', 'translate(' + screenM.left + ',' + screenM.top + ')')
      .attr('id', 'g1')

    let chartLine = d3Chart.append('defs').append('linearGradient')
      .attr('id', 'gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad')
      .attr('gradientUnits', 'objectBoundingBox')

    chartLine.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', _config.color.node_color[0])
      .attr('stop-opacity', 1),
    chartLine.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', _config.color.node_color[1])
      .attr('stop-opacity', 1)

    let chartLoss = d3Chart.append('defs').append('linearGradient')
      .attr('id', 'waste_gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad')
      .attr('gradientUnits', 'objectBoundingBox')

    // todo 流失颜色
    chartLoss.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', _config.color.link_start_wastage[0])
      .attr('stop-opacity', 1),
    chartLoss.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', _config.color.link_start_wastage[1])
      .attr('stop-opacity', 1)

    let chartGradient = d3Chart.append('defs').append('linearGradient')
      .attr('id', 'start_gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad')
      .attr('gradientUnits', 'objectBoundingBox')

    chartGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', _config.color.link_end_wastage[0])
      .attr('stop-opacity', 1),
    chartGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', _config.color.link_end_wastage[1])
      .attr('stop-opacity', 1)

    let sankeyActiveData = d3.sankey()
      .nodeWidth(_config.domSize)
      .size([screenW, screenH])
      .graphType(targetType)

    sankeyActiveData.nodes(pathData.nodes).links(pathData.links).layout(20)

    let chartAll = d3Chart.append('g')
      .selectAll('.link')
      .data(pathData.links)
      .enter()
      .append('path')

    chartAll.attr('class', opt => {
      let rtText = ''
      if (opt.is_wastage) {
        rtText = 'link wastage'
      } else {
        if (opt.isStart) {
          rtText = 'link start'
        } else {
          rtText = 'link'
        }
      }
      return rtText
    })
      .attr('d', sankeyActiveData.link())
      .attr('link-id', function (opt, optc) {
        return opt.id = optc, 'link-' + optc
      }).style('stroke-width', function (opt) {
        return opt.hasOwnProperty('is_wastage') && opt.is_wastage === true ? Math.min(Math.max(5, opt.dy / 8), 10) : opt.hasOwnProperty('isStart') && opt.isStart === true ? Math.min(Math.max(5, opt.dy / 8), 10) : void 0
      }).style('stroke', function (opt) {
        return opt.hasOwnProperty('is_wastage') && opt.is_wastage === true ? 'url(#waste_gradient)' : opt.hasOwnProperty('isStart') && opt.isStart === true ? 'url(#start_gradient)' : void 0
      }).sort(function (opt, optc) {
        return optc.dy - opt.dy
      })

    var chartBox = d3Chart
      .append('g')
      .selectAll('.node')
      .data(pathData.nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('data-id', function (opt) {
        return opt.event_name
      })
      .attr('transform', function (opt) {
        return 'translate(' + opt.x + ',' + opt.y + ')'
      })
      .sort(function (opt, optc) {
        return optc.dy - opt.dy
      })

    chartBox.append('rect').attr('height', function (opt) {
      return Math.max(opt.dy / 2, 1)
    }).attr('width', sankeyActiveData.nodeWidth()).style('fill', function () {
      return 'url(#gradient)'
    }).attr('rx', 2).attr('ry', 2).attr('data-id', function (opt) {
      return opt.id
    }).attr('data-cname', function (opt) {
      return opt.event_cname
    }).style('transform', function (opt) {
      return 'translate(0,' + opt.dy / 2 + ')'
    }).style('stroke', function () {
      // todo 节点边框
      return _config.color.link_end_wastage
    }),

    chartBox.append('text')
      .attr('x', '12px')
      .attr('y', '12px')
      .attr('dy', '.35em')
      .text(function (opt) {
      return opt.event_cname
    })
      .style('font-weight', '400')
      .each(function () {
        return textSpillover(this)
      }),

    chartBox.append('text')
      .attr('x', '12px')
      .attr('y', function (opt) {
      return opt.by_values ? '2.5em' : '2em'
    })
      .text(function (opt) {
      return opt.by_values
    })
      .style('font-size', '13px')
      .style('fill', 'rgba(0,0,0,0.54)')
      .each(function () {
        return textSpillover(this)
      }),

    // todo 节点文字
    chartBox.append('text')
      .attr('x', '12px')
      .attr('y', function (opt) {
        return opt.by_values ? '3.5em' : '2em'
      }).attr('dy', '.35em').text(function (opt) {
        return opt.value
      })

    // 高度计算
    let _svgBox = document.getElementById('g1').getBBox()
    let _svgHeight = parseInt(_svgBox.height)
    $(`#${_config.id}-chart`).find('svg').attr('height', (_svgHeight + 140))
  },

  /**
   * 翻页处理
   */
  renderLayerControl () {
    let $self = _sankeyObj
    let $layerControl = $('#layer-control')
    let $source_type = _sankeyObj.paramObj_.source_type === 'initial_event'

    // 上一层下一层dom
    let btnHtml = (isInitial) => {
      let str = ``
      if (isInitial) {
        str += `<button type="button" class="btn" data-method="prev" style="display: inline">隐藏${_config.pageOperate.text[1]}</button>`
        str += `<button type="button" style="display: inline" class="btn" data-method="next">展开${_config.pageOperate.text[0]}</button>`
      } else {
        str += `<button type="button" style="display: inline" class="btn" data-method="next">展开${_config.pageOperate.text[1]}</button>`
        str += `<button type="button" class="btn" data-method="prev" style="display: inline">隐藏${_config.pageOperate.text[0]}</button>`
      }
      return str
    }

    let chartDom = $(`#${_config.id}-chart`)
    $layerControl.html(btnHtml($source_type))
    $layerControl.find('button[data-method="prev"]').attr('disabled', $self.currentLayer <= _config.defaultLayers)
    $layerControl.find('button[data-method="next"]').attr('disabled', $self.currentLayer === $self.MAX_LAYERS)
    $layerControl.find('button[data-method="prev"]').unbind('click.prev').bind('click.prev', () => {
      $layerControl.find('button[data-method="next"]').removeAttr('disabled')
      _sankeyObj.currentLayer = _sankeyObj.currentLayer - 1
      var n = document.body.scrollTop
      chartDom.html('')
      this.initSankey(this.formatSankeyData(_sankeyObj.currentLayer))
      this.initSankeyEvents()
      var a = _sankeyObj.inputTargetType_,
        s = _config.screen.width
      a === 'termination_event' && (s = -s)
      chartDom.scrollLeft(s)
      $(window).scrollTop(n)
      _sankeyObj.currentLayer === _config.defaultLayers && $('button[data-method="prev"]').attr('disabled', true)
    })

    $layerControl.find('button[data-method="next"]').unbind('click.next').bind('click.next', (e) => {
      $layerControl.find('button[data-method="prev"]').removeAttr('disabled')
      _sankeyObj.currentLayer = _sankeyObj.currentLayer + 1
      var n = document.body.scrollTop
      chartDom.html('')
      this.initSankey(this.formatSankeyData(_sankeyObj.currentLayer))
      this.initSankeyEvents()
      var a = _sankeyObj.inputTargetType_,
        s = _config.screen.width
      a === 'termination_event' && (s = -s)
      chartDom.scrollLeft(s)
      $(window).scrollTop(n)
      _sankeyObj.currentLayer === _sankeyObj.MAX_LAYERS && $('button[data-method="next"]').attr('disabled', true)
    })
  },

  /**
   * 事件处理
   */
  initSankeyEvents () {
    let t = _sankeyObj
    let n = d3.select(`#${_config.id}-chart`).append('div').attr('class', 'd3-node-tooltip').style('z-index', 1e3).style('display', 'none')
    let a = d3.select(`#${_config.id}-chart`).append('div').attr('class', 'd3-link-tooltip').style('z-index', 1e3).style('display', 'none')
    let s = d3.select(`#${_config.id}-chart`).append('div').attr('class', 'd3-context-menu').style('z-index', 1200).style('display', 'none')

    let ckProtrudingNode = function (e) {
      let self = this
      let d3RectList = d3.selectAll('rect')
      d3.selectAll('.link')

        // .style('stroke', _config.color.link_light_color)
        // .style('fill', _config.color.link_light_color)
        // .style('stroke-opacity', _config.opacity.midStrokeOpacity)
        // .style('fill-opacity', _config.opacity.midStrokeOpacity)

      let s = []
      let i = []
      let l = _config.opacity.transStrokeOpacity
      let d = _config.opacity.transStrokeOpacity
      let c = null

      if (d3.select(self).attr('data-clicked') === '1') {
        t.flag = false,
        d3.select(self).attr('data-clicked', '0'),
        c = _config.color.link_light_color,
        d = _config.opacity.midStrokeOpacity,
        l = _config.opacity.darkStrokeOpacity,

        d3RectList.filter(function () {
          return self !== this
        }).transition().style('opacity', function (e) {
          return $('[data-id="' + e.id + '"]').siblings().css('opacity', _config.opacity.darkStrokeOpacity),
          _config.opacity.darkStrokeOpacity
        })
      } else {
        d3.select(self).attr('data-clicked', '1'),
        t.flag = true,
        c = _config.color.link_dark_color,
        d = _config.opacity.midStrokeOpacity,
        l = _config.opacity.darkStrokeOpacity,
        d3RectList.filter(function () {
          return self !== this
        }).transition().style('opacity', function (e) {
          return $('[data-id="' + e.id + '"]').siblings().css('opacity', _config.opacity.lightStrokeOpacity),
          _config.opacity.lightStrokeOpacity
        })
      }

      d3.selectAll('g.node').filter(function () {
        return self !== this
      }).attr('data-clicked', null),
      o(e.id, l)

      var p = [{linkType: 'sourceLinks', nodeType: 'target'}, {linkType: 'targetLinks',nodeType: 'source'}],
        h = []
      p.forEach(function (n) {
        for (e[n.linkType].forEach(function (e) {
          s = mergeArray(s, [e[n.nodeType]]),
          o(e[n.nodeType].id, l),
          d3.select('[link-id="link-' + e.id + '"]').transition()
            .style('stroke-opacity', d)
            .style('stroke', c)
            .style('fill-opacity', d)
            .style('fill', c),
          h.push(e.id)
        }); s.length;) {
          i = [],
          s.forEach(function (e) {
            e[n.linkType].forEach(function (e) {
              i = mergeArray(i, [e[n.nodeType]]),
              o(e[n.nodeType].id, l),
              h.push(e.id),
              d3.select('[link-id="link-' + e.id + '"]').transition()
                .style('stroke-opacity', d)
                .style('stroke', c)
                .style('fill-opacity', d)
                .style('fill', c)
            })
          }),
          s = i
        }
      }),
      t.flag ? d3.selectAll('.link').filter(function (e) {
        return !isIdExistence(h, e.id)
      }).transition().style('stroke-opacity', function () {
        return _config.opacity.lightStrokeOpacity
      }).style('fill-opacity', function () {
        return _config.opacity.lightStrokeOpacity
      }) : d3.selectAll('.link').filter(function (e) {
        return !isIdExistence(h, e.id)
      }).transition().style('stroke-opacity', function () {
        return _config.opacity.midStrokeOpacity
      }).style('fill-opacity', function () {
        return _config.opacity.midStrokeOpacity
      })
    }

    let o = function (dataId, val) {
      d3.select('[data-id="' + dataId + '"]').transition().style('opacity', val),
      $('[data-id="' + dataId + '"]').siblings().css('opacity', val)
    }

    let gLink = d3.selectAll('.link')
    let gNode = d3.selectAll('g.node')

    let c = function (e, n) {
      s.selectAll('div[data-method]').on('click', function () {
        var a = $(this).attr('data-method')
        switch (a) {
          case 'toggle-current-path':
            ckProtrudingNode.apply(n, [e])
            break
          case 'cancel-current-path':
            t.flag = false,
            d3.selectAll('rect').transition().style('opacity', function (e) {
              return $('[data-id="' + e.id + '"]').siblings().animate({
                opacity: _config.opacity.darkStrokeOpacity
              }),
              _config.opacity.darkStrokeOpacity
            }),
            d3.selectAll('.link').transition()
              .style('stroke-opacity', _config.opacity.midStrokeOpacity)
              .style('fill-opacity', _config.opacity.midStrokeOpacity)
              .style('stroke', _config.color.link_light_color)
              .style('fill', _config.color.link_light_color),

            d3.selectAll('g.node').attr('data-clicked', null)
            break
          case 'detail':
            // $("#trigger-default").trigger("click",[e]);
            emitter.emit('node-details', [e])
            break
          case 'more':
        }
        s.style('display', 'none'),
        t.isMenuShow = false
      })
    }

    gNode.on('click', function (e) {

      //todo 突显路径隐藏
      if (!_config.node.promPath.show) {
        return
      }

      var pageX = d3.event.pageX,
        pageY = d3.event.pageY
      n.style('display', 'none')
      var i = $(this).data('id') === 'more',
        o = $(this).attr('data-clicked') === '1'
      s.html(prominPathTpl(i, o,_config))
        .style('left', pageX + 'px')
        .style('top', pageY + 20 + 'px')
        .style('display', 'block'),
      t.isMenuShow = true,
      c(e, this)
    }),

    gLink.on('mouseover', function (e) {

      // todo 隐藏节点
      if (!_config.line.tooltip.show) {
        return
      }

      var n = parseFloat(d3.select(this).style('stroke-opacity')),
        s = d3.select(this).style('stroke')
      if (n !== _config.opacity.lightStrokeOpacity && !t.isMenuShow) {
        var pageX = d3.event.pageX,
          pageY = d3.event.pageY
        e.percentage = e.isStart === true ? Math.round(e.value / e.target.value * 1e4) / 100 : Math.round(e.value / e.source.value * 1e4) / 100
        // todo 自定义返回模板结构
        a.html(_config.line.tooltip.formatter(e,_sankeyObj) || tooltipLineTpl(e,_sankeyObj))
          .style('left', pageX + 'px')
          .style('top', pageY + 20 + 'px')
          .style('display', 'block')
          .style('font-size', 10)
          .style('box-shadow', 'box-shadow: 0px 0px 211px 111px rgba(0,0,0,0.7)')
      }
    }).on('mousemove', function () {
      var e = d3.event.pageX,
        n = d3.event.pageY,
        s = t.sankeyContainer_.find('div.d3-link-tooltip')
      e + s.width() > $(window).scrollLeft() + $(window).width() && (e -= s.width()),
      a.style('left', e + 'px').style('top', n + 20 + 'px')
    }).on('mouseout', function () {
      a.style('display', 'none')
    }),
    gNode.on('mouseover', function (e) {

      // todo 隐藏节点
      if (!_config.node.tooltip.show) {
        return
      }

      e.sourceLinks.length === 0 ? e.isEnd = true : (e.remain = e.value - e.waste,
      e.wastage_percent = Math.round(e.waste / e.value * 1e4) / 100,
      e.remain_percent = Math.round(e.remain / e.value * 1e4) / 100)
      var a = parseFloat(d3.select('[data-id="' + e.id + '"]').style('opacity'))
      a === _config.opacity.lightStrokeOpacity || t.isMenuShow || (e.isInitialEvent = t.paramObj_.source_type === 'initial_event',
        // todo 自定义返回模板结构
        n.html(_config.node.tooltip.formatter(e,_sankeyObj) || tooltipNodeTpl(e,_sankeyObj))
        .style('left', d3.event.pageX + 'px')
        .style('top', d3.event.pageY + 20 + 'px')
        .style('display', 'block')
        .style('font-size', 10)
        .style('box-shadow', 'box-shadow: 0px 0px 211px 111px rgba(0,0,0,0.7)'))
    }).on('mousemove', function () {
      var e = d3.event.pageX,
        a = d3.event.pageY,
        s = t.sankeyContainer_.find('div.d3-node-tooltip')
      e + s.width() > $(window).scrollLeft() + $(window).width() && (e -= s.width()),
      n.style('left', e + 'px').style('top', a + 20 + 'px')
    }).on('mouseout', function () {
      n.style('display', 'none')
    })
  },

}

export default D3UserPath
