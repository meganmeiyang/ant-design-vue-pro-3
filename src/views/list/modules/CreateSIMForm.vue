<template>
  <a-modal
    title="新建SIM卡产品"
    :width="900"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="产品名称">
          <a-input v-decorator="['name', {rules: [{required: true, min: 5, max:50, message: '请输入5-50个字符！'}]}]" />
        </a-form-item>
        <a-form-item label="产品备注">
          <a-input v-decorator="['remarks', {rules: [{required: false, max:50, message: '最多输入50个字符'}]}]" />
        </a-form-item>
        <a-form-item label="选择运营商">
          <a-select
            v-decorator="[
              'mno',
              { rules: [{ required: true, message: 'Please select MNO!' }] },
            ]"
            placeholder="select MNO that supplies this product"
            @change="handleSelectChange"
          >
            <a-select-option value="0">
              Simplio - Vodafone Simplio
            </a-select-option>
            <a-select-option value="1">
              A1 - A1
            </a-select-option>
            <a-select-option value="2">
              Singtel - Singtel
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="规格选择">
          <a-radio-group v-decorator="['simtype']" :options="simtypeOptions" />
          <br />
          <a-radio-group v-decorator="['grade']" :options="gradeOptions" />
          <br />
          <a-radio-group v-decorator="['formfactor']" :options="formfactorOptions" />
          <br />
          <a-radio-group v-decorator="['body']" :options="bodyOptions"/>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['name', 'description', 'id', 'simtype', 'body', 'grade', 'formfactor', 'remarks', 'mno']
const simtypeOptions = [
  { label: 'SIM', value: 0 },
  { label: 'Chip SIM', value: 1 },
  { label: 'eSIM', value: 2 }
]
const gradeOptions = [
  { label: '消费者', value: 0 },
  { label: '工业', value: 1 },
  { label: '车规', value: 2 }
]
const formfactorOptions = [
  { label: '2FF+3FF+4FF', value: 0 },
  { label: '2FF', value: 1 },
  { label: '3FF', value: 2 },
  { label: '4FF', value: 3 },
  { label: '2FF+3FF', value: 4 }
]
const bodyOptions = [
  { label: '全卡', value: 0 },
  { label: '半卡', value: 1 },
  { label: '1/4卡', value: 2 }
]
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      // layout: 'vertical',
      labelCol: {
        xs: { span: 5 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 17 },
        sm: { span: 13 }
      }
    }
    return {
      simtypeOptions: simtypeOptions,
      gradeOptions: gradeOptions,
      bodyOptions,
      formfactorOptions,
      form: this.$form.createForm(this)
    }
  },
  created () {
    console.log('custom modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })

    this.model.setFieldsValue('simtype', 0)
    this.model.setFieldsValue('body', 1)
    this.model.setFieldsValue('grade', 0)
    this.model.setFieldValue('formfactor', 2)
 },
  methods: {
    handleSelectChange () {

    }
  }
}
</script>
