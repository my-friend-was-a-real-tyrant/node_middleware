<template>
    <div class="manger" v-title='"全部分类"'>
        <div class="manger-box">
            <div class="manger-box-list" v-for="(item, index) in items" :key="index" @click="toPage(item)">
                <img :src="item.icon" alt="">
                <div v-text="item.name"></div>
            </div>
        </div>
    </div>
</template>
<script>
import i1 from "../../../img/sh_xinfutuangou@2x.png";
export default {
  data() {
    return {
      items: [
        {
          name: "幸福团购",
          icon: i1,
          router: "/service/classfiySecond",
          id:-1
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    toPage(item) {
        this.$router.push({
          path: "/service/classfiySecond",
          query: {
            id: item.id,
            name:item.name
          }
        });
    },
    init() {
      this.$http({
        url: "/api/mall/sort/getMerchandiseSortList",
        params: {
          keywords: ""
        }
      })
        .then(res => {
          if (res.status == 200) {
            res.data.sortList.forEach(element => {
              const temp = {
                name: element.name,
                icon: "http://system.zhongdapuhui.com" + element.url,
                id: element.id,
                router: null
              };
              this.items.push(temp);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.manger {
  &-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex: none;
    &-list {
      width: 20%;
      height: 2.39997573rem;
      text-align: center;
      div {
        font-size: 0.23039767rem;
        color: #333;
        padding-top: 0.17279825rem;
      }
      img {
        width: 0.80639185rem;
        vertical-align: bottom;
      }
    }
  }
}
</style>
