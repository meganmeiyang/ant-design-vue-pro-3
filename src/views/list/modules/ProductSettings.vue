<template>
  <div>
    <a-tabs
      default-active-key="1"
      tab-position="left"
      :style="{ height: '500px' }"
      @prevClick="callback"
      @nextClick="callback"
    >
      <a-tab-pane v-for="tab in systemTags" :key="tab" :tab="tab">
        <tags-table
          :data="getTableData(tab)"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import TagsTable from '../components/TagsTable'
import { TABLEDATA, SYSTEMTAGS } from '@/entities/tags'

export default {
  name: 'ProductSettings',
  components: {
    TagsTable
  },
  data () {
    const systemTags = SYSTEMTAGS
    return {
      mode: 'top',
      systemTags: systemTags
    }
  },
  methods: {
    getTableData (tab) {
      console.log('tab' + tab)
      // get the key from TABLEDATA where the name = tab
      const key = Object.keys(TABLEDATA).find(key => TABLEDATA[key].name === tab)
      return TABLEDATA[key].data
    },
    callback (val) {
      console.log(val)
    }
  }
}
</script>
