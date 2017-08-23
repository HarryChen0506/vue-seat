<template>
  <div class="seat-box" 
       v-bind:class="{null:status=='null',isSeat:status=='seat',valid: status=='valid',soldout: status=='soldout'}">
    <!--<div class="title">{{ msg }}</div>-->
    <section v-show="status!=='null'" >
      <div class="title">{{rowNum}}排{{colNum}}座</div>
      <div class="title">票面:{{originPrice.originPrice}}</div>
      <div>
        <span class="price-icon"  v-bind:style="{ backgroundColor: originPrice.color}" ></span>
      </div>
    </section>
    
    <section class="detail-box">
      <div class="detail">{{name}}</div>
      <div class="detail">排：{{rowNum}}</div>
      <div class="detail">列：{{colNum}}</div>      
      <div class="detail">票面：{{originPrice.originPrice}}</div>      
      <div class="detail">状态：{{status}}</div>      
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
    'status'
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
      &.null {
        opacity: 0.2;
      }
      &.isSeat {
        background-color:#CADAEC
      }
      &.valid {
        background-color: red
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
