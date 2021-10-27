<template>
    <div @click="back" id="other">
        <result/>
    </div>
</template>


<script>
    import result from '@/components/resultPage.vue'
    export default {
        name: "other",

        data(){
            return{
                TempY:new Date().getFullYear(),
                TempM:new Date().getMonth()+1,
                selectorValue:'',
            }
        },
        components:{
            'result': result,
        },
        async mounted(){

        },

        methods:{
            back(){
                history.go(-1)
            },

        }
    };
</script>
<style scoped>

</style>
<style >

</style>




