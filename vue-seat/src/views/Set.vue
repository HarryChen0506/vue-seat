<template>
    <div class="container">
        <section class="top">
            <h3>设置座位</h3>
        </section>
        <section class="main">
            <div class="left">
                <h3>座位图</h3>
                <div class="seat" id="seat-box" v-seat-box="{methods: show}" >
                    <div class="seat-container"> 
                            <!-- @click="cancelSelected()"-->
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
                        <button @click="setSeatTicketStatus()">确定</button>
                    </div>
                </div>
                <div style="display:block; max-height:150px; overflow:auto"><pre >{{seatSet}}</pre></div>

                

            </div>
        </section>
    </div>
</template>

<script>
import Seat from '../components/Seat.vue';
import * as Util from '../util/utiltool.js';
import Vue from 'vue';
import $ from 'jquery';


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
        show: function (){
            // console.log(this.selectedList);
            // console.log('组件回调', $('#seat-box'));
            this.cancelSelected();
            var $seatList = $('#seat-box').find("div.seat-one"); 
            // var seatList = document.querySelectorAll('div.seat-one');
            for(var i=0; i<$seatList.length; i++){
                var item = $($seatList[i]);
                if(item.hasClass('seled')){
                     item.trigger('click');
                }else{

                }
            }
            // $seatList.forEach(function(item){
            //     if($(item).hasClass('seled')){
            //         $(item).trigger('click');
            //     }
            // })
           
        },
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
            seat.selected = true;
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

Vue.directive('seatBox', {
  bind: function (el, binding, vNode) {    
  },
  inserted: function (el, binding, vNode){
    //  console.log('inserted')
     var value = binding.value;     
   
    //鼠标下按事件  mouseDown 
    $(el).on('mousedown', function(){  
        console.log('mouseDown')
        var $seatList = $(this).find("div.seat-one"); 
        var evt = window.event || arguments[0];
        //如果对象不是选座盒子，则ruturn        
        var startX = (evt.x || evt.clientX); 
        var startY = (evt.y || evt.clientY); 
        var $selDiv = $("<div></div>");
        $selDiv.css({
            position:'absolute',
            width: '0px',
            height: '0px',
            fontSize: '0px',
            margin: '0px',
            padding: '0px',
            border: '1px dashed #0099FF',
            backgroundColor: '#C3D5ED',
            zIndex: '1000',
            filter: 'alpha(opacity:60)',
            opacity: 0.6,
            display: 'none'
        });
        $selDiv.attr('id','selectDiv');
        $selDiv.attr('class','selectDiv');
        $selDiv.css({
            left: startX + "px",
            top: startY + "px"
        })        
        $selDiv.appendTo($('body'));
        var isSelect = true;  //是否有选择框

        var _x = null; 
        var _y = null;
        // evt.stopPropagation();  

        $(el).on('mousemove',function(){
            // console.log('move')
            evt = window.event || arguments[0];
            if (isSelect) {
                if($selDiv.css('display') == "none") { 
                    $selDiv.css('display',''); 
                } 
                _x = (evt.x || evt.clientX); 
                _y = (evt.y || evt.clientY);
                $selDiv.css('left', Math.min(_x, startX) + "px");
                $selDiv.css('top',  Math.min(_y, startY) + "px");
                $selDiv.css('width',  Math.abs(_x - startX-10) + "px");
                $selDiv.css('height',  Math.abs(_y - startY-10) + "px");

                var _l =  $selDiv.offset().left;   //选择盒子距离页面左边的距离
                var _t =  $selDiv.offset().top;     //选择盒子距离页面顶部的距离
                var _w = $selDiv.width();          //选择盒子宽度
                var _h = $selDiv.height();         //选择盒子高度
                // console.log('-l',_l)
                // console.log('_t',_t)
                for(var i=0; i<$seatList.length; i++){
                    var sl = $($seatList[i]).width() + $($seatList[i]).offset().left;   //元素最右边的坐标
                    var st = $($seatList[i]).height() + $($seatList[i]).offset().top;   //元素最下面的坐标

                    if ( sl > _l && 
                        st > _t && 
                        $($seatList[i]).offset().left < _l + _w &&
                        $($seatList[i]).offset().top < _t + _h ) { 
                        if (!$($seatList[i]).hasClass("seled")) { 
                            $($seatList[i]).addClass("seled")
                        }
                    } else { 
                        if ($($seatList[i]).hasClass("seled")) { 
                          $($seatList[i]).removeClass("seled")
                        } 
                    } 
                }
            }  
        }) 
        // 右键取消所选
        $(el).on("contextmenu", function(){
            // console.log('鼠标右键')            
            var $seatList = $(this).find("div.seat-one"); 
            for(var i=0; i<$seatList.length; i++){                  
                 $($seatList[i]).removeClass("seled")                    
            }
             //触发回调            
            value.methods() 
            $seatList = null, _x = null, _y = null, $selDiv = null, startX = null, startY = null, evt = null; 
        })
        $('body').on('mouseup',function (){
            console.log('mouseup')
            isSelect = false; 
            if($selDiv) { 
                $selDiv.remove();
                // $('.selectDiv').remove();
            }
            if(true){
                console.log(evt);
            } 
            
            //触发回调            
            value.methods() 
            $seatList = null, _x = null, _y = null, $selDiv = null, startX = null, startY = null, evt = null;  
            $('body').unbind(); 
        })
    })


  },
  update: function (el, binding, vNode) {
    //   console.log('update')

  }
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    body {
        -moz-user-select: none;  
        -webkit-user-select: none;  
        -ms-user-select: none;  
        -khtml-user-select: none;  
        user-select: none;
    }
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
                            &.seled {
                                 border: 1px solid red
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
                text-align: right;
                padding-right: 20px
            }
        }
    }
</style>
