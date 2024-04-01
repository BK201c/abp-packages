<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import * as go from '@/assets/gojs/go-module'
import { init } from './lib/go-extend'
import type { CSSProperties } from 'vue'
import request from '@/service/request'

let myDiagram: any = null

const activeKey = ref(['1'])
const currentMap = ref()
const currentMapData = ref({
  mapName: '',
  mapVersion: '',
  mapProject: '',
  mapJsonStr: '',
  mapServiceUrl: ''
})
const mapDataJson = ref<any>({})
const mapLists = ref([])

//获取地图数据
const formRef = ref()
const visible = ref(false)
const isAddNew = ref(true)
const needRestart = ref(true)
const formState = ref({
  mapName: '',
  mapVersion: '',
  mapProject: '',
  mapJsonStr: '',
  mapServiceUrl: ''
})

const fileList = ref<any>([])

const handleRemove: any = (file: any) => {
  fileList.value = []
}

const beforeUpload: any = (file: any) => {
  fileList.value = [file]
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = () => {
    formState.value.mapJsonStr = reader.result as string
  }
  return false
}

//获取地图列表
const getMapList = () => {
  request.get('/api/app/map-data').then((res: any) => {
    mapLists.value = res?.items
  })
}

//新增地图
const addMap = () => {
  visible.value = true
  isAddNew.value = true
}
const onOk = () => {
  formRef.value
    .validateFields()
    .then((values: any) => {
      visible.value = false
      if (isAddNew.value) {
        if (needRestart.value) {
          formState.value.mapJsonStr = ''
          clearMap()
        }
        request.post('/api/app/map-data', formState.value).then((res) => {
          formRef.value.resetFields()
          getMapList()
        })
      } else {
        const url = `/api/app/map-data/${currentMap.value}`
        request.put(url, toRaw(formState.value)).then((res) => {
          console.log('saveMap', res)
          getMapList()
        })
      }
    })
    .catch((info: any) => {
      console.log('Validate Failed:', info)
    })
}

// 删除地图
const delMap = () => {
  clearMap()
  const url = `/api/app/map-data/${currentMap.value}`
  request.delete(url).then((res) => {
    console.log('delMap', res)
    currentMap.value = ''
    getMapList()
  })
}

//地图变化
const changeMap = (value: string, item: any) => {
  currentMapData.value = { ...item }
  console.log('changeMap', formState)
  if (item.mapJsonStr != '') {
    generateMapFromJson(item.mapJsonStr)
  } else {
    clearMap()
  }
}

// 导出地图
const exportMap = () => {}

//导入地图
const importMap = () => {
  visible.value = true
}

//通过json加载地图
const generateMapFromJson = (loadedString: string) => {
  myDiagram.model = go.Model.fromJson(loadedString)
}

// // 生成画布基底
const createGroup = (myDiagram: any) => {
  myDiagram.model = new go.GraphLinksModel([
    { key: 'G1', isGroup: true, pos: '0 0', size: '1500 800', title: '基础画布' }
  ])
}

//清空图层
const clearMap = () => {
  console.log('清空图层')
  myDiagram.clear()
  createGroup(myDiagram)
}

//保存图层对象
const saveMap = () => {
  console.log('保存地图', mapDataJson.value)
  const url = `/api/app/map-data/${currentMap.value}`
  const query = {
    mapName: currentMapData.value.mapName,
    mapVersion: currentMapData.value.mapVersion,
    mapProject: currentMapData.value.mapProject,
    mapServiceUrl: currentMapData.value.mapServiceUrl,
    mapJsonStr: JSON.stringify(mapDataJson.value)
  }
  request.put(url, query).then((res) => {
    console.log('saveMap', res)
    getMapList()
  })
}

const editorMap = () => {
  console.log('保存地图', mapDataJson.value)
  formState.value = { ...currentMapData.value }
  visible.value = true
  isAddNew.value = false
  needRestart.value = false
}

onMounted(() => {
  let $ = go.GraphObject.make
  myDiagram = $(go.Diagram, 'myDiagramDiv', {
    grid: $(
      go.Panel,
      'Grid',
      { gridCellSize: new go.Size(35, 35) },
      $(go.Shape, 'LineH', { stroke: 'lightgray' }),
      $(go.Shape, 'LineV', { stroke: 'lightgray' })
    ),
    // support grid snapping when dragging and when resizing
    'draggingTool.isGridSnapEnabled': true, //栅格对齐
    'draggingTool.gridSnapCellSpot': go.Spot.Center, // 居中时,栅格对齐
    'resizingTool.isGridSnapEnabled': true, //缩放栅格时，栅格对齐
    // For this sample, automatically show the state of the diagram's model on the page
    ModelChanged: (e: any) => {
      if (e.isTransactionFinished) {
        const json = myDiagram.model.toJson()
        mapDataJson.value = JSON.parse(json)
      }
    },
    'animationManager.isEnabled': false,
    'undoManager.isEnabled': true
  })
  init(myDiagram, $)
  createGroup(myDiagram)
  getMapList()
})

const headerStyle: CSSProperties = {
  color: '#fff',
  height: 64,
  paddingInline: 50,
  backgroundColor: '#fff',
  lineHeight: '64px'
}

const contentStyle: CSSProperties = {
  minHeight: 120,
  backgroundColor: '#fff',
  color: '#fff',
  height: '90vh',
  border: '1px solid #d9d9d9'
}

const siderStyle: CSSProperties = {
  backgroundColor: '#f7f7f7',
  lineHeight: '120px',
  height: '100vh',
  overflowY: 'hidden',
  color: '#fff'
}
const customStyle =
  'background: #fff;border-radius: 4px;margin-bottom: 10px;border:0;overflow: hidden'
</script>

<template>
  <div>
    <a-layout class="container">
      <a-layout-sider :style="siderStyle">
        <a-collapse
          v-model:activeKey="activeKey"
          :bordered="false"
          style="background: rgb(255, 255, 255)"
        >
          <a-collapse-panel key="1" header="堆垛机" :forceRender="true" :style="customStyle">
            <div id="myPaletteSmall" style="width: 140px; height: 340px"></div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="输送线" :forceRender="true" :style="customStyle">
            <div id="myPaletteTall" style="width: 140px; height: 340px"></div>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="RGV" :forceRender="true" :style="customStyle">
            <div id="myPaletteWide" style="width: 140px; height: 340px"></div>
          </a-collapse-panel>
          <a-collapse-panel key="4" header="其它设备" :forceRender="true" :style="customStyle">
            <div id="myPaletteBig" style="width: 140px; height: 340px"></div>
          </a-collapse-panel>
          <a-collapse-panel key="5" header="文本" :forceRender="true" :style="customStyle">
            <div id="myPaletteText" style="width: 140px; height: 340px"></div>
          </a-collapse-panel>
        </a-collapse>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="headerStyle">
          <a-row>
            <a-col :span="24">
              <a-flex gap="middle" horizontal align="center">
                <a-input-group compact>
                  <a-select
                    @select="changeMap"
                    :options="mapLists"
                    :field-names="{ label: 'mapName', value: 'id' }"
                    v-model:value="currentMap"
                    style="width: 20%"
                  >
                  </a-select>
                  <a-button @click="addMap">新增</a-button>
                  <a-button type="primary" info @click="editorMap">编辑</a-button>
                  <a-button type="primary" danger @click="delMap">删除</a-button>
                </a-input-group>
                <a-space>
                  <a-button type="primary" @click="saveMap">保存</a-button>
                  <a-button @click="clearMap">重置</a-button>
                  <!-- <a-button @click="importMap">导入</a-button> -->
                  <!-- <a-button @click="exportMap">导出</a-button> -->
                </a-space>
              </a-flex>
            </a-col>
          </a-row>
        </a-layout-header>
        <a-layout-content :style="contentStyle"
          ><div id="myDiagramDiv" class="myDiagramDiv"></div
        ></a-layout-content>
      </a-layout>
      <div id="myInspectorDiv" class="inspector"></div>
    </a-layout>
    <a-modal v-model:open="visible" title="新增地图" ok-text="提交" cancel-text="取消" @ok="onOk">
      <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
        <a-form-item
          name="mapName"
          label="地图名称"
          :rules="[{ required: true, message: '地图名称必填！' }]"
        >
          <a-input v-model:value="formState.mapName" />
        </a-form-item>
        <a-form-item name="mapProject" label="所属项目">
          <a-input v-model:value="formState.mapProject" />
        </a-form-item>
        <a-form-item name="mapServiceUrl" label="设备数据同步地址">
          <a-input v-model:value="formState.mapServiceUrl" />
        </a-form-item>
        <a-form-item name="upload" label="上传文件">
          <a-upload
            :file-list="fileList"
            :max-count="1"
            :before-upload="beforeUpload"
            @remove="handleRemove"
          >
            <a-button> 点击上传 </a-button>
          </a-upload>
        </a-form-item>
        <a-form-item label="从空白画布开始？">
          <a-switch v-model:checked="needRestart" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
