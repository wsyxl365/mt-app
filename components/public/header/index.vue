<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar/>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import topBar from "./topbar.vue"
  import searchBar from "./searchbar.vue"
  export default {
    components: {
      topBar,
      searchBar
    }
  }
</script>

<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>
