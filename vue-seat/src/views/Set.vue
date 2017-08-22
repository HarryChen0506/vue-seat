<template>
    <div class="container">
        <section class="top">
            <h3>设置座位</h3>
        </section>
        <section class="main">
            <div class="left">
                <h3>座位图</h3>
                <div class="seat">
                    <div v-for="(itemRow, indexRow) in seatList" v-bind:key="itemRow+'-row'">
                        <div v-for="(itemCol, indexCol) in itemRow" class="seat-one" v-bind:key="itemCol+'-col'">
                             <seat></seat>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <h3>配置</h3>
                <section class="row">
                    <div class="header">行与列</div>
                    <div class="box">
                        <input class="f-l" type="text" placeholder="行" v-model="row">
                        <input class="f-l" type="text" placeholder="列" v-model="col">
                        <button class="f-l" @click="resetRowCol()">重置</button>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import Seat from '../components/Seat.vue'
export default {
    name: 'set',
    data() {
        return {
            title: '设置座位',
            row: 3,
            col: 3,
            seatList:[],
            seat:{
                name: '座位'
            }
        }
    },
    mounted: function (){
        this.initTable(this.row, this.col);
    },
    components: {
        Seat
    },
    methods: {
        resetRowCol: function(){
            this.initTable(this.row, this.col);
        },
        initTable: function(row,col){
            this.seatList = [];
            for(var i=0; i<row; i++){
                var rowList = [];
                for(var j=0; j<col; j++){
                    rowList.push(this.seat)
                }
                this.seatList.push(rowList);
            }        
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    h1,
    h2,
    h3,
    h4 {
        font-weight: normal;
        margin: 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    .f-l {
        float: left
    }

    .container {
        width: 1000px;
        margin: 0 auto;
    }

    .top {
        background-color: #CADAEC;
        line-height: 100px
    }

    .main {
        display: flex;
        .left {
            flex: 1;
            .seat {
                text-align: left;
                border: 1px solid #000;
                height: 700px;
                .seat-one {
                    display: inline-block;
                    width: 50px;
                    height: 50px;
                    background-color: #EEF0F4;
                    color: #7B83A8;
                    margin: 5px
                }
            }
        }
        .right {
            width: 300px;
            height: 800px;
            background-color: #F6E3E2;
            .row {
                display: flex;
                margin-top: 20px;
                .header {
                    width: 100px;

                }
                .box {
                    flex: 1;
                    // display: flex;
                    input {
                        margin-right: 10px;
                        width: 30px;
                    }
                }
            }
        }
    }
</style>
