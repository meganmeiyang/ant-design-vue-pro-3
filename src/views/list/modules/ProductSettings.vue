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
        {{ tab }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    const systemTags = ['Form Factor', 'Type', 'Printing', 'Artwork', 'Body', 'Grade']
    return {
      mode: 'top',
      systemTags: systemTags
    }
  },
  methods: {
    callback (val) {
      console.log(val)
    }
  }
}
</script>
