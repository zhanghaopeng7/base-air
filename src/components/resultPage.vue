<template>
   <div id="resultPage">
       <div style="margin:0 1.6rem">
           <img style="width: 100%;" src="../assets/empty.png" alt=""/>
       </div>
       <p style="margin-bottom:0.5rem;font-size: 0.3rem;color:#111a34;text-align: center"> {{info}} </p>
   </div>
</template>

<script>
    
    export default {
        name: 'resultPage',
        props: ['type','info'],
        data:()=>({
        
       }),
    created(){

    },
    methods: {

    }
    }
</script>
<style lang="css" scoped>

</style>
