//叠盘机
var Coder = {
  createNew: function () {
    var coder = {}
    var stepx = 34 //步幅值30位原始值，除以系数就是原来行走路程总数的1/n
    var stepy = 34 //步幅值30位原始值，除以系数就是原来行走路程总数的1/n
    var index = 1 //tip
    var pos = Array() //初始化坐标位置
    var id = 0 //设备ID
    //-----------------------
    /*
        添加输送线
        @int id      设备编号
        @int tray    是否有托盘   0无托盘  1有托盘
        @int connect 设备与PLC的连接状态 0 断开， 1 连接
        @int alt     设备报警状态  0 无报警  大于0有报警
        @int taskid  任务号
         */
    coder.add = function (tray, connect, alt, taskid, title, code, obj) {
      console.log(title)
      var title_v
      if (title) {
        if (title.length > 1) {
          var first = title.substring(0, 1)
          if (first == 'D') {
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

      var x = pos[0]
      var y = pos[1]

      var map = $('#zd_map')

      var titlePos = ''
      if (_.has(obj, 'titlePosition')) {
        titlePos = obj.titlePosition !== 'center' ? `${obj.titlePosition}:-34px` : ''
      }
      var titleBox = `<span class="dev-code" style="${titlePos}">${code || ''}</span>`
      var box = `<div id="coder${id}" class="dev-main" style="position:absolute;z-index:1;">${titleBox}</div>`

      if ($('#coder' + id + '').length == 0) {
        map.append(box)
      }
      x = x * stepx
      y = y * stepy
      $('#coder' + id + '').css({ x: x + 'px', y: y + 'px' })
      $('#coder' + id + '').css({ width: '34px', height: '34px' })
      $('#coder' + id + '').css('background-image', 'url(./images/coder.png)')

      //报警图标显示
      coder.iconAdd('alert', alt)

      //与PLC连接状态
      coder.iconAdd('connect', connect)

      //托盘
      coder.iconAdd('tray', tray)

      //事件生成
      if ($('#coderevent' + id + '').length == 1) {
        $('#coderevent' + id + '').css({ x: x + 'px', y: y + 'px' })
      } else {
        var eventBox =
          '<div id="coderevent' + id + '" style="width:34px; height:34px;position:absolute;"></div>'
        map.append(eventBox)
        $('#coderevent' + id + '').css({ x: x + 'px', y: y + 'px' })
        $('#coderevent' + id + '').css('z-index', '9999')

        //鼠标事件
        $('#coderevent' + id + '').on({
          mouseover: function () {
            index = layer.tips('叠盘机：' + title_v, '#coder' + id + '', {
              tips
            })
            $('#coderevent' + id + '').css('cursor', 'hand')
          },
          mouseout: function () {
            layer.close(index)
            $('#coderevent' + id + '').css('cursor', 'auto')
          }
        })
      }

      //加载事件
      coder.ftask(taskid, title_v)
    }

    //-----------------------
    /*
        刷新点击事件和任务号
         */
    coder.ftask = function (taskid, title_v) {
      var taskid = taskid
      if (taskid == null) {
        taskid = 0
      }
      $('#coderevent' + id + '').unbind()

      //事件
      $('#coderevent' + id + '').on({
        mouseover: function () {
          index = layer.tips('叠盘机：' + title_v, '#coder' + id + '', {
            tips
          })
          $('#coderevent' + id + '').css('cursor', 'hand')
        },
        mouseout: function () {
          layer.close(index)
          $('#coderevent' + id + '').css('cursor', 'auto')
        },
        click: function () {
          var url = 'coderInfo.php?code=' + title_v
          //iframe窗
          layer.open({
            type: 2,
            title: '状态显示窗口',
            shadeClose: true,
            shade: 0.6,
            maxmin: true, //开启最大化最小化按钮
            area: ['1050px', '700px'],
            content: url
          })
        }
      })
    }

    //删除叠盘机
    coder.remove = function () {
      $('#coder' + id + '').remove()
      $('#coderevent' + id + '').remove()
      //coder.iconRemove(key);
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
    coder.setPos = function (deviceid, x, y) {
      id = deviceid
      pos[0] = x
      pos[1] = y
    }

    //添加ICON
    /*
        @string key  alert 报警标志   connect 连接状态   tray 托盘  left 左箭头  right 右箭头  up 上箭头 down 下箭头
         */
    coder.iconAdd = function (key, value) {
      var x = pos[0]
      var y = pos[1]
      x = x * stepx
      y = y * stepy

      var map = $('#zd_map')

      $('#coder' + key + id + '').remove()
      if (key == 'alert' && value > 0) {
        var icon1 =
          '<div id="coder' +
          key +
          id +
          '" style="width:30px; height:30px;position:absolute;background:url(./images/icon_alert.png) no-repeat;z-index:9000;"></div>'
        map.append(icon1)
        $('#coder' + key + id + '').css({ x: x + 3 + 'px', y: y + 2 + 'px' })
      }

      if (key == 'alert' && value == 0) {
        $('#coder' + key + id + '').remove()
      }
      if (key == 'alert' && value == 1) {
        $('#coder' + key + id + '').remove()
      }

      if (key == 'connect' && value == 0) {
        var icon2 =
          '<div id="coder' +
          key +
          id +
          '" style="width:11px; height:11px;position:absolute;background:url(./images/ulink.png) no-repeat;z-index:8500;"></div>'
        map.append(icon2)
        $('#coder' + key + id + '').css({ x: x + 'px', y: y + 'px' })
      }

      if (key == 'connect' && value == 1) {
        var icon2 =
          '<div id="coder' +
          key +
          id +
          '" style="width:11px; height:11px;position:absolute;background:url(./images/link.png) no-repeat;z-index:8500;"></div>'
        map.append(icon2)
        $('#coder' + key + id + '').css({ x: x + 'px', y: y + 'px' })
      }
    }

    //删除ICON
    coder.iconRemove = function (key) {
      $('#coder' + key + id + '').remove()
    }

    return coder
  }
}
