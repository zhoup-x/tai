<template>
  <div class="home">
      <div class="dsc">
        <mu-button color="primary" small @click="editModal = true,modalType = 0">添加</mu-button>
      </div>
    <div class="label-item" v-for="item in roleList" :key="item.id">
      <span>{{ item.name }}--{{ item.descs }}</span>
      <div class="btn">
        <mu-button color="warning" small @click="editModal = true,form = item,modalType = 1"
          >修改</mu-button
        >
        <mu-button
          color="secondary"
          small
          style="margin-left:5px"
          @click="del(item.id)"
          >删除</mu-button
        >
      </div>
    </div>

    <!-- 弹框 -->
    <mu-dialog
      :title="modalType ? '添加' : '修改'"
      width="600"
      max-width="80%"
      :esc-press-close="false"
      :overlay-close="false"
      :open.sync="editModal"
    >
    <div>
      
      <div v-if="!modalType">name:<mu-text-field v-model="form.name"></mu-text-field></div>
      <div>描述:<mu-text-field v-model="form.descs"></mu-text-field></div>
    </div>

      <mu-button slot="actions" flat color="primary" @click="form = {},editModal = false"
        >取消</mu-button
      >
      <mu-button slot="actions" flat color="primary" @click="submit"
        >确定</mu-button
      >
    </mu-dialog>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      form: {
        name: "",
        descs: ""
      },
      roleList: [],
      editModal: false
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
        .post("http://zhouapi.utools.club/api/addrole", this.form)
        .then(res => {
          this.$toast("添加成功");
          this.getRoles();
          this.form = {};
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
    },
    update() {
      let params = {
        id: this.form.id,
        descs: this.form.descs
      };
      this.$axios
        .post("http://zhouapi.utools.club/api/updaterole", params)
        .then(res => {
          this.$toast("修改成功");
          this.getRoles();
          this.form = {};
          this.editModal = false;
        });
    },
    submit(){
      console.log(this.modalType);
      
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
