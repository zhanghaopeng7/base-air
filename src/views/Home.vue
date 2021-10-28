<template>
  <div id="home">
      <div >
          <div style="text-align: center;">
              <div  style="position:relative;">
                 first Page  dev
              </div>
          </div>
      </div>
  </div>
</template>

<script>


export default {
  name: "home",

  data(){
    return{
        TempY:new Date().getFullYear(),
        TempM:new Date().getMonth()+1,
        selectorValue:'',
    }
  },

  async mounted(){

  },

  methods:{
      enterOther(){
          this.$router.push({
              name: 'other',
              params:{type:0}
          })
      },
  }
};
</script>
<style scoped>
    #home{
        height: 100vh;
        /*position: relative;*/
    }
    .card{
        box-shadow: 0 0 5px #efefef;
        padding:.2rem;
        background:#fff;
    }

</style>





