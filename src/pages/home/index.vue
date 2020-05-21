<template>
  <div class="pages_home">
    <el-button @click="alertAdd" type="primary">添加</el-button>
    <el-table :data="listData" border style="width: 100%" height="385">
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="age" label="年龄" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="200"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="alertUpdate(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="myDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框 -->
    <el-dialog :title="title" :visible.sync="alertVisible" width="500px" center>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="ruleForm.gender"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "./styles.less";
import { mapState } from "vuex";

export default {
  created() {
    this.initData()
  },

  computed: {
    ...mapState(["listData", "title", "currentId"])
  },

  methods: {

    //点击添加打开对话框
    alertAdd() {
      this.clearObj()
      this.$store.commit('HOME_DIFFRENT_MUTATIONS', { title: '添加' })
      this.$data.alertVisible = true
    },

    //点击修改打开对话框
    alertUpdate(obj) {
      const { name, age, gender } = obj;
      this.ruleForm = { ...this.ruleForm, name, age, gender }
      this.$store.commit('HOME_DIFFRENT_MUTATIONS', { title: '修改',id: obj.id });
      this.$data.alertVisible = true
    },

    //提交表单
    submitForm() {
      const { name, age, gender } = this.ruleForm
      if (this.title === "添加") {
        const obj = { name, age, gender }
        this.$store.dispatch('HOME_ADD_ADCTIONS', obj)
      } else {
        const obj = { name, age, gender, id: this.currentId }
        this.$store.dispatch('HOME_UPDATE_ADCTIONS', obj)
      }
      this.initData()
      this.$data.alertVisible = false
    },

    //删除数据
    myDelete(id) {
      this.$store.dispatch('HOME_DELETE_ACTIONS', { id })
      this.initData()
    },

    //初始化数据
    initData() {
      this.$store.dispatch('HOME_GETDATA_ACTIONS')
    },

    //清空表单数据
    clearObj() {
      for (let temp in this.ruleForm) {
        this.ruleForm[temp] = ''
      }
    }

  },

  data() {
    var check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(`${rule.field}不能为空!`))
      }
    };
    return {
      alertVisible: false,
      ruleForm: {
        name: "",
        age: "",
        gender: ""
      },
      rules: {
        name: [{ validator: check, trigger: "blur" }],
        age: [{ validator: check, trigger: "blur" }],
        gender: [{ validator: check, trigger: "blur" }]
      }
    };
  }
};
</script>