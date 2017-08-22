<template>
  <div class="seat-box">
    <div class="title">{{ msg }}</div>
    
  </div>
</template>

<script>
export default {
  name: 'seat',
  data () {
    return {
      msg: '座位'
    }
  }
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
      .title {
        font-size: 12px;
      }
    }
    
</style>
