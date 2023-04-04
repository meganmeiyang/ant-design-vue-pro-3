<template>
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
      <a-tag v-if="text === true">
        {{ text }}
      </a-tag>
    </template>
    <template slot="operation" slot-scope="text, record">
      <a @click="() => edit(record.key)">Edit</a>
    </template>
  </a-table>

</template>

<script>
// columns: index, value(EN), value(CN), default value, help text, color
export default {
  name: 'TagsTable',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      columns: [
        {
          title: '#',
          dataIndex: 'id',
          width: 100
        },
        {
          title: 'Value(EN)',
          dataIndex: 'value_en',
          width: 200
        },
        {
          title: 'Value(CN)',
          dataIndex: 'value_cn',
          width: 200
        },
        {
          title: 'Default Value',
          dataIndex: 'default_value',
          width: 200,
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
          dataIndex: 'help_text',
          width: 200
        }
      ]
    }
  }
}

</script>
