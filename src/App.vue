<template>
  <div id="app">
    <keep-alive include="moreData">
        <router-view />
    </keep-alive>
    
  </div>
</template>

<script>
//  import { Landscape, Button,Toast} from 'mand-mobile'
  export default {
    name: "home",
    components: {
//          [Landscape.name]: Landscape,
//          [Button.name]: Button
    },
    data(){
      return{
         curI:1,
         showPic: false,
      }
    },
    methods:{
      EnterHome(){
        this.curI=1
        this.$router.replace({
          name: 'home'
        }).catch(err => {
          console.log('输出报错',err)
        })
      },
      EnterBase(){
        this.$router.push({
          name: 'baseInfo',
          params:{type:0}
        })
      },
    }
  }
</script>
<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
}
</style>
