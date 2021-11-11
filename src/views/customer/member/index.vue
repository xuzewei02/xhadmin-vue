<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="mobileNumber" label="手机号码" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="identityNumber" label="证件号码" />
      <el-table-column prop="status" label="状态" align="center" >
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.status"
              :disabled="scope.row.id === 1"
              active-color="#409EFF"
              inactive-color="#F56C6C"
              @change="changeEnabled(scope.row, scope.row.status,)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" />
      <!--   编辑与删除   -->
      <el-table-column
          v-if="checkPer(['admin','job:edit','job:del'])"
          label="操作"
          width="130px"
          align="center"
          fixed="right"
      >
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
    <!--表单渲染-->
    <eForm :member-status="dict.member_status" />
  </div>
</template>

<script>
import crudMember from '@/api/member/member'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: 'Member',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '会员',
      url: 'api/member',
      sort: ['id,desc'],
      crudMethod: { ...crudMember }
    })
  },
  mixins: [presenter()],
  // 数据字典
  dicts: ['member_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'job:add'],
        edit: ['admin', 'job:edit'],
        del: ['admin', 'job:del']
      }
    }
  },
  methods: {
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.member_status[val] + '" ' + data.name + '会员, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // eslint-disable-next-line no-undef
        crudMember.edit(data).then(() => {
          // eslint-disable-next-line no-undef
          this.crud.notify(this.dict.label.member_status[val] + '成功', 'success')
        }).catch(err => {
          data.status = !data.status
          console.log(err.data.message)
        })
      }).catch(() => {
        data.status = !data.status
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
