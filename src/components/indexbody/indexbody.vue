<template>
  <div id="indexbody" >
    <div >
      <IndexHeader></IndexHeader>
      <index-center></index-center>
    </div>

  </div>
</template>

<script>
  import IndexHeader from '../indexheader/indexheade.vue'
  import IndexCenter from '../indexcenter/indexcenter.vue'
  export default {
    name: 'indexbody',
    data () {
      return {
      }
    },
    components: {
      IndexHeader,
      IndexCenter
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
</style>
