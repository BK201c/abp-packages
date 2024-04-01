// 建立连接
// const serviceUrl = 'http://192.168.33.108:20001/api/WCSMS/monitor'
let connection = ''
function signalRConnect(serviceUrl) {
  console.info('正在尝试连接WS服务端...', serviceUrl)
  connection = new signalR.HubConnectionBuilder()
    .withUrl(serviceUrl)
    .withAutomaticReconnect()
    .build()
  connection.keepAliveIntervalInMilliseconds = 5000
  connection.onreconnected(async (id) => {
    const message = 'Layout|01'
    connection.invoke('Connected', message)

    console.info('已自动重新连接:' + message)
  })
  connection.onclose(async (error) => {
    if (error) {
      // 异常断开时,需要手动重新连接
      await connection.start()
    } else {
      console.info('已断开连接')
    }
  })
}
// signalR初始化,接收函数
function signalRMonitorInit() {
  connection
    .start()
    .then(() => {
      const message = 'Layout|01'
      connection.invoke('Connected', message)
    })
    .catch((err) => {
      console.log(err)
    })

  connection.on('SendMessage', (msg) => {
    let response = JSON.parse(msg)
    console.log('res:----------------------------------------', response)
    coverDataToNew(response)
  })
}

function startUpdate(serviceUrl) {
  signalRConnect(serviceUrl)
  signalRMonitorInit()
}
