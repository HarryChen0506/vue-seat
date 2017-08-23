<template>
  <div class="seat-box" 
       v-bind:class="{null:seatStatus=='null',isSeat:seatStatus=='seat',valid: ticketStatus=='valid',soldout: ticketStatus=='soldout'}">
    <!--<div class="title">{{ msg }}</div>-->
    <section v-show="seatStatus!=='null'" >
      <div class="title">{{rowNum}}排{{colNum}}座</div>
      <div class="title">票面:{{originPrice.originPriceNum}}</div>
      <div>
        <span class="price-icon"  v-bind:style="{ backgroundColor: originPrice.color}" ></span>
      </div>
    </section>
    
    <section class="detail-box">
      <div class="detail">{{name}}</div>
      <div class="detail">排：{{rowNum}}</div>
      <div class="detail">列：{{colNum}}</div>      
      <div class="detail">票面：{{originPrice.originPriceNum}}</div>      
      <div class="detail">状态：{{ticketStatus}}</div>      
    </section>    
  </div>
</template>

<script>
export default {
  name: 'seat',
  data () {
    return {
      msg: '座位'
    }
  },
  props: [
    'rowNum',
    'colNum',
    'name',
    'originPrice',
    'seatStatus',
    'ticketStatus'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    h1, h2 {
        font-weight: normal;
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
    .seat-box {
      text-align: center;
      // overflow: hidden;
      position: relative;
      height: 100%;
      color: #fff;
      &.null {
        opacity: 0.2;
      }
      &.isSeat {
        background-color:#CADAEC
      }
      &.valid {
        background-color: lightseagreen
      }
      &.soldout {
        background-color: gray
      }
      .title {
        font-size: 12px;
      }
      &:hover {
         .detail-box {
           display: block;
         }
      }
      .price-icon {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius:5px ;
      }
      .detail-box {
        display: none;
        padding: 2px;
        position: absolute;
        z-index: 10;
        top: 0px;
        right: -20px;
        font-size: 10px;
        background-color: #000;
        color: #fff;
        border-radius: 4px;
      }

    }
    
</style>
