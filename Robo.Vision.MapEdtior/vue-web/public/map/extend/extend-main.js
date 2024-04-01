const addFloorBtnList = (mapAllData, originalData) => {
  console.log('已生成地图列表', mapAllData)
  Object.keys(mapAllData).forEach((floor) => {
    const floorBtn = `<div class="box">
      <button class="card bg-01 change-floor-btn" data-floor="${floor}">
        <span class="card-content" >${originalData[floor].mapName}</span>
      </button>
    </div>`
    $('#floorBtnList').append(floorBtn)
  })
}
