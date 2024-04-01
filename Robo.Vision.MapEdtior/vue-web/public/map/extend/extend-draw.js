let count = 0;
let dis = 0;
let tray = 1;
function updateAllByService(data) {
  let obj = data;
  let srms = obj["srms"];
  let rgvs = obj["rgvs"];
  let convs = obj["convs"];
  let coders = obj["coders"];
  let hoists = obj["hoists"];
  let discharges = obj["discharges"];
  if ($.isEmptyObject(convs) == false) {
    let size = convs.length;
    for (let i = 0; i < size; i++) {
      // 堆垛机对象。
      let item = convs[i];

      // 提示信息：堆垛机编号。
      let code = item["code"];
      let title = code;

      // 正转 左 or 上
      let movedir = item["movedir"];

      let alarmMessage = item["alarmMessage"];

      // 真表示是有托盘。
      let tray = 0;

      // 堆垛机任务号
      let taskNo = item["taskno"];

      // 托盘方向，默认0，根据输送线水平，垂直方向自动调整；1=强制水平；2=强制垂直。
      let traydir = 1;
      traydir = item["traydir"];
      // 真表示有报警。
      let alarm = 0;

      // 真表示设备连接。
      let connect = 0;

      if (item["tray"]) {
        tray = 1;
      }
      if (item["alarm"]) {
        alarm = 1;
      }
      if (item["connect"]) {
        connect = 1;
      }

      /**
       * tray 真表示有托盘;
       * connect 真表示连接正常
       * alarm 真表示有报警
       * taskNo 表示任务号
       * title 表示设备名称
       * code 表示设备编号
       * movedir 运动方向，0=静止；1=正传(left/up)；2=反转(right/down)
       * traydir 表示托盘方向 0=和输送线一致，1=强制水平；2=强制垂直
       */
      if (ssj[code] != null) {
        ssj[code].add(
          tray,
          connect,
          alarm,
          taskNo,
          title,
          code,
          movedir,
          traydir,
          alarmMessage,
          item
        );
      }
    }
  }
  if ($.isEmptyObject(srms) == false) {
    let size = srms.length;
    for (let i = 0; i < size; i++) {
      // 堆垛机对象。
      let item = srms[i];

      // 提示信息：堆垛机编号。
      let code = item["code"];
      let title = code;

      // 真表示是有托盘。
      let tray = 0;

      // 堆垛机任务号
      let taskNo = item["taskno"];

      // 当前位置。
      let column = item["column"];

      let alarmMessage = item["alarmMessage"];

      // 真表示右报警。
      let alarm = 0;

      // 真表示设备连接。
      let connect = 0;

      if (item["tray"]) {
        tray = 1;
      }
      if (item["alarm"]) {
        alarm = 1;
      }
      if (item["connect"]) {
        connect = 1;
      }
      if (ddj[code] != null) {
        ddj[code].add(
          tray,
          column,
          connect,
          alarm,
          taskNo,
          title,
          alarmMessage,
          [0, 0],
          item
        );
      }
    }
  }

  if ($.isEmptyObject(rgvs) == false) {
    let size = rgvs.length;
    for (let i = 0; i < size; i++) {
      // 堆垛机对象。
      let item = rgvs[i];

      // 提示信息：堆垛机编号。
      let code = item["code"];
      let title = code;

      // 真表示是有托盘。
      let tray = 0;

      // 堆垛机任务号
      let taskNo = item["taskno"];

      // 当前位置。
      let column = item["column"];

      let alarmMessage = item["alarmMessage"];

      // 真表示右报警。
      let alarm = 0;

      // 真表示设备连接。
      let connect = 0;

      if (item["tray"]) {
        tray = 1;
      }
      if (item["alarm"]) {
        alarm = 1;
      }
      if (item["connect"]) {
        connect = 1;
      }

      /**
       * tray 真表示有托盘;
       * connect 真表示连接正常
       * alarm 真表示有报警
       * taskNo 表示任务号
       * title 表示提示信息
       * code 表示设备编号
       * movedir 运动方向，0=静止；1=正传(left/up)；2=反转(right/down)
       * traydirect 表示托盘方向 0=和输送线一致，1=强制水平；2=强制垂直
       * column 表示当前位置
       */
      if (rrj[code] != null) {
        rrj[code].add(
          tray,
          column,
          connect,
          alarm,
          taskNo,
          title,
          alarmMessage,
          [0, 0],
          item
        );
      }
    }
  }
  if ($.isEmptyObject(coders) == false) {
    let size = coders.length;
    for (let i = 0; i < size; i++) {
      // 堆垛机对象。
      let item = coders[i];

      // 提示信息：堆垛机编号。
      let code = item["code"];
      let title = code;

      // 正转 左 or 上
      let movedir = item["movedir"];

      let alarmMessage = item["alarmMessage"];

      // 真表示是有托盘。
      let tray = 0;

      // 堆垛机任务号
      let taskNo = item["taskno"];

      // 托盘方向，默认0，根据输送线水平，垂直方向自动调整；1=强制水平；2=强制垂直。
      let traydir = 1;
      traydir = item["traydir"];
      // 真表示有报警。
      let alarm = 0;

      // 真表示设备连接。
      let connect = 0;

      if (item["tray"]) {
        tray = 1;
      }
      if (item["alarm"]) {
        alarm = 1;
      }
      if (item["connect"]) {
        connect = 1;
      }

      /**
       * tray 真表示有托盘;
       * connect 真表示连接正常
       * alarm 真表示有报警
       * taskNo 表示任务号
       * title 表示设备名称
       * code 表示设备编号
       * movedir 运动方向，0=静止；1=正传(left/up)；2=反转(right/down)
       * traydir 表示托盘方向 0=和输送线一致，1=强制水平；2=强制垂直
       */
      if (co1[code] != null) {
        co1[code].add(
          tray,
          connect,
          alarm,
          taskNo,
          title,
          code,
          movedir,
          traydir,
          alarmMessage
        );
      }
    }
  }
  if ($.isEmptyObject(hoists) == false) {
    let size = hoists.length;
    for (let i = 0; i < size; i++) {
      // 堆垛机对象。
      let item = hoists[i];

      // 提示信息：堆垛机编号。
      let code = item["code"];
      let title = code;

      // 正转 左 or 上
      let movedir = item["movedir"];

      let alarmMessage = item["alarmMessage"];

      // 真表示是有托盘。
      let tray = 0;

      // 堆垛机任务号
      let taskNo = item["taskno"];

      // 托盘方向，默认0，根据输送线水平，垂直方向自动调整；1=强制水平；2=强制垂直。
      let traydir = 1;
      traydir = item["traydir"];
      // 真表示有报警。
      let alarm = 0;

      // 真表示设备连接。
      let connect = 0;

      if (item["tray"]) {
        tray = 1;
      }
      if (item["alarm"]) {
        alarm = 1;
      }
      if (item["connect"]) {
        connect = 1;
      }

      /**
       * tray 真表示有托盘;
       * connect 真表示连接正常
       * alarm 真表示有报警
       * taskNo 表示任务号
       * title 表示设备名称
       * code 表示设备编号
       * movedir 运动方向，0=静止；1=正传(left/up)；2=反转(right/down)
       * traydir 表示托盘方向 0=和输送线一致，1=强制水平；2=强制垂直
       */
      if (ts1[code] != null)
        ts1[code].add(
          tray,
          connect,
          alarm,
          taskNo,
          title,
          code,
          movedir,
          traydir,
          alarmMessage
        );
    }
  }
  if ($.isEmptyObject(discharges) == false) {
    let size = discharges.length;
    for (let i = 0; i < size; i++) {
      // 堆垛机对象。
      let item = discharges[i];

      // 提示信息：堆垛机编号。
      let code = item["code"];
      let title = code;

      // 正转 左 or 上
      let movedir = item["movedir"];

      let alarmMessage = item["alarmMessage"];

      // 真表示是有托盘。
      let tray = 0;

      // 堆垛机任务号
      let taskNo = item["taskno"];

      // 托盘方向，默认0，根据输送线水平，垂直方向自动调整；1=强制水平；2=强制垂直。
      let traydir = 1;
      traydir = item["traydir"];
      // 真表示有报警。
      let alarm = 0;

      // 真表示设备连接。
      let connect = 0;

      if (item["tray"]) {
        tray = 1;
      }
      if (item["alarm"]) {
        alarm = 1;
      }
      if (item["connect"]) {
        connect = 1;
      }

      /**
       * tray 真表示有托盘;
       * connect 真表示连接正常
       * alarm 真表示有报警
       * taskNo 表示任务号
       * title 表示设备名称
       * code 表示设备编号
       * movedir 运动方向，0=静止；1=正传(left/up)；2=反转(right/down)
       * traydir 表示托盘方向 0=和输送线一致，1=强制水平；2=强制垂直
       */
      if (cp1[code] != null)
        cp1[code].add(
          tray,
          connect,
          alarm,
          taskNo,
          title,
          code,
          movedir,
          traydir,
          alarmMessage
        );
    }
  }
}
