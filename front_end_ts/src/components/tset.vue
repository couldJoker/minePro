<template>
  <div>
    <input v-model="msg">
    <p>prop: {{propMessage}}</p>
    <p>msg: {{msg}}</p>
    <p>helloMsg: {{helloMsg}}</p>
    <p>computed msg: {{computedMsg}}</p>
    <p>mapGetters msg: {{getterName}}</p>
    <button @click="greet">Greet</button>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import { State, Getter, Action } from 'vuex-class';

@Component({})
export default class Test extends Vue{
  
  @Prop({ default: '' }) propMessage!: string
  @Getter('name') getterName!: string
  @Provide()
  // initial data
  msg = 123
  helloMsg = 'Hello, ' + this.propMessage

  mounted () {
    this.greet()
    console.log('this.name', this.getterName)
  }
  // computed
  get computedMsg () {
    return 'computed ' + this.msg
  }
  // method
  greet () {
    // alert('greeting: ' + this.msg)
    this.changed(this.msg + '');
  }

  @Watch('msg')
  onChildChanged(val: string, oldVal: string) { 
    console.log('val',val)
    console.log('oldVal',oldVal)
  }

  @Model('change') val!: string
  changed(val: string): void {
    this.$emit('change', val);
  }
}
</script>

<style scoped>

</style>

