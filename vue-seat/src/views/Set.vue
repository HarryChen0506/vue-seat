<template>
    <div class="container">
        <section class="top">
            <h3>设置座位</h3>
        </section>
        <section class="main">
            <div class="left">
                <h3>座位图</h3>
                <div class="seat">
                    <div class="seat-container" @click="cancelSelected()">
                         <div class="seat-row" v-for="(itemRow, indexRow) in seatList" v-bind:key="itemRow+'-row'">
                            <div class="seat-one"
                                 v-bind:class="{ checked: itemCol.selected}"
                                 v-for="(itemCol, indexCol) in itemRow" v-bind:key="itemCol+'-col'"
                                 @click.stop="selectSeat(itemCol)">
                                <seat :name="itemCol.name"
                                      :origin-price="itemCol.originPrice"  
                                      :row-num="itemCol.rowNum" 
                                      :col-num="itemCol.colNum"
                                      :seat-status="itemCol.seatStatus"
                                      :ticket-status="itemCol.ticketStatus"></seat>
                            </div>
                        </div>
                    </div>                   
                </div>
                <div>
                    <pre>{{selectedList}}</pre>
                </div>

            </div>
            <div class="right">
                <div class="seat-config">
                    <h3>行与列配置</h3>
                    <section class="row">
                        <div class="header">行与列</div>
                        <div class="box">
                            <input class="f-l" type="text" placeholder="行" v-model="row">
                            <input class="f-l" type="text" placeholder="列" v-model="col">
                            <button class="f-l" @click="resetRowCol()">重置</button>
                        </div>
                    </section>  
                </div>  
                <div class="seat-config">
                     <h3>座位设置</h3>
                     <section class="row">
                        <div class="header">排</div>
                        <div class="box">
                            <input class="f-l" type="number" placeholder="行" v-model="seatSet.seat.rowNum">                           
                        </div>
                    </section>
                    <section class="row">
                        <div class="header">座</div>
                        <div class="box">
                            <input class="f-l" type="number" placeholder="行" v-model="seatSet.seat.colNum_from">
                            <span class="f-l" style="margin-right:10px">To</span>
                            <input class="f-l" type="number" placeholder="行" v-model="seatSet.seat.colNum_to">                          
                        </div>
                    </section>  
                    <section class="row">
                        <div class="header">状态</div>
                        <div class="box">
                            <select v-model="seatSet.seat.seatStatus">
                                <option v-for="option in seatSet.seatStatusList" v-bind:value="option.value">
                                    {{ option.name }}
                                </option>
                            </select>                     
                        </div>
                    </section>                                   
                    <div class="btn-group">
                        <button @click="setSeatTable()">确定</button>
                        <button @click="cancelSelected()">取消全选</button>
                    </div>
                </div>
                <div class="seat-config">
                     <h3>票面设置</h3>
                     <section class="row">
                        <div class="header">票面属性</div>
                        <div class="box">
                            <input class="f-l" type="number" placeholder="票面" v-model="seatSet.originPriceNum">                           
                            <select v-model="seatSet.color">                                
                                <option value="">请选择颜色</option>
                                <option v-for="option in seatSet.colorList" v-bind:value="option">
                                    {{ option }}
                                </option>
                            </select>  
                            <button @click="addOriginPrice()">添加</button>                      
                        </div>
                    </section>                                                      
                    <div class="btn-group">
                        <ul>
                            <li v-for="item in seatSet.originPriceList">
                                <span class="m_r_10">票面:{{item.originPriceNum}}</span>
                                <span class="m_r_10">颜色:{{item.color}}</span>
                                <button @click="removeOriginPrice(item, seatSet.originPriceList)">删除</button>
                            </li>
                        </ul>
                    </div>
                    <section class="row">
                        <div class="header">票面</div>
                        <div class="box">
                            <!--<input class="f-l" type="number" placeholder="行" v-model="seatSet.seat.originPrice">  -->
                            <select v-model="seatSet.originPrice">
                                <option v-for="option in seatSet.originPriceList" v-bind:value="option">
                                    {{ option.originPriceNum }}
                                </option>
                            </select>                         
                        </div>
                    </section>                                     
                    <div class="btn-group">
                        <button @click="setSeatOriginPrice()">确定</button>
                        <button @click="cancelSelected()">取消全选</button>
                    </div>

                </div>                   
                <div class="seat-config">
                     <h3>售票设置</h3>
                    <section class="row">
                        <div class="header">状态</div>
                        <div class="box">
                            <select v-model="seatSet.ticketStatus">
                                <option v-for="option in seatSet.ticketStatusList" v-bind:value="option.value">
                                    {{ option.name }}
                                </option>
                            </select>                     
                        </div>
                    </section>                    
                    <div class="btn-group">
                        <div style="display:block; max-height:150px; overflow:auto"><pre >{{seatSet}}</pre></div>
                        
                        <button @click="setSeatTicketStatus()">确定</button>
                        <button @click="cancelSelected()">取消全选</button>
                    </div>
                </div>

                

            </div>
        </section>
    </div>
</template>

<script>
import Seat from '../components/Seat.vue';
import * as Util from '../util/utiltool.js';

export default {
    name: 'set',
    data() {
        return {
            title: '设置座位',
            row: 5,
            col: 5,
            seatList:[],
            seat:{
                name: '座位',
                rowIndex: 0,
                colIndex: 0,
                rowNum: 1,
                colNum:1,
                seatStatus: 'null',
                ticketStatus: 'none',
                originPrice: {
                    originPrice: 0,
                    color: ''
                },
                selected: false
            },
            seatSet: {
                seat: {
                    name: '座位',                
                    rowNum: 1,
                    colNum_from:1,
                    colNum_to:1, 
                    seatStatus: 'null',                   
                },                
                ticketStatus: 'none',
                originPrice: {
                    originPriceNum: 0,
                    color: ''
                },
                seatStatusList:[
                    {
                        name: '空',
                        value: 'null',
                        code: 0
                    },{
                        name: '座位',
                        value: 'seat',
                        code: 1
                    }
                ],
                ticketStatusList: [
                    {
                        name: '未定义',
                        value: 'none',
                        code: 0
                    },{
                        name: '可卖',
                        value: 'valid',
                        code: 1
                    },{
                        name: '已卖',
                        value: 'soldout',
                        code: 2
                    }
                ],
                originPriceList: [],
                originPriceNum: 0,
                colorList: ['#ff5722','#03a9f4','#8bc34a','#9c27b0'],
                color: ''               
            },
            
        }
    },
    mounted: function (){
        this.initTable(this.row, this.col);
    },
    components: {
        Seat
    },
    computed: {        
        selectedList: function (){
            var list = [];
            this.seatList.forEach(function (item){
                item.forEach(function (seat){
                    if(seat.selected){
                        list.push(seat)
                    }                    
                })
            }) 
            return list
        }
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
                    var seat = Util.deepCopy(this.seat);
                    seat.colIndex = j;
                    seat.rowIndex = i;
                    rowList.push(seat)
                }
                this.seatList.push(rowList);
            }        
        },
        addOriginPrice: function (){
            var obj = {
                originPriceNum: this.seatSet.originPriceNum,
                color:  this.seatSet.color
            }
            this.seatSet.originPriceList.push(obj);
        },
        removeOriginPrice: function (item, list){
            var index = list.indexOf(item);
            if (index > -1) {
                list.splice(index, 1);
            }
        },
        selectSeat: function (seat){   //选中座位
            // console.log('选中的座位',seat)
            seat.selected = !seat.selected;
        },
        cancelSelected: function (){
            //取消选择
            this.selectedList.forEach((item)=>{
                item.selected = false
            })
        },
        setSeatTable: function (){
            var seatProps = this.seatSet.seat;
            //设置座位
            var arr = []; //座位号序列
            for(var i= parseInt(seatProps.colNum_from);  i<= parseInt(seatProps.colNum_to); i++){
                arr.push(i);
            }
            this.selectedList.forEach((item,index)=>{                
                for(var key in seatProps ){                    
                    item[key] = seatProps[key];
                } 
                item.colNum = arr[index];              
            })
        },
        setSeatTicketStatus: function (){
            this.selectedList.forEach((item,index)=>{                
               item.ticketStatus = this.seatSet.ticketStatus   
            })
        },
        setSeatOriginPrice: function (){
            //设置票面
            this.selectedList.forEach((item,index)=>{                
               item.originPrice = this.seatSet.originPrice   
            })
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
        // display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
    .f-l {
        float: left
    }
    .m_r_10 { 
        margin-right: 10px
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
            overflow: hidden;
            .seat {
                overflow: scroll;
                text-align: left;
                border: 1px solid #000;
                height: 400px;
                max-width:100%;
                .seat-container {
                    .seat-row {
                        display: flex;
                        flex-wrap: nowrap;
                        .seat-one {
                            // display: inline-block;
                            min-width: 50px;
                            height: 50px;
                            background-color: #EEF0F4;
                            color: #7B83A8;
                            margin: 5px;
                            &.checked {
                                border: 1px solid #000
                            }
                        }
                    }
                    
                }                
            }
        }
        .right {
            width: 300px;
            height: 800px;
            background-color: #F6E3E2;
            text-align: left;
            padding-left:20px;
            .row {
                display: flex;
                margin-top: 5px;
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
        .seat-config {
            margin-top: 20px;
            .btn-group {
                margin-top: 20px;
            }
        }
    }
</style>
