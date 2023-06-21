<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      :row-key="record => record.id"
      :scroll="{ x: 1300 }"
      size="small"
      style="margin-top: 24px"
    >
      <template slot="tagcolor" slot-scope="text">
        <a-tag :color="text">
          {{ text }}
        </a-tag>
      </template>
      <template slot="default" slot-scope="text">
        <a-tag v-if="text === true" color="green">
          Yes
        </a-tag>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="() => edit(record.key)">
          <a-icon type="edit" />
        </a-button>
      </template>
    </a-table>
    <tag-modal
      v-model="visible"
      :record="tag"
      :title="modalTitle"
      @ok="handleOk"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import TagModal from './TagModal'

// columns: index, value(EN), value(CN), default value, help text, color
export default {
  components: {
    TagModal
  },
  name: 'TagsTable',
  prop: {
    data: {
      type: Array,
      default: () => []
    }
  },
  // emit edit event
  methods: {
    edit (record) {
      console.log('edit record: ' + record.id)
      this.visible = true
    },
    // handle ok event
    handleOk (record) {
      console.log('handle ok: ' + record)
      this.visible = false
    },
    // handle cancel event
    handleCancel () {
      console.log('handle cancel')
      this.visible = false
    }
  },
  data () {
    return {
      visible: false,
      columns: [
        {
          title: '#',
          dataIndex: 'id',
          width: 150
        },
        {
          title: 'Value',
          dataIndex: 'value',
          width: 200
        },
        {
          title: 'Is Default',
          dataIndex: 'default',
          width: 150,
          scopedSlots: { customRender: 'default' }
        },
        {
          title: 'Color',
          dataIndex: 'color',
          width: 200,
          scopedSlots: { customRender: 'tagcolor' }
        },
        {
          title: 'Help Text',
          dataIndex: 'help',
          width: 300
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  }
}

</script>
