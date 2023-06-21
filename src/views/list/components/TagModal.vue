<template>
  <a-modal
    :visible="visible"
    :title="title"
    :okText="okText"
    :cancelText="cancelText"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleCancel"
  >
    <a-form :form="form">
      <a-form-item label="Value">
        <a-input v-model="value" />
      </a-form-item>
      <a-form-item label="Color">
        <a-input v-model="color" />
      </a-form-item>
      <a-form-item label="Help Text">
        <a-input v-model="help" />
      </a-form-item>
      <a-form-item label="Is Default">
        <a-switch v-model="isDefault" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
// vue 2 create a form
export default {
    name: 'TagModal',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'Add Tag'
        },
        okText: {
            type: String,
            default: 'OK'
        },
        cancelText: {
            type: String,
            default: 'Cancel'
        },
        record: {
            type: Object,
            default: () => {}
        },
        isCreate: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            form: this.$form.createForm(this),
            value: '',
            color: '',
            help: '',
            isDefault: false
        }
    },
    methods: {
        handleOk () {
            this.$emit('ok', {
                value: this.value,
                color: this.color,
                help: this.help,
                isDefault: this.isDefault
            })
        },
        handleCancel () {
            this.$emit('cancel')
        }
    },
    watch: {
        visible (val) {
            if (val) {
                this.value = this.record.value
                this.color = this.record.color
                this.help = this.record.help
                this.isDefault = this.record.isDefault
            }
        }
    }
}

</script>
