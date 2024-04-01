//输送线
var Convey = {
  createNew: function () {
    var convey = {}
    var stepx = 34 //步幅值30位原始值，除以系数就是原来行走路程总数的1/n
    var stepy = 34 //步幅值30位原始值，除以系数就是原来行走路程总数的1/n
    var index = 1 //tip
    var pos = Array() //初始化坐标位置
    var angle = 1 //角度 1水平，2垂直
    var idnumber = 0 //目标站
    var id = 0 //设备ID
    var direction = 'left' //设备滚轮运动方向
    // var conkey = "CO1";     //设备滚轮运动方向
    //-----------------------
    /*
        添加输送线
        @int id      设备编号
        @int tray    是否有托盘   0无托盘  1有托盘
        @int connect 设备与PLC的连接状态 0 断开， 1 连接
        @int alt     设备报警状态  0 无报警  大于0有报警
        @int taskid  任务号
        @int movep   正向运动 向上 / 向左
        @int moven   反向运动 向下 / 向右
         */
    convey.add = function (
      tray,
      connect,
      alt,
      taskid,
      title,
      code,
      movedir,
      traydirect,
      alarmMessage,
      obj
    ) {
      var title_v = code || title

      var x = pos[0]
      var y = pos[1]
      x = x * stepx
      y = y * stepy

      var covPic = 'convey_1'

      var map = $('#zd_map')
      var titlePos = ''
      var posClass = ''
      if (_.has(obj, 'titlePosition')) {
        var offset = ['left', 'right'].includes(obj.titlePosition) ? '-37px' : '-37px'
        if (obj.titlePosition === 'center') {
          titlePos = ''
          posClass = 'label-center'
        } else {
          titlePos = `${obj.titlePosition}:${offset}`
        }
      }
      var iconArrow = `<div class="icon-arrow-${obj.titlePosition}"></div>`
      var titleBox = `<div class="dev-code cov-title ${posClass}" style="${titlePos}">${
        code || ''
      }${iconArrow}</div>`

      var box = `<div id="convey${id}" class="cov-main dev-main" style="position:absolute;z-index:1;">${titleBox}</div>`

      angle = obj.mode === 'horizontal' ? 1 : 2

      if ($('#convey' + id + '').length == 0) {
        map.append(box)
        // if (angle == 1) {
        //   if (movedir == 1) {
        //     covPic = "conveys_left";
        //   }

        //   if (movedir == 2) {
        //     covPic = "conveys_right";
        //   }

        //   if (movedir == 5) {
        //     covPic = "conveys_double2";
        //   }
        // } else {
        //   if (movedir == 3) {
        //     covPic = "conveys_up";
        //   }

        //   if (movedir == 4) {
        //     covPic = "conveys_down";
        //   }

        //   if (movedir == 5) {
        //     covPic = "conveys_double1";
        //   }
        // }

        $('#convey' + id + '').css({ x: x + 'px', y: y + 'px' })
        var width = 34
        var height = 34
        if (_.has(obj, 'size')) {
          ;[width, height] = obj.size.split(' ')
        }
        if (angle == 1) {
          $('#convey' + id + '').css({
            width: `${width}px`,
            height: `${height}px`
          })
          $('#convey' + id + '').css('background-image', `url(./images/convey_1.png)`)
        }

        if (angle == 2) {
          $('#convey' + id + '').css({
            width: `${width}px`,
            height: `${height}px`
          })
          $('#convey' + id + '').css('background-image', `url(./images/convey_2.png)`)
        }
      }

      //报警图标显示
      convey.iconAdd('alarm', alt)

      //与PLC连接状态
      convey.iconAdd('connect', connect)

      //托盘
      if (traydirect == 0) {
        if (angle == 1) {
          convey.iconAdd('tray_horizontal', tray)
        } else {
          convey.iconAdd('tray_vertical', tray)
        }
      } else {
        if (traydirect == 1) {
          convey.iconAdd('tray_horizontal', tray)
        } else if (traydirect == 2) {
          convey.iconAdd('tray_vertical', tray)
        }
      }

      //事件生成
      if ($('#conveyevent' + id + '').length == 1) {
        $('#conveyevent' + id + '').css({ x: x + 'px', y: y + 'px' })
      } else {
        if (angle == 1) {
          var eventBox =
            '<div id="conveyevent' +
            id +
            '" style="width:34px; height:34px;position:absolute;"></div>'
        }
        if (angle == 2) {
          var eventBox =
            '<div id="conveyevent' +
            id +
            '" style="width:34px; height:34px;position:absolute;"></div>'
        }
        map.append(eventBox)
        $('#conveyevent' + id + '').css({ x: x + 'px', y: y + 'px' })
        $('#conveyevent' + id + '').css('z-index', '9999')

        //鼠标事件
        $('#conveyevent' + id + '').on({
          mouseover: function () {
            const msg = `输送线：${title_v}<br>网络状态：${connectMsg}<br>任务号：${taskid}`
            index = layer.tips(msg, `#convey${id}`, { tips })
            $('#conveyevent' + id + '').css('cursor', 'hand')
          },
          mouseout: function () {
            layer.close(index)
            $('#conveyevent' + id + '').css('cursor', 'auto')
          }
        })
      }

      //加载事件
      convey.ftask(taskid, title_v, connect, alarmMessage, obj)
    }

    //-----------------------
    /*
        刷新点击事件和任务号
         */
    convey.ftask = function (taskid, title_v, connect, alarmMessage, obj) {
      var taskid = taskid
      if (taskid == null) {
        taskid = ''
      }
      $('#conveyevent' + id + '').unbind()

      if (!obj.usedFlag) {
        $('#convey' + id + '').addClass('disabled-device')
      } else {
        $('#convey' + id + '').removeClass('disabled-device')
      }

      const cmdNo = `任务号： ${obj.cmdNo || ''}`
      const connectMsg = `网络状态：${connect ? '设备已连接' : '设备断开'}`
      const altMsg = alarmMessage ? `告警：${alarmMessage}` : ''
      const auto = `运行模式：${obj.isAuto ? '自动' : '手动'}`
      const free = `空闲状态：${obj.isFree ? '空闲' : '不空闲'}`
      const palletBarcode = `托盘号：${obj.palletBarcode || ' '}`
      const codetxt = `设备编号：${obj.code}`
      const name = `名称：${obj.name}`
      const usedFlag = `启用状态：${obj.usedFlag ? '启用' : '禁用'}`
      const msg = `输送线<br>${codetxt}<br>${name}<br>${cmdNo}<br>${palletBarcode}<br>${altMsg}<br>${auto}<br>${free}<br>${connectMsg}<br>${usedFlag}`

      //事件
      $('#conveyevent' + id + '').on({
        mouseover: function () {
          index = layer.tips(msg, `#convey${id}`, { tips })
          $('#conveyevent' + id + '').css('cursor', 'hand')
        },
        mouseout: function () {
          layer.close(index)
          $('#conveyevent' + id + '').css('cursor', 'auto')
        },
        click: function () {
          //var url = "conveyInfo.php?task="+taskid+"&id="+id;
          //var url = "conveyInfo.php?code=" + title_v + "&conkey=" + conkey;
          var url = deviceInfo_url + '?type=conveyor&code=' + title_v + '&rdm=' + Math.random()
          //iframe窗
          layer.open({
            type: 2,
            title: '状态和指令控制窗口',
            shadeClose: true,
            shade: 0.6,
            maxmin: true, //开启最大化最小化按钮
            area: ['1050px', '700px'],
            content: url
          })
        }
      })
    }

    //删除输送线
    convey.remove = function () {
      $('#convey' + id + '').remove()
      $('#conveyevent' + id + '').remove()
      //convey.iconRemove(key);
    }

    /*
        设置输送线的初始化位置和方向
        @string deviceid 设备ID
        @string x 初始化x位置
        @string y 初始化y位置
        @int idnumber  站台号
        @int    angle  角度 1水平，2垂直
        @string dire  滚轮运动方向 left 左箭头  right 右箭头  up 上箭头 down 下箭头
        @
         */
    convey.setPos = function (deviceid, x, y, idnumber, ang, dire) {
      id = deviceid

      pos[0] = x
      pos[1] = y

      if (ang != null) {
        angle = ang
      }
    }

    //添加ICON
    /*
        @string key  alarm 报警标志   connect 连接状态   tray 托盘  left 左箭头  right 右箭头  up 上箭头 down 下箭头
         */
    convey.iconAdd = function (key, value) {
      var x = pos[0]
      var y = pos[1]

      if (angle == 1) {
        x = x * stepx
        y = y * stepy
      } else {
        x = x * stepy
        y = y * stepx
      }

      var map = $('#zd_map')

      $('#convey' + key + id + '').remove()

      if (key == 'alarm' && Boolean(value)) {
        var icon1 =
          '<div id="convey' +
          key +
          id +
          '" style="width:30px; height:30px;position:absolute;background:url(./images/icon_alert.png) no-repeat;z-index:9000;"></div>'
        map.append(icon1)
        if (angle == 1) {
          $('#convey' + key + id + '').css({
            x: x + 3 + 'px',
            y: y + 2 + 'px'
          })
        } else {
          $('#convey' + key + id + '').css({
            x: x + 2 + 'px',
            y: y + 3 + 'px'
          })
        }
      }

      if (key == 'alarm' && value == 0) {
        $('#convey' + key + id + '').remove()
      }
      if (key == 'alarm' && value == 21) {
        $('#convey' + key + id + '').remove()
      }

      if (key == 'connect' && value == 0) {
        var icon2 =
          '<div id="convey' +
          key +
          id +
          '" style="width:11px; height:11px;position:absolute;background:url(./images/ulink.png) no-repeat;z-index:8500;"></div>'
        map.append(icon2)
        $('#convey' + key + id + '').css({ x: x + 'px', y: y + 'px' })
      }

      if (key == 'connect' && value == 1) {
        var icon2 =
          '<div id="convey' +
          key +
          id +
          '" style="width:11px; height:11px;position:absolute;background:url(./images/link.png) no-repeat;z-index:8500;"></div>'
        map.append(icon2)
        $('#convey' + key + id + '').css({ x: x + 'px', y: y + 'px' })
      }

      if (key == '' && value == 1) {
        var icon3 =
          '<div id="convey' +
          key +
          id +
          '" style="width:30px; height:30px;position:absolute;background:url(./images/tray_1.png) no-repeat;z-index:6666;"></div>'
        map.append(icon3)
        $('#convey' + key + id + '').css({ x: x + 7 + 'px', y: y + 2 + 'px' })
      }

      if (key == 'tray_horizontal' && value == 1) {
        var icon3 =
          '<div id="convey' +
          key +
          id +
          '" style="width:30px; height:30px;position:absolute;background:url(./images/tray_1.png) no-repeat;z-index:6666;"></div>'
        map.append(icon3)
        $('#convey' + key + id + '').css({ x: x + 2 + 'px', y: y + 7 + 'px' })
      }

      if (key == 'tray_horizontal' && value == 0) {
        $('#convey' + key + id + '').remove()
      }

      if (key == 'tray_vertical' && value == 1) {
        var icon3 =
          '<div id="convey' +
          key +
          id +
          '" style="width:30px; height:30px;position:absolute;background:url(./images/tray_2.png) no-repeat;z-index:6666;"></div>'
        map.append(icon3)
        $('#convey' + key + id + '').css({ x: x + 2 + 'px', y: y + 7 + 'px' })
      }

      if (key == 'tray_vertical' && value == 0) {
        $('#convey' + key + id + '').remove()
      }

      if (key == 'left' && value == 1) {
        var icon4 =
          '<div id="convey' +
          key +
          id +
          '" style="width:22px; height:9px;position:absolute;background:url(./images/arrow_left.png) no-repeat;z-index:7777;"></div>'
        map.append(icon4)
        $('#convey' + key + id + '').css({ x: x + 7 + 'px', y: y + 13 + 'px' })
      }

      if (key == 'right' && value == 1) {
        var icon4 =
          '<div id="convey' +
          key +
          id +
          '" style="width:22px; height:9px;position:absolute;background:url(./images/arrow_right.png) no-repeat;z-index:7777;"></div>'
        map.append(icon4)
        $('#convey' + key + id + '').css({ x: x + 7 + 'px', y: y + 13 + 'px' })
      }

      if (key == 'double' && value == 1) {
        var icon4 =
          '<div id="convey' +
          key +
          id +
          '" style="width:21px; height:21px;position:absolute;background:url(./images/arrow_double' +
          angle +
          '.png) no-repeat;z-index:7777;"></div>'
        map.append(icon4)
        $('#convey' + key + id + '').css({ x: x + 'px', y: y + 8 + 'px' })
      }

      if (key == 'up' && value == 1) {
        var icon4 =
          '<div id="convey' +
          key +
          id +
          '" style="width:9px; height:22px;position:absolute;background:url(./images/arrow_up.png) no-repeat;z-index:7777;"></div>'
        map.append(icon4)
        $('#convey' + key + id + '').css({ x: x + 13 + 'px', y: y + 7 + 'px' })
      }

      if (key == 'down' && value == 1) {
        var icon4 =
          '<div id="convey' +
          key +
          id +
          '" style="width:9px; height:22px;position:absolute;background:url(./images/arrow_down.png) no-repeat;z-index:7777;"></div>'
        map.append(icon4)
        $('#convey' + key + id + '').css({ x: x + 13 + 'px', y: y + 7 + 'px' })
      }
      if (key == 'doubles' && value == 1) {
        var icon4 =
          '<div id="convey' +
          key +
          id +
          '" style="width:21px; height:21px;position:absolute;background:url(./images/arrow_double' +
          angle +
          '.png) no-repeat;z-index:7777;"></div>'
        map.append(icon4)
        $('#convey' + key + id + '').css({ x: x + 6 + 'px', y: y + 12 + 'px' })
      }
    }

    //删除ICON
    convey.iconRemove = function (key) {
      $('#convey' + key + id + '').remove()
    }

    return convey
  }
}
