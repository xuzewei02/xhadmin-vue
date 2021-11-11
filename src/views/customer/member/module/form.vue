<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-form-item
        label="手机号码"
        prop="mobileNumber"
      >
        <el-input
          v-model="form.mobileNumber"
          style="width: 370px;"
          readonly
        />
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input
            v-model="form.name"
            style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
        v-if="form.pid !== 0"
        label="昵称"
        prop="enabled"
      >
        <el-input
            v-model="form.nickName"
            style="width: 370px;"
        />
      </el-form-item>
      <el-form-item
          v-if="form.pid !== 0"
          label="状态"
          prop="status"
      >
        <el-radio
            v-for="item in memberStatus"
            :key="item.id"
            v-model="form.enabled"
            :label="item.value === 'true'"
        >
          {{ item.label }}
        </el-radio>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="crud.cancelCU"
      >
        取消
      </el-button>
      <el-button
        :loading="crud.status.cu === 2"
        type="primary"
        @click="crud.submitCU"
      >
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'

const defaultForm = {
  id: null,
  name: '',
  jobSort: 999,
  status: true
}
export default {
  mixins: [form(defaultForm)],
  props: {
    memberStatus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        jobSort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
