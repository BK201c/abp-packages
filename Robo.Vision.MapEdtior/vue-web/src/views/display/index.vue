<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const fIframe = ref<any>()
const BASE_URL = import.meta.env.VITE_BASE_URL

const sendData = (data: any) => {
  fIframe.value.onload = function () {
    fIframe.value.contentWindow.receiveData(data)
  }
}
onMounted(() => {
  sendData(BASE_URL)
})
</script>

<style lang="scss">
.if_box {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div class="if_box">
    <iframe src="/map/index.html" style="height: 100vh; width: 100%" ref="fIframe"></iframe>
  </div>
</template>
