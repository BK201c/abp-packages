// "{"srms":[{"code":"SRM_N01","taskno":"SRM202211170000040","tray":0,"alarm":0,"connect":1,"column":14}]}"
// alarm 报警标志   connect 连接状态   tray 托盘  left 左箭头  right 右箭头  up 上箭头 down 下箭头 column当前位置

const toNativeCOVObj = (obj) => {
  const result = {
    code: obj.code,
    taskno: obj.cmdNo,
    alarm: obj.isAlarm,
    connect: obj.isConnect,
    column: obj.x,
    alarmMessage: obj.alarmMessage,
    tray: obj.isHasGoods,
    traydir: obj.traydir || 0,
    isAuto: obj.isAuto,
    isFree: obj.isFree,
    palletBarcode: obj.palletBarcode,
    cmdNo: obj.cmdNo,
    movedir: obj.movedir || 0,
    name: obj.name,
    usedFlag: obj.usedFlag,
  };
  return result;
};
const toNativeRGVObj = (obj) => {
  const result = {
    code: obj.code,
    taskno: obj.cmdNo,
    alarm: obj.isAlarm,
    connect: obj.isConnect,
    column: obj.y,
    alarmMessage: obj.alarmMessage,
    tray: obj.isHasGoods,
    traydir: obj.traydir || 0,
    isAuto: obj.isAuto,
    isFree: obj.isFree,
    palletBarcode: obj.palletBarcode,
    cmdNo: obj.cmdNo,
    movedir: obj.movedir || 0,
    name: obj.name,
    usedFlag: obj.usedFlag,
  };
  return result;
};
const toNativeSRMObj = (obj) => {
  const result = {
    code: obj.code,
    taskno: obj.cmdNo,
    alarm: obj.isAlarm,
    connect: obj.isConnect,
    column: obj.x,
    alarmMessage: obj.alarmMessage,
    tray: obj.isHasGoods,
    traydir: obj.traydir || 0,
    isAuto: obj.isAuto,
    isFree: obj.isFree,
    palletBarcode: obj.palletBarcode,
    cmdNo: obj.cmdNo,
    movedir: obj.movedir || 0,
    name: obj.name,
    usedFlag: obj.usedFlag,
  };
  return result;
};

const toNativeDevObj = (obj) => {
  const result = {
    code: obj.code,
    taskno: obj.cmdNo,
    alarm: obj.isAlarm,
    connect: obj.isConnect,
    column: obj.x,
    alarmMessage: obj.alarmMessage,
    traydir: obj.traydir || 0,
    isAuto: obj.isAuto,
    isFree: obj.isFree,
    palletBarcode: obj.palletBarcode,
    cmdNo: obj.cmdNo,
    movedir: obj.movedir || 0,
    name: obj.name,
    usedFlag: obj.usedFlag,
  };
  return result;
};

function coverDataToNew(res) {
  new Promise((resolve, reject) => {
    const result = {
      srms: [],
      rgvs: [],
      convs: [],
      coders: [],
      hoists: [],
      discharges: [],
    };
    let obj;
    res.forEach((e) => {
      switch (e.devType) {
        case "COV":
          obj = toNativeCOVObj(e);
          result.convs.push(obj);
          break;
        case "RGV":
          obj = toNativeRGVObj(e);
          result.rgvs.push(obj);
          break;
        case "SRM":
          obj = toNativeSRMObj(e);
          result.srms.push(obj);
          break;
        case "CODER":
          obj = toNativeDevObj(e);
          result.coders.push(obj);
          break;
        case "HOIST":
          obj = toNativeDevObj(e);
          result.hoists.push(obj);
          break;
        case "DISCHARGE":
          obj = toNativeDevObj(e);
          result.discharges.push(obj);
          break;
        default:
          break;
      }
    });
    resolve(result);
  }).then((res) => {
    updateAllByService(res);
  });
}
