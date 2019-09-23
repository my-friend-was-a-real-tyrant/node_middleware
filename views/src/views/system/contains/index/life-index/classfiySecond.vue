<template>
  <div class="classfiy" >
    <div :class="scrollTop > 30?'heard heard-fixed':'heard'">
      <div class="heard-top">
        <ul class="heard-top-ul" ref='heardtopul'>
          <li v-for="(item, index) in tabTitle" :key="index" :class="sortId == item.id ? 'active' : ''" @click="sortId = item.id,toOrder(item,index)">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="choose-list">
      <div class="choose-list-item" v-for="( item , index ) in list" :key="index" @click="toTar(item)" v-if='sortId>0'>
        <div class="list-item-left">
          <img v-if="item.status == 2&&item.pictures" :src="item.pictures[0]" alt="" class="list-item-left-img">
          <img v-if="item.status == 4" :src="item.img" alt="" class="list-item-left-img">
        </div>
        <div class="list-item-right">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-desc">{{ item.description }}</p>
          <div class="item-price">
            <p>团购价：</p>
            <p class="item-all-price" v-if="item.spellPrice == 0">{{ item.specialPrice }}</p>
            <p class="item-all-price" v-else>{{ item.spellPrice }}</p>
            <p>元</p>
            <p v-if="item.status == 2" class="item-all-content"> / {{ item.content }}</p>
          </div>
          <div class="item-btn">
            <p v-if="active == 0" class="item-btn-buy">立即购买</p>
            <p v-if="item.spelled == 1" class="item-btn-pt">立即拼团</p>
          </div>
        </div>
      </div>
      <div class="choose-list-item" v-for="( item , index ) in list" :key="index" @click="toTar(item)" v-if='sortId==-1'>
        <div class="list-item-left">
          <img :src="item.img" alt="" class="list-item-left-img">
        </div>
        <div class="list-item-right">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-desc">{{ item.description }}</p>
          <div class="item-price">
            <p>团购价：</p>
            <p class="item-all-price">{{ item.price }}</p>
            <p>元</p>
            <p v-if="item.status == 2" class="item-all-content"> /份</p>
          </div>
          <div class="item-btn">
            <p class="item-btn-buy">立即购买</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      scrollTop: "",
      active: "0",
      tabTitle: [],
      list: [],
      sortId: "",
    };
  },
  mounted() {
    this.sortId = this.$route.query.id;
    document.title=this.$route.query.name
    window.addEventListener("scroll", this.HandleScroll);
    this.init();
    this.getList();
  },
  methods: {
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
                id: element.id,
                router: null
              };
              this.tabTitle.push(temp);
            });
            this.tabTitle.unshift({
              name: "幸福团购",
              router: "/service/classfiySecond",
              id: -1
            });
            this.$refs.heardtopul.style.width =
              1.4 * this.tabTitle.length + "rem";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      if (this.sortId > 0) {
        this.$http({
          method: "get",
          url: "/api/mall/sort/getMerchandiseListBySortId",
          params: {
            sortId: this.sortId
          }
        })
          .then(response => {
            if (response.data.code === "00000") {
              let data = response.data.data;
                data.forEach(ele => {
                  ele.pictures = [
                    "http://system.zhongdapuhui.com" + ele.pictures[0]
                  ];
                });
                this.list = data;
            }
          })
          .catch(response => {});
      } else {
        this.$http({
          method: "get",
          url: "/api/mall/mall/getMerchandiseList"
        })
          .then(response => {
            if (response.data.code === "00000") {
              let data = response.data.merchandiseList;
              for (let i = 0; i < data.length; i++) {
                this.list.push(data[i]);
              }
            }
          })
          .catch(response => {});
      }
    },
    HandleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
    },
    toOrder(item) {
      this.list = [];
      document.title=item.name;
      this.getList();
    },
    toTar(item) {
      this.$router.push({
        path: "/mall/merchandiseInfo",
        query: {
          id: item.id,
          groupId: item.groupId
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common.less";
.classfiy {
  position: relative;
  .heard {
    width: 100%;
    position: relative;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    height: 0.7rem;
    &-fixed {
      position: fixed;
      top: 0;
      background: #fff;
      z-index: 3;
    }
    &-top {
      &-ul {
        background-color: white;
        height: 0.7rem;
        font-size: 0;
        border-bottom: 1px solid #eee;
        li {
          width: 1.4rem;
          display: inline-block;
          font-size: 0.28rem;
          color: #333;
          text-align: center;
          span {
            display: block;
            height: 0.66rem;
            line-height: 0.66rem;
            position: relative;
          }
        }
        .active {
          color: @active-color;
        }
        .active span:after {
          content: "";
          width: 0.8rem;
          height: 0.04rem;
          background-color: @active-color;
          position: absolute;
          bottom: -0.04rem;
          left: 50%;
          margin-left: -0.4rem;
        }
      }
    }
  }
  .choose-list-item {
    height: 3.14rem;
    &:not(:last-child) {
      border-bottom: 1px solid @border-e8;
    }
    display: flex;
    justify-content: center;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    .list-item-left {
      width: 2.64rem;
      height: 2.64rem;
      display: flex;
      align-content: center;
      margin-top: 0.25rem;
      &-img {
        width: 2.64rem;
        height: auto;
      }
    }
    .list-item-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 0.24rem;
      padding-left: 0.15rem;
      .item-name {
        font-size: 0.28rem;
        color: @base-color;
        margin-bottom: 0.16rem;
        .texts-overflow(@line: 1);
      }
      .item-desc {
        color: @color-99;
        .texts-overflow(@line: 1);
      }
      .item-price {
        color: @active-color;
        margin-bottom: 0.24rem;
        color: @color-fba;
        margin-top: 0.3rem;
        display: flex;
        align-items: baseline;
        .item-all-price {
          font-size: 0.44rem;
        }
        .item-all-content {
          width: 1.35999029rem;
          .texts-overflow(@line: 1);
        }
      }
      .item-btn {
        height: 0.52rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        &-buy {
          width: 1.8rem;
          height: 0.52rem;
          text-align: center;
          border-radius: 0.06rem;
          line-height: 0.52rem;
          color: #fff;
          background-color: @active-color;
        }
        &-pt {
          width: 1.8rem;
          height: 0.52rem;
          text-align: center;
          color: #fff;
          line-height: 0.52rem;
          background-color: rgba(255, 0, 0, 0.74);
          border-radius: 3px;
        }
      }
    }
  }
}
</style>
