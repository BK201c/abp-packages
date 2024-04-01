function generateCode(config) {
  if (config !== '') {
    config = JSON.parse(config)
    //{"mapType":"room","x":5,"y":19,"code":"1"}
    // 堆垛机 mapType, code, x, y, count_num, movestep
    // 输送线 mapType, code, x, y,
    // RGV mapType, code, x, y, idnumber
    // myDiagram.model.toJson();
    var nodes = config.nodeDataArray
    var newNode = new Array()
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i]
      newNode[i] = node
      var maptype
      var x
      var y
      var code
      var pos = node.pos.split(' ')

      newNode[i]['code'] = node.code || ''
      newNode[i]['x'] = parseInt(pos[0]) / 35
      newNode[i]['y'] = parseInt(pos[1]) / 35
      newNode[i]['name'] = node.name || ''
      newNode[i]['title'] = node.title || ''
      newNode[i]['devType'] = node.devType || ''
      newNode[i]['direction'] = node.direction || ''
      newNode[i]['titlePosition'] = node.titlePosition || 'center'

      if (node['key'] == 'G1') {
        newNode[i]['layerTile'] = node.layerTile || '设备监控系统'
        newNode[i]['code'] = 'G101'
      }
      if (node['type'] == '区域标注') {
        newNode[i]['mapType'] = 'areatext'
        newNode[i]['title'] = node.name
        newNode[i]['size'] = node.size
        newNode[i]['fontSize'] = node.fontSize
        newNode[i]['hasBorder'] = node.hasBorder
      }
      if (node['type'] == '货位') {
        newNode[i]['mapType'] = 'room'
      }
      if (node['type'] == '堆垛机水平') {
        newNode[i]['mapType'] = 's1-1'
        newNode[i]['count_num'] = node.maxMoveStep || 53
        newNode[i]['movestep'] = node.movestep || 1
      }
      if (node['type'] == '输送线水平双向') {
        newNode[i]['mapType'] = 'c1-5'
      }
      if (node['type'] == '输送线垂直双向') {
        newNode[i]['mapType'] = 'c2-5'
      }
      if (node['type'] == '输送线水平左') {
        newNode[i]['mapType'] = 'c1-1'
      }
      if (node['type'] == '输送线水平右') {
        newNode[i]['mapType'] = 'c1-2'
      }
      if (node['type'] == '输送线垂直上') {
        newNode[i]['mapType'] = 'c2-3'
      }
      if (node['type'] == '输送线垂直下') {
        newNode[i]['mapType'] = 'c2-4'
      }
      if (node['type'] == '输送线水平') {
        newNode[i]['mapType'] = 'c1-1'
      }
      if (node['type'] == '输送线垂直') {
        newNode[i]['mapType'] = 'c2-3'
      }
      if (node['type'] == 'RGV水平') {
        newNode[i]['mapType'] = 'r1-1'
        newNode[i]['idnumber'] = node.key
        newNode[i]['movestep'] = node.movestep || 1
        newNode[i]['count_num'] = node.maxMoveStep || 53
      }
      if (node['type'] == 'RGV垂直') {
        newNode[i]['mapType'] = 'r2-4'
        newNode[i]['idnumber'] = node.key
        newNode[i]['movestep'] = node.movestep || 1
        newNode[i]['count_num'] = node.maxMoveStep || 53
      }
      if (node['type'] == 'RGV轨道水平') {
        newNode[i]['mapType'] = 'guidao-1'
      }
      if (node['type'] == 'RGV轨道垂直') {
        newNode[i]['mapType'] = 'guidao-2'
      }
      if (node['type'] == '水箱') {
        newNode[i]['mapType'] = 'water'
      }
      if (node['type'] == '提升机') {
        newNode[i]['mapType'] = 'hoist'
      }
      if (node['type'] == '拆盘机') {
        newNode[i]['mapType'] = 'discharge'
      }
      if (node['type'] == '墙体') {
        newNode[i]['mapType'] = 'WALL'
      }
      if (node['type'] == '缠膜机') {
        newNode[i]['mapType'] = 'wrapping'
      }
      if (node['type'] == '叠盘机') {
        newNode[i]['mapType'] = 'coder'
      }
      if (node['type'] == '扫码器') {
        newNode[i]['mapType'] = 'b1-1'
      }
    }
    return newNode
  } else {
    return ''
  }
}

function editText(e, node) {
  console.log('editText')
  console.log(node)
  var obj = node.findObject('TEXTBLOCK')
  console.log(obj)
}
