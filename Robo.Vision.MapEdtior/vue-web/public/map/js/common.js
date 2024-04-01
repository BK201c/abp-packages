var mapData = Array() //地图数据
var saveJson //json地图数据
// mapData中的每个数据对象的解释
// mapType表示图片类型，x表示x坐标，y表示y坐标,
// mapType值
// s1-1，单工单升堆垛机-水平-left；s1-2，单工单升堆垛机-水平-right;s2-3，单工单升堆垛机-垂直-up;s2-4，单工单升堆垛机-垂直-down
// c1-1，输送线-水平-left; c1-2，输送线-水平-right; c1-3，输送线-水平-up; c1-4，输送线-水平-down;
// c2-1，输送线-垂直-left; c2-2，输送线-垂直-right; c2-3，输送线-垂直-up; c2-4，输送线-垂直-down;
// b1-1，BCR-left; b1-2，BCR-right; b2-1，BCR-up; b2-1，BCR-down;
// room，仓库位; wall，墙体; water，水箱
var ddj = Array()
var ssj = Array()
var rrj = Array()
var mpj = Array()
var tsj = Array()
var cpj = Array()
var dpj = Array()
//文字
var txt = {
  add: function (id, x, y, title, size) {
    if (size == null) size = 12
    $('#txt' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="txt' +
      id +
      '" style="position:absolute;font-size:' +
      size +
      'px;">' +
      title +
      '</div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#txt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#txt' + id + '').remove()
  }
}

// 区域标注
var areatxt = {
  add: function (id, x, y, title, obj) {
    var step = 34
    $('#areatxt' + id + '').remove()
    var size = obj.size.split(' ')
    var map = $('#zd_map')
    var hasBorder = obj.hasBorder ? 'area-text-box' : ''
    var titleBox = `<span class="title" style="font-size:${obj.fontSize}px;font-weight:600;">${obj.title}</span>`
    var box = `<div id="areatxt${id}" class="${hasBorder}" style="position:absolute;width:${size[0]}px;height:${size[1]}px;">${titleBox}</div>`
    map.append(box)
    x = x * step
    y = y * step
    $(`#areatxt${id}`).css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#areatxt' + id + '').remove()
  }
}

//仓库
var ck = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#ck' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="ck' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/cangwei.png) no-repeat;width:34px; height:34px;"><span id="cktxt' +
      id +
      '">' +
      title +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#ck' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#cktxt' + id + '').css({ x: x + 'px', y: y + 'px' })
    //鼠标事件
    $('#ck' + id + '').on({
      mouseover: function () {
        index = layer.tips('仓库货位', '#ck' + id + '', { tips })
        $('#ck' + id + '').css('cursor', 'hand')
      },
      mouseout: function () {
        layer.close(index)
        $('#ck' + id + '').css('cursor', 'auto')
      }
    })
  },
  remove: function (id) {
    $('#ck' + id + '').remove()
  }
}

//墙体
var qiang = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#qiang' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="qiang' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/wall.png) no-repeat;width:34px; height:34px;"><span id="qiangtxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#qiang' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#qiangtxt' + id + '').css({ x: x + 'px', y: y + 'px' })
    //鼠标事件
    $('#qiang' + id + '').on({
      mouseover: function () {
        index = layer.tips('墙体', '#qiang' + id + '', { tips })
        $('#qiang' + id + '').css('cursor', 'hand')
      },
      mouseout: function () {
        layer.close(index)
        $('#qiang' + id + '').css('cursor', 'auto')
      }
    })
  },
  remove: function (id) {
    $('#qiang' + id + '').remove()
  }
}

//占位提升机
var tisheng = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#tisheng' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="tisheng' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/tisheng.png) no-repeat;width:34px; height:34px;"><span id="tishengtxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#tisheng' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#tishengtxt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#tisheng' + id + '').remove()
  }
}

//占位双线
var double = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#double' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="double' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/double.png) no-repeat;width:34px; height:34px;"><span id="doubletxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#double' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#doubletxt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#double' + id + '').remove()
  }
}

//占位双线
var doubles = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#doubles' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="doubles' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/doubles.png) no-repeat;width:34px; height:34px;"><span id="doublestxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#doubles' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#doublestxt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#doubles' + id + '').remove()
  }
}

//水箱
var sx = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#sx' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="sx' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/box_water.png) no-repeat;width:34px; height:34px;"><span id="sxtxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#sx' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#sxtxt' + id + '').css({ x: x + 'px', y: y + 'px' })
    //鼠标事件
    $('#sx' + id + '').on({
      mouseover: function () {
        index = layer.tips('水箱', '#sx' + id + '', { tips })
        $('#sx' + id + '').css('cursor', 'hand')
      },
      mouseout: function () {
        layer.close(index)
        $('#sx' + id + '').css('cursor', 'auto')
      }
    })
  },

  remove: function (id) {
    $('#sx' + id + '').remove()
  }
}

//提升机
var ts = {
  add: function (id, x, y, angle, title) {
    var title_v
    if (title) {
      if (title.length > 1) {
        var first = title.substring(0, 1)
        if (first == 'T') {
          title_v = title
        } else {
          title_v = 0
        }
      } else {
        title_v = 0
      }
    } else {
      title_v = 0
    }
    var step = 34
    $('#ts' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="ts' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/hoist_' +
      angle +
      '.png) no-repeat;width:34px; height:34px;"><span id="tstxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#ts' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#tstxt' + id + '').css({ x: x + 'px', y: y + 'px' })

    var eventBox =
      '<div id="tsevent' + id + '" style="width:34px; height:34px;position:absolute;"></div>'
    map.append(eventBox)
    $('#tsevent' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#tsevent' + id + '').css('z-index', '9999')

    //鼠标事件
    $('#tsevent' + id + '').on({
      mouseover: function () {
        index = layer.tips('提升机：' + title_v, '#ts' + id + '', { tips })
        $('#tsevent' + id + '').css('cursor', 'hand')
      },
      mouseout: function () {
        layer.close(index)
        $('#tsevent' + id + '').css('cursor', 'auto')
      }
    })
  },
  remove: function (id) {
    $('#ts' + id + '').remove()
  }
}

//补位
var bw = {
  add: function (id, x, y, angle, title) {
    var step = 34
    $('#bw' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="bw' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/conveys_' +
      angle +
      '.png) no-repeat;width:34px; height:34px;"><span id="bwtxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#bw' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#bwtxt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#bw' + id + '').remove()
  }
}

//缠膜机
var cm = {
  add: function (id, x, y, title) {
    var title_v
    if (title) {
      if (title.length > 1) {
        var first = title.substring(0, 1) //substr(title, 0, 1 );
        if (first == 'C') {
          title_v = title
        } else {
          title_v = 0
        }
      } else {
        title_v = 0
      }
    } else {
      title_v = 0
    }
    var step = 34
    $('#cm' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="cm' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/wrapping.png) no-repeat;width:34px; height:34px;"><span id="cmtxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#cm' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#cm' + id + '').css({ x: x + 'px', y: y + 'px' })

    var eventBox =
      '<div id="cmevent' + id + '" style="width:34px; height:34px;position:absolute;"></div>'
    map.append(eventBox)
    $('#cmevent' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#cmevent' + id + '').css('z-index', '9999')

    //鼠标事件
    $('#cmevent' + id + '').on({
      mouseover: function () {
        index = layer.tips('缠膜机：' + title_v, '#cm' + id + '', { tips })
        $('#cmevent' + id + '').css('cursor', 'hand')
      },
      mouseout: function () {
        layer.close(index)
        $('#cmevent' + id + '').css('cursor', 'auto')
      }
    })
  },
  remove: function (id) {
    $('#cm' + id + '').remove()
  }
}

//轨道
var guidao = {
  add: function (id, x, y, ang) {
    var step = 34
    $('#guidao' + id + '').remove()
    var map = $('#zd_map')
    if (ang == 1) {
      var box =
        '<div id="guidao' +
        id +
        '" style="position:absolute;font-size:12px;background:url(./images/rgv_track_1.png) no-repeat;width:34px; height:34px;"></div>'
    } else {
      var box =
        '<div id="guidao' +
        id +
        '" style="position:absolute;font-size:12px;background:url(./images/rgv_track_2.png) no-repeat;width:34px; height:34px;"></div>'
    }
    map.append(box)
    x = x * step
    y = y * step
    $('#guidao' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#guidaotxt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#guidao' + id + '').remove()
  }
}

//扫码器
var bcr = {
  add: function (id, x, y, angle, title) {
    var step = 34
    var title_v = title || ''
    $('#bcr' + id + '').remove()
    var map = $('#zd_map')
    var box = `<div id="bcr${id}" style="position:absolute;font-size:12px;background-image:url(./images/bcr_1.png); background-size:100%;background-color:#44ccff;width:34px; height:34px;"></div>`
    map.append(box)
    x = x * step
    y = y * step
    $('#bcr' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#bcrtxt' + id + '').css({ x: x + 'px', y: y + 'px' })

    var eventBox =
      '<div id="bcrevent' + id + '" style="width:34px; height:34px;position:absolute;"></div>'
    map.append(eventBox)
    $('#bcrevent' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#bcrevent' + id + '').css('z-index', '9999')

    //鼠标事件
    $('#bcrevent' + id + '').on({
      mouseover: function () {
        index = layer.tips('扫码器', '#bcr' + id + '', { tips })
        // index = layer.tips("扫码器：" + title_v, "#bcr" + id + "", { tips });
        $('#bcrevent' + id + '').css('cursor', 'hand')
      },
      mouseout: function () {
        layer.close(index)
        $('#bcrevent' + id + '').css('cursor', 'auto')
      }
    })

    //BCR点击事件
    $('#bcr' + id + '').on({
      click: function () {
        layer.open({
          title: mapData[id]['code'] + '补码',
          content:
            '<input type="text" id="code" name="code" required  lay-verify="required" autocomplete="off" class="layui-input">',
          yes: function (index, layero) {
            // BCR_w.send("0,"+mapData[id]["code"]);
            BCR_w.send($('#code').val() + ',' + mapData[id]['code'])
            //mapData[id]["code"] = $("#code").val();
            //do something
            layer.close(index)
          }
        })
      }
    })
  },
  remove: function (id) {
    $('#bcr' + id + '').remove()
  }
}

//码盘机补色
var coders = {
  add: function (id, x, y, title) {
    var step = 34
    //var x = pos[0];
    //var y = pos[1];
    $('#coders' + id + '').remove()
    var map = $('#zd_map')
    var box =
      '<div id="coders' +
      id +
      '" style="position:absolute;font-size:12px;background:url(./images/coders.png) no-repeat;width:34px; height:34px;"><span id="coderstxt' +
      id +
      '">' +
      '' +
      '</span></div>'
    map.append(box)
    x = x * step
    y = y * step
    $('#coders' + id + '').css({ x: x + 'px', y: y + 'px' })
    $('#coderstxt' + id + '').css({ x: x + 'px', y: y + 'px' })
  },
  remove: function (id) {
    $('#coders' + id + '').remove()
  }
}

/**
 *
 * 查找数组，返回匹配到的第一个index
 *
 * @param array 被查找的数组
 * @param feature 查找特征 或者为一个具体值，用于匹配数组遍历的值，或者为一个对象，表明所有希望被匹配的key-value
 * @param or boolean 希望命中feature全部特征或者只需命中一个特征，默认true
 *
 * @return 数组下标  查找不到返回-1
 */
function findArray(array, feature, all = true) {
  for (let index in array) {
    let cur = array[index]
    if (feature instanceof Object) {
      let allRight = true
      for (let key in feature) {
        let value = feature[key]
        if (cur[key] == value && !all) return index
        if (all && cur[key] != value) {
          allRight = false
          break
        }
      }
      if (allRight) return index
    } else {
      if (cur == feature) {
        return index
      }
    }
  }
  return -1
}

//数组去null
function ClearNullArr(arr) {
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!arr[i] || arr[i] == '' || arr[i] === undefined) {
      arr.splice(i, 1)
      len--
      i--
    }
  }
  return arr
}

//绘制地图网格
function newMap() {
  //初始化对象
  var demo = new blockDrag({ block: [240, 130] })
  //设置背景栅格，可根据需要添加
  var blockNum = Number(demo.col) * Number(demo.row)

  for (var i = 0; i < blockNum; i++) {
    $(
      "<div class='block' style='width:" +
        demo.set.blockW +
        'px;height:' +
        demo.set.blockH +
        "px'></div>"
    ).appendTo($('#zd_map'))
  }
}

///////////////////////////////////////////////////////////////////////////////
//
//	加载***********************************************************************
//
///////////////////////////////////////////////////////////////////////////////
//把数据解析到地图舞台上
function mapDataToScene(jsonStr) {
  var s1 = Array()
  var c1 = Array()
  var r1 = Array()
  var co1 = Array()
  var ts1 = Array()
  var cp1 = Array()
  var first
  var str_code
  var count_num
  mapData = jsonStr
  for (var i = 0; i < mapData.length; i++) {
    var obj = mapData[i]
    var itemType
    if (!!obj.mapType) {
      itemType = obj.mapType.split('-')
    } else {
      itemType = ''
    }
    str_code = obj.code
    switch (itemType[0]) {
      case 's1':
        s1[str_code] = Stacker.createNew()
        s1[str_code].setPos(i, obj.x, obj.y, obj.count_num, 1, obj.direction, obj.movestep)
        s1[str_code].add(0, 0, 0, 0, 0, obj.code, obj.alarmMessage, [obj.x, obj.y], obj)
        break
      case 's2':
        s1[str_code] = Stacker.createNew()
        s1[str_code].setPos(i, obj.x, obj.y, obj.count_num, 2, obj.direction, obj.movestep)
        s1[str_code].add(0, 0, 0, 0, 0, obj.code, obj.alarmMessage, [obj.x, obj.y], obj)
        break
      case 'r1':
        r1[str_code] = Rgv.createNew()
        r1[str_code].setPos(i, obj.x, obj.y, obj.count_num, 1, obj.direction, obj.movestep)
        r1[str_code].add(0, 0, 0, 0, 0, obj.code, obj.alarmMessage, [obj.x, obj.y], obj)
        break
      case 'r2':
        r1[str_code] = Rgv.createNew()
        r1[str_code].setPos(i, obj.x, obj.y, obj.count_num, 2, obj.direction, obj.movestep)
        r1[str_code].add(0, 0, 0, 0, 0, obj.code, obj.alarmMessage, [obj.x, obj.y], obj)
        break
      case 'c1':
        c1[str_code] = Convey.createNew()
        c1[str_code].setPos(i, obj.x, obj.y, 1, 1, intToDire(itemType[1]))
        c1[str_code].add(0, 0, 0, 0, obj.title, obj.code, itemType[1], 0, 0, obj)
        break
      case 'c2':
        c1[str_code] = Convey.createNew()
        c1[str_code].setPos(i, obj.x, obj.y, 1, 2, intToDire(itemType[1]))
        c1[str_code].add(0, 0, 0, 0, obj.title, obj.code, itemType[1], 0, 0, obj)
        break
      case 'b1':
        bcr.add(i, obj.x, obj.y, obj.code, obj)
        break
      case 'room':
        ck.add(i, obj.x, obj.y, obj.code, obj)
        break
      case 'areatext':
        areatxt.add(i, obj.x, obj.y, obj.code, obj)
        break
      case 'hoist':
        ts1[str_code] = Hoist.createNew()
        ts1[str_code].setPos(i, obj.x, obj.y)
        ts1[str_code].add(0, 0, 0, 0, obj.code, obj)
        break
      case 'conveys':
        bw.add(i, obj.x, obj.y, intToDire(itemType[1]), obj.code, obj)
        break
      case 'WALL':
        qiang.add(i, obj.x, obj.y)
        break
      case 'tisheng':
        tisheng.add(i, obj.x, obj.y)
        break
      case 'double':
        double.add(i, obj.x, obj.y)
        break
      case 'doubles':
        doubles.add(i, obj.x, obj.y)
        break
      case 'coders':
        coders.add(i, obj.x, obj.y)
        break
      case 'discharge':
        cp1[str_code] = Discharge.createNew()
        cp1[str_code].setPos(i, obj.x, obj.y)
        cp1[str_code].add(0, 0, 0, 0, obj.code, obj.code), obj
        break

      case 'wrapping':
        cm.add(i, obj.x, obj.y, obj.code, obj.code), obj
        break
      case 'coder':
        co1[str_code] = Coder.createNew()
        co1[str_code].setPos(i, obj.x, obj.y)
        co1[str_code].add(0, 0, 0, 0, obj.code, obj.code, obj)
        break
      case 'water':
        sx.add(i, obj.x, obj.y)
        break
      case 'guidao':
        guidao.add(i, obj.x, obj.y, itemType[1])
        break
    }
  }
  ddj = s1
  ssj = c1
  rrj = r1
  dpj = co1
  tsj = ts1
  cpj = cp1
}

function intToDire(value) {
  var res
  switch (parseInt(value)) {
    case 1:
      res = 'left'
      break
    case 2:
      res = 'right'
      break
    case 3:
      res = 'up'
      break
    case 4:
      res = 'down'
      break
    case 5:
      res = 'double'
      break
    case 6:
      res = 'left'
      break
    case 7:
      res = 'right'
      break
    case 8:
      res = 'up'
      break
    case 9:
      res = 'down'
      break
    case 10:
      res = 'doubles'
      break
  }
  return res
}

function mapDataToUp(jsonStr) {
  var mapData = jQuery.parseJSON(jsonStr)
  for (var i = 0; i < mapData.length; i < i++) {
    mapData[i].y = mapData[i].y + 20
  }
  var s1 = Array()
  var c1 = Array()
  var r1 = Array()
  var co1 = Array()
  var ts1 = Array()
  var cp1 = Array()
  for (var i = 0; i < mapData.length; i++) {
    var obj = mapData[i]
    var itemType = obj.mapType.split('-')

    // console.log(itemType)
    switch (itemType[0]) {
      case 's1':
        s1[i] = Stacker.createNew()
        s1[i].setPos(i, obj.x, obj.y, 1, 1, intToDire(itemType[1]))
        s1[i].mapAdd()
        break
      case 's2':
        s1[i] = Stacker.createNew()
        s1[i].setPos(i, obj.x, obj.y, 1, 2, intToDire(itemType[1]))
        s1[i].mapAdd()
        break
      case 'c1':
        c1[i] = Convey.createNew()
        c1[i].setPos(i, obj.x, obj.y, 1, 1, intToDire(itemType[1]))
        c1[i].mapAdd()
        break
      case 'c2':
        c1[i] = Convey.createNew()
        c1[i].setPos(i, obj.x, obj.y, 1, 2, intToDire(itemType[1]))
        c1[i].mapAdd()
        break
      case 'b1':
        bcr.mapAdd(i, obj.x, obj.y, intToDire(itemType[1]))
        break
      case 'room':
        ck.mapAdd(i, obj.x, obj.y)
        break
      case 'conveys':
        bw.mapAdd(i, obj.x, obj.y, intToDire(itemType[1]))
        break
      case 'hoist':
        ts1[i] = Hoist.createNew()
        ts1[i].setPos(i, obj.x, obj.y)
        ts1[i].mapAdd()
        break
      case 'discharge':
        cp1[i] = Discharge.createNew()
        cp1[i].setPos(i, obj.x, obj.y)
        cp1[i].mapAdd()
        break
      case 'wall':
        qiang.mapAdd(i, obj.x, obj.y)
        break

      case 'wrapping':
        cm.mapAdd(i, obj.x, obj.y)
        break
      case 'coder':
        co1[i] = Coder.createNew()
        co1[i].setPos(i, obj.x, obj.y)
        co1[i].mapAdd()
        break
      case 'water':
        sx.mapAdd(i, obj.x, obj.y)
        break
      case 'guidao':
        guidao.mapAdd(i, obj.x, obj.y, itemType[1])
        break
      case 'rgv':
        r1[i] = Rgv.createNew()
        r1[i].setPos(i, obj.x, obj.y, obj.idnumber, itemType[1])
        r1[i].mapAdd()
        break
    }
  }

  saveJson = JSON.stringify(ClearNullArr(mapData))
  console.log(saveJson)
}

function mapDataToleft(jsonStr) {
  var mapData = jQuery.parseJSON(jsonStr)
  console.log(mapData)
  for (var i = 0; i < mapData.length; i < i++) {
    mapData[i].x = mapData[i].x - 2
  }
  var s1 = Array()
  var c1 = Array()
  var r1 = Array()
  var co1 = Array()
  var ts1 = Array()
  var cp1 = Array()
  for (var i = 0; i < mapData.length; i++) {
    var obj = mapData[i]
    var itemType = obj.mapType.split('-')

    // console.log(itemType)
    switch (itemType[0]) {
      case 's1':
        s1[i] = Stacker.createNew()
        s1[i].setPos(i, obj.x, obj.y, 1, 1, intToDire(itemType[1]))
        s1[i].mapAdd()
        break
      case 's2':
        s1[i] = Stacker.createNew()
        s1[i].setPos(i, obj.x, obj.y, 1, 2, intToDire(itemType[1]))
        s1[i].mapAdd()
        break
      case 'c1':
        c1[i] = Convey.createNew()
        c1[i].setPos(i, obj.x, obj.y, 1, 1, intToDire(itemType[1]))
        c1[i].mapAdd()
        break
      case 'c2':
        c1[i] = Convey.createNew()
        c1[i].setPos(i, obj.x, obj.y, 1, 2, intToDire(itemType[1]))
        c1[i].mapAdd()
        break
      case 'b1':
        bcr.mapAdd(i, obj.x, obj.y, intToDire(itemType[1]))
        break
      case 'room':
        ck.mapAdd(i, obj.x, obj.y)
        break
      case 'hoist':
        ts1[i] = Hoist.createNew()
        ts1[i].setPos(i, obj.x, obj.y)
        ts1[i].mapAdd()
        break

      case 'conveys':
        // images/conveys_' + angle + '.png
        bw.mapAdd(i, obj.x, obj.y, intToDire(itemType[1]))
        break
      case 'wall':
        qiang.mapAdd(i, obj.x, obj.y)
        break
      case 'discharge':
        cp1[i] = Discharge.createNew()
        cp1[i].setPos(i, obj.x, obj.y)
        cp1[i].mapAdd()
        break
      case 'wrapping':
        cm.mapAdd(i, obj.x, obj.y)
        break
      case 'coder':
        co1[i] = Coder.createNew()
        co1[i].setPos(i, obj.x, obj.y)
        co1[i].mapAdd()
        break
      case 'water':
        sx.mapAdd(i, obj.x, obj.y)
        break
      case 'guidao':
        // images/rgv_track_1.png
        guidao.mapAdd(i, obj.x, obj.y, itemType[1])
        break
      case 'rgv':
        r1[i] = Rgv.createNew()
        r1[i].setPos(i, obj.x, obj.y, obj.idnumber, itemType[1])
        r1[i].mapAdd()
        break
    }
  }
  saveJson = JSON.stringify(ClearNullArr(mapData))
  console.log(saveJson)
}
