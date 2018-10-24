<template>
  <el-container class="layout-default">
    <el-header>
      <my-header/>
    </el-header>
    <el-main>
      <div>
        <nuxt/>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
  import MyHeader from "@/components/public/header/index"
  export default {
    components: {
      MyHeader
    }
  }
</script>
<style>

</style>
