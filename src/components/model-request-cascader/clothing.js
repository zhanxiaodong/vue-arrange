// 服装颜色
export const CLOTHING_COLOR = [
  {
    value: 'black',
    label: '黑色'
  },
  {
    value: 'white',
    label: '白色'
  },
  {
    value: 'red',
    label: '红色'
  },
  {
    value: 'yellow',
    label: '黄色'
  },
  {
    value: 'blue',
    label: '蓝色'
  },
  {
    value: 'green',
    label: '绿色'
  },
  {
    value: 'purple',
    label: '紫色'
  },
  {
    value: 'coffee',
    label: '咖啡色'
  },
  {
    value: 'orange',
    label: '橙色'
  }
]

export const CLOTHING = [
  {
    value: 'shoes',
    label: '鞋子',
    children: [
      {
        value: 'sports-shoes',
        label: '运动鞋',
        children: CLOTHING_COLOR
      },
      {
        value: 'sandals',
        label: '凉鞋',
        children: CLOTHING_COLOR
      },
      {
        value: 'princess-shoes',
        label: '公主鞋',
        children: CLOTHING_COLOR
      },
      {
        value: 'leather-shoes',
        label: '小皮鞋',
        children: CLOTHING_COLOR
      },
      {
        value: 'canvas-shoes',
        label: '帆布鞋',
        children: CLOTHING_COLOR
      },
      {
        value: 'snow-boots',
        label: '雪地靴',
        children: CLOTHING_COLOR
      },
      {
        value: 'martin-boots',
        label: '马丁靴',
        children: CLOTHING_COLOR
      }
    ]
  },
  {
    value: 'hat',
    label: '帽子',
    children: [
      {
        value: 'sports-cap',
        label: '运动帽',
        children: CLOTHING_COLOR
      },
      {
        value: 'straw-hat',
        label: '草帽',
        children: CLOTHING_COLOR
      },
      {
        value: 'scarf',
        label: '头巾',
        children: CLOTHING_COLOR
      }
    ]
  },
  {
    value: 'sock',
    label: '袜子',
    children: [
      {
        value: 'pile-heap-socks',
        label: '堆堆袜',
        children: CLOTHING_COLOR
      },
      {
        value: 'sock',
        label: '短袜',
        children: CLOTHING_COLOR
      },
      {
        value: 'bottom-socks',
        label: '打底袜',
        children: CLOTHING_COLOR
      },
      {
        value: 'knee-socks',
        label: '过膝袜',
        children: CLOTHING_COLOR
      }
    ]
  },
  {
    value: 'bag',
    label: '包包',
    children: [
      {
        value: 'backpack',
        label: '双肩包',
        children: CLOTHING_COLOR
      },
      {
        value: 'school-bag',
        label: '书包',
        children: CLOTHING_COLOR
      },
      {
        value: 'messenger-bag',
        label: '斜挎包',
        children: CLOTHING_COLOR
      }
    ]
  }
]
