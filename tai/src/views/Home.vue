<template>
  <div class="home">
    <div>
      <div>name:<mu-text-field v-model="name"></mu-text-field></div>
      <div>描述:<mu-text-field v-model="desc"></mu-text-field></div>
      <div class="dsc">
        <mu-button color="primary" small @click="add">添加</mu-button>
      </div>
    </div>
    <div class="label-item" v-for="item in roleList" :key="item.id">
      <span>{{ item.name }}--{{ item.desc }}</span>
      <mu-button color="secondary" small @click="del(item.id)">删除</mu-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      desc: "",
      roleList: []
    };
  },
  mounted() {
    this.getRoles();
  },
  methods: {
    getRoles() {
      this.$axios
        .get("http://zhouapi.utools.club/api/getrole", {})
        .then(res => {
          this.roleList = res.data.data;
        });
    },
    add() {
      this.$axios
        .post("http://zhouapi.utools.club/api/addrole", {
          name: this.name,
          desc: this.desc
        })
        .then(res => {
          this.$toast("添加成功");
          this.getRoles();
          this.name = "";
          this.desc = "";
        })
        .catch(() => {});
    },
    del(id) {
      this.$axios
        .post("http://zhouapi.utools.club/api/delrole", {
          id
        })
        .then(res => {
          this.$toast("删除成功");
          this.getRoles();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 10vw;
}
.dsc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.label-item {
  margin-top: 10vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
