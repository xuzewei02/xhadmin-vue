<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <label class="el-form-item-label">memberId</label>
        <el-input v-model="query.memberId" clearable placeholder="memberId" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <label class="el-form-item-label">创建时间</label>
        <el-input v-model="query.createTime" clearable placeholder="创建时间" style="width: 185px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
          <el-form-item label="手机号" prop="mobileNumber">
            <el-input v-model="form.mobileNumber" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="证件类型">
            未设置字典，请手动设置 Select
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="form.identityNumber" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="系统生成会员名">
            <el-input v-model="form.userName" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="form.sex" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="出生日期(生日)">
            <el-input v-model="form.birthdayDate" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="状态 ENABLE:有效;DISABLE:无效" prop="status">
            <el-input v-model="form.status" style="width: 370px;" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="mobileNumber" label="手机号" />
        <el-table-column prop="identityType" label="证件类型" />
        <el-table-column prop="identityNumber" label="证件号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="nickName" label="昵称" />
        <el-table-column prop="userChannel" label="渠道(SELF:自营)" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="birthdayDate" label="出生日期(生日)" />
        <el-table-column prop="userType" label="用户类型(EU:企业用户;CU:个人用户)" />
        <el-table-column prop="status" label="状态 ENABLE:有效;DISABLE:无效">
          <template slot-scope="scope">
            {{ dict.label.member_status[scope.row.status] }}
          </template>
        </el-table-column>
        <el-table-column prop="wcUnionId" label="微信union_id" />
        <el-table-column prop="alUnionId" label="支付宝union_id" />
        <el-table-column v-if="checkPer(['admin','tsMember:edit','tsMember:del'])" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudTsMember from '@/api/tsMember'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

const defaultForm = { memberId: null, memberCustomerId: null, mobileNumber: null, password: null, identityType: null, identityNumber: null, name: null, nickName: null, userName: null, userChannel: null, sex: null, email: null, birthdayDate: null, userType: null, status: null, wcUnionId: null, alUnionId: null, createTime: null, createBy: null, updateTime: null, updateBy: null }
export default {
  name: 'TsMember',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  dicts: ['member_status'],
  cruds() {
    return CRUD({ title: '会员管理', url: 'api/tsMember', idField: 'memberId', sort: 'memberId,desc', crudMethod: { ...crudTsMember }})
  },
  data() {
    return {
      permission: {
        add: ['admin', 'tsMember:add'],
        edit: ['admin', 'tsMember:edit'],
        del: ['admin', 'tsMember:del']
      },
      rules: {
        memberId: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        memberCustomerId: [
          { required: true, message: '会员业务Id不能为空', trigger: 'blur' }
        ],
        mobileNumber: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态 ENABLE:有效;DISABLE:无效不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '创建时间不能为空', trigger: 'blur' }
        ],
        createBy: [
          { required: true, message: '创建人不能为空', trigger: 'blur' }
        ],
        updateTime: [
          { required: true, message: '修改时间不能为空', trigger: 'blur' }
        ],
        updateBy: [
          { required: true, message: '修改人不能为空', trigger: 'blur' }
        ]
      },
      queryTypeOptions: [
        { key: 'memberId', display_name: 'memberId' },
        { key: 'createTime', display_name: '创建时间' }
      ]
    }
  },
  methods: {
    // 钩子：在获取表格数据之前执行，false 则代表不获取数据
    [CRUD.HOOK.beforeRefresh]() {
      return true
    }
  }
}
</script>

<style scoped>

</style>
