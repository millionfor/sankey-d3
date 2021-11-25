
export default {
  // id
  id: '',
  // 目标事件 start end
  targetEvent: '',
  // 路径数据
  data: [],
  // 顶层class
  className: '',
  // 节点
  node: {
    tooltip: {
      show: true,
      formatter (opt, sankeyObj) {
        return `<div>${opt} - 节点tip - ${sankeyObj}</div>`
      }
    },
    // 突显路径
    promPath: {
      show: true,
      text: ['突出通过该节点的路径1', '取消突出通过该节点的路径1']
    },
    // 节点详情
    details: {
      show: true,
      text: '查看节点详细信息1'
    }
  },
  // 线条
  line: {
    tooltip: {
      show: true,
      formatter (opt, sankeyObj) {
        return `<div>${opt} - 线条tip - ${sankeyObj}</div>`
      }
    }
  },
  // 上一页下一页按钮operate
  pageOperate: {
    show: true,
    text: ['下层', '上层']
  },
  // 节点宽度
  domSize: 160,
  // 初始化节点个数
  defaultLayers: 4,
  opacity: {
    transStrokeOpacity: 0,
    lightStrokeOpacity: 0.3,
    // 突显路径节点透明度
    darkStrokeOpacity: 1,
    // 突显路径透明度
    midStrokeOpacity: 0.8
  },
  color: {
    link_light_color: '#E1EBF7', // E1EBF7
    // 突显 || hover 路径颜色
    link_dark_color: '#BBCDE3',

    // 节点色系(渐变)
    node_color: ['#bfdcff', '#96bcea'],

    // 节点边框
    node_border: '#bfdcff',

    // 开始事件 流失颜色(渐变)
    link_start_wastage: ['#F9C6C6', '#fff'],

    // 结束事件 流失颜色(渐变)
    link_end_wastage: ['#A9E3D1', '#fff']

  },
  screen: {
    // 初始化图表宽度
    width: 1400,
    // 初始化图表高度
    height: 2000,
    // 图表间距
    margin: {
      top: 120,
      right: 120,
      bottom: 120,
      left: 120
    }
  }
}
