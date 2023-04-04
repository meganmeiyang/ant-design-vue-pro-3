<template>
  <page-header-wrapper>
    <a-tabs default-active-key="1" >
      <a-tab-pane key="1" tab="SIM卡产品">
        <a-card :bordered="false" class="sphere-card">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="SKU">
                    <a-input v-model="queryParam.id" placeholder=""/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="Status">
                    <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                      <a-select-option value="0">已发布</a-select-option>
                      <a-select-option value="1">测试中</a-select-option>
                      <a-select-option value="2">暂停</a-select-option>
                      <a-select-option value="3">草稿</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <!-- <template v-if="advanced">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="调用次数">
                      <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="更新日期">
                      <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="使用状态">
                      <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">关闭</a-select-option>
                        <a-select-option value="2">运行中</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="使用状态">
                      <a-select placeholder="请选择" default-value="0">
                        <a-select-option value="0">全部</a-select-option>
                        <a-select-option value="1">关闭</a-select-option>
                        <a-select-option value="2">运行中</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </template> -->
                <!-- <a-col :md="!advanced && 8 || 24" :sm="24">
                  <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                    <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                    </a>
                  </span>
                </a-col> -->
              </a-row>
            </a-form>
          </div>

          <div class="table-operator">
            <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
            <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
              <a-menu slot="overlay">
                <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
                <!-- lock | unlock -->
                <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                批量操作 <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </div>

          <a-table
            ref="table"
            size="default"
            rowKey="key"
            :columns="columns"
            :data-source="loadData"
            :alert="true"
            :rowSelection="rowSelection"
            showPagination="auto"
          >
            <!-- <span slot="serial" >
              {{ generateSKU("S","P") }}
            </span> -->
            <span slot="status" slot-scope="text">
              <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
            </span>
            <span slot="type" slot-scope="text">
              <!--SIM-->
              <!--Cellular Service-->
              <!--Service-->
              <!--IMSI-->
              <a-tag :color="getColor(text)">{{ text }}</a-tag>
            </span>
            <span slot="sku" slot-scope="text">
              <a @click="onSku">{{ text }}</a>
            </span>
            <span slot="simtype" slot-scope="text">
              <a-tag :color="text | simtypeColorFilter">{{ text | simtypeFilter }}</a-tag>
            </span>
            <span slot="formfactor" slot-scope="text">
              <a-tag :color="text | formfactorColorFilter">{{ text | formfactorFilter }}</a-tag>
            </span>
            <span slot="grade" slot-scope="text">
              <a-tag :color="text | gradeColorFilter">{{ text | gradeFilter }}</a-tag>
            </span>
            <span slot="artwork" slot-scope="text">
              <a-tag :color="text | artworkColorFilter">{{ text | artworkFilter }}</a-tag>
            </span>
            <span slot="mno" slot-scope="text">
              <a-tag :color="text | mnoColorFilter">{{ text | mnoFilter }}</a-tag>
            </span>
            <span slot="tags" slot-scope="tags">
              <a-tag v-for="tag in tags" :key="tag" :color="getRandomColor()"> {{ tag }}</a-tag>
            </span>

            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="handleEdit(record)">
                  <a-icon type="edit" />
                </a>
                <a-divider type="vertical" />
                <a @click="handleSub(record)"><a-icon type="more" /></a>
              </template>
            </span>
          </a-table>

          <create-form
            ref="createModal"
            :visible="form.visible"
            :loading="form.confirmLoading"
            :model="mdl"
            @cancel="handleCancel"
            @ok="handleOk"
          />
          <step-by-step-modal ref="modal" @ok="handleOk"/>
          <a-drawer
            :width="700"
            :visible="drawer.visible"
            :body-style="{ paddingBottom: '80px' }"
            :footer-style="{ textAlign: 'right' }"
            @close="onClose">
            <a-tabs default-active-key="1">
              <a-tab-pane key="1" tab="基本信息">
                <a-descriptions :column="2" layout="vertical">
                  <a-descriptions-item label="ID(SKU)">
                    {{ drawer.id }}
                  </a-descriptions-item>
                  <a-descriptions-item label="产品名称">
                    {{ product.name }}
                  </a-descriptions-item>
                  <a-descriptions-item label="供应商">
                    <a-tag color="blue">
                      {{ product.supplier }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="运营商">
                    <a-tag :color="product.mno | mnoColorFilter">{{ product.mno | mnoFilter }}</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="SIM种类">
                    <a-tag :color="product.simtype | simtypeColorFilter">
                      {{ product.simtype | simtypeFilter }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="芯片级别">
                    <a-tag :color="product.grade | gradeColorFilter">
                      {{ product.grade | gradeFilter }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="形态">
                    <a-tag :color="product.formfactor | formfactorColorFilter">
                      {{ product.formfactor | formfactorFilter }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="卡体">
                    <a-tag :color="product.body | bodyColorFilter">
                      {{ product.body | bodyFilter }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="卡面设计">
                    <a-tag :color="product.artwork | artworkColorFilter">
                      {{ product.artwork | artworkFilter }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="打印">
                    <a-tag :color="product.printing | printingColorFilter">
                      {{ product.printing | printingFilter }}
                    </a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="标签">
                    <a-tag v-for="tag in product.tags" :key="tag" :color="getRandomColor()"> {{ tag }}</a-tag>
                  </a-descriptions-item>
                  <a-descriptions-item label="备注">
                    {{ product.remarks }}
                  </a-descriptions-item>
                </a-descriptions>
                <a-divider></a-divider>
                <a-row type="flex" justify="center">
                  <a-col :span="12">
                    <a-card hoverable :bordered="false">
                      <img width="250" :src="imageBackUrl" style="display: block; margin-left: auto; margin-right: auto;"/>
                    </a-card>
                  </a-col>
                  <a-col :span="12">
                    <a-card hoverable :bordered="false">
                      <img width="250" :src="imageFrontUrl" style="display: block; margin-left: auto; margin-right: auto;"/>
                    </a-card>
                  </a-col>
                </a-row>

              </a-tab-pane>
              <a-tab-pane key="2" tab="修改记录">
              </a-tab-pane>
            </a-tabs>

          </a-drawer>
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="2" tab="流量服务产品">
        <a-card :bordered="false" class="sphere-card">
          table
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="3" tab="IMSI产品">
        <a-card :bordered="false" class="sphere-card">
          table
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="4" tab="其它产品">
        <a-card :bordered="false" class="sphere-card">
          table
        </a-card>
      </a-tab-pane>
      <a-tab-pane key="5" tab="系统配置">
        <a-card :bordered="false" class="sphere-card">
          <product-settings>

          </product-settings>
        </a-card>
      </a-tab-pane>
    </a-tabs>

  </page-header-wrapper>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getRoleList } from '@/api/manage'
import StepByStepModal from './modules/StepByStepModal'
import CreateForm from './modules/CreateSIMForm'
import { mnoProducts } from '@/mock/mockdata.js'
import ProductSettings from './modules/ProductSettings.vue'

const columns = [
  {
    title: 'ID (SKU)',
    dataIndex: 'sku',
    scopedSlots: { customRender: 'sku' }
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '运营商',
    dataIndex: 'mno',
    scopedSlots: { customRender: 'mno' }
  },
  // {
  //   title: '产品种类',
  //   dataIndex: 'type',
  //   scopedSlots: { customRender: 'type' }
  // },
  {
    title: 'SIM种类',
    dataIndex: 'simtype',
    scopedSlots: { customRender: 'simtype' }
  },
  {
    title: '形态',
    dataIndex: 'formfactor',
    scopedSlots: { customRender: 'formfactor' }
  },
  // {
  //   title: '芯片等级',
  //   dataIndex: 'grade',
  //   scopedSlots: { customRender: 'grade' }
  // },
  {
    title: '卡面设计',
    dataIndex: 'artwork',
    scopedSlots: { customRender: 'artwork' }
  },
  {
    title: '标签',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  // {
  //   title: '服务调用次数',
  //   dataIndex: 'callNo',
  //   sorter: true,
  //   needTotal: true,
  //   customRender: (text) => text + ' 次'
  // },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '更新时间',
    dataIndex: 'updatedAt',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  0: {
    status: 'success',
    text: '已发布'
  },
  1: {
    status: 'processing',
    text: '测试中'
  },
  2: {
    status: 'default',
    text: '暂停'
  },
  3: {
    status: 'warning',
    text: '草稿'
  }
}
const gradeMap = {
  0: {
    color: 'green',
    text: '消费者'
  },
  1: {
    color: 'blue',
    text: '车规'
  },
  2: {
    color: 'pink',
    text: '工业'
  }
}
const artworkMap = {
  0: {
    color: 'blue',
    text: 'Standard'
  },
  1: {
    color: 'green',
    text: 'LF logo'
  },
  2: {
    color: 'pink',
    text: 'LF+'
  },
  3: {
    color: 'purple',
    text: 'White Label'
  }
}
const simtypeMap = {
  0: {
    color: 'pink',
    text: '标准SIM'
  },
  1: {
    color: 'blue',
    text: 'Chip SIM'
  },
  2: {
    color: 'green',
    text: 'eSIM'
  }
}

const formfactorMap = {
  0: {
    color: 'blue',
    text: '2FF+3FF+4FF'
  },
  1: {
    color: 'pink',
    text: '5*6'
  },
  2: {
    color: 'green',
    text: 'MFF2'
  },
  3: {
    color: 'cyan',
    text: '2FF'
  },
  4: {
    color: 'purple',
    text: '3FF'
  },
  5: {
    color: 'orange',
    text: '4FF'
  }
}
const bodyMap = {
  0: {
    color: 'orange',
    text: '-'
  },
  1: {
    color: 'blue',
    text: '全卡'
  },
  2: {
    color: 'pink',
    text: '半卡'
  },
  3: {
    color: 'green',
    text: '1/4卡'
  }
}
const printingMap = {
  0: {
    color: 'orange',
    text: '-'
  },
  1: {
    color: 'pink',
    text: '标准ICCID'
  },
  2: {
    color: 'blue',
    text: '条形码'
  }
}
const mnoMap = {
  0: {
    color: 'orange',
    text: 'Vodafone Simplio'
  },
  1: {
    color: 'blue',
    text: 'Singtel'
  },
  2: {
    color: 'green',
    text: 'Telenor'
  },
  3: {
    color: 'pink',
    text: 'A1'
  }
}
export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateForm,
    StepByStepModal,
    ProductSettings
  },
  data () {
    this.columns = columns
    this.loadData = mnoProducts
    return {
      // create model
      imageBackUrl: require('@/assets/back.png'),
      imageFrontUrl: require('@/assets/front.png'),
      drawer: {
        title: '运营商产品详情',
        visible: false,
        id: this.loadData[0].sku
      },
      form: {
        visible: false,
        confirmLoading: false
      },
      activeKey: 1,
      visible: false,
      confirmLoading: false,
      mdl: null,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      // loadData: parameter => {
      //   const requestParameters = Object.assign({}, parameter, this.queryParam)
      //   console.log('loadData request parameters:', requestParameters)
      //   return getServiceList(requestParameters)
      //     .then(res => {
      //       return res.result
      //     })
      // },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    printingFilter (type) {
      return printingMap[type].text
    },
    printingColorFilter (type) {
      return printingMap[type].color
    },
    bodyFilter (type) {
      return bodyMap[type].text
    },
    bodyColorFilter (type) {
      return bodyMap[type].color
    },
    mnoFilter (type) {
      return mnoMap[type].text
    },
    mnoColorFilter (type) {
      return mnoMap[type].color
    },
    artworkFilter (type) {
      return artworkMap[type].text
    },
    artworkColorFilter (type) {
      return artworkMap[type].color
    },
    gradeColorFilter (type) {
      return gradeMap[type].color
    },
    gradeFilter (type) {
      return gradeMap[type].text
    },
    formfactorFilter (type) {
      return formfactorMap[type].text
    },
    formfactorColorFilter (type) {
      return formfactorMap[type].color
    },
    simtypeFilter (type) {
      return simtypeMap[type].text
    },
    simtypeColorFilter (type) {
      return simtypeMap[type].color ?? 'pink'
    },
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    getRoleList({ t: new Date() })
    console.log(this.loadData)
  },
  computed: {
    rowSelection () {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange
      }
    },
    product () {
      return this.loadData.find((obj) => obj.sku === this.drawer.id)
    }
  },
  methods: {
    getColor (type) {
      switch (type) {
        case 'IMSI':
          return 'green'
        case 'SIM':
          return 'pink'
        case 'Cellular Service':
          return 'blue'
        case 'Service':
          return 'purple'
      }
    },
    onClose () {
      this.drawer.visible = false
    },
    onSku (event) {
      const id = event.target.innerText
      console.log(id)
      this.drawer.visible = true
      this.drawer.id = id
    },
    handleAdd () {
      this.mdl = null
      // this.visible = true
      this.form.visible = true
    },
    handleEdit (record) {
      this.visible = true
      this.mdl = { ...record }
    },
    handleOk () {
      const form = this.$refs.createModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          if (values.id > 0) {
            // 修改 e.g.
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('修改成功')
            })
          } else {
            // 新增
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve()
              }, 1000)
            }).then(res => {
              this.visible = false
              this.confirmLoading = false
              // 重置表单数据
              form.resetFields()
              // 刷新表格
              this.$refs.table.refresh()

              this.$message.info('新增成功')
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.form.visible = false

      const form = this.$refs.createModal.form
      form.resetFields() // 清理表单数据（可不做）
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.info(`${record.no} 订阅成功`)
      } else {
        this.$message.error(`${record.no} 订阅失败，规则已关闭`)
      }
    },
    getRandomColor () {
      const colors = ['pink', 'red', 'purple', 'blue', 'cyan', 'green', 'orange']
      const rand = Math.floor(Math.random() * colors.length)
      return colors[rand]
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
