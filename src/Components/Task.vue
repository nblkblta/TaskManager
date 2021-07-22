<template>
  <div class = "Task" draggable="true">
    <div><strong>Название: </strong>{{task.title}}</div>
    <div><strong>Описание: </strong>{{task.description}}</div>
    <div><strong>Дата создания: </strong>{{(task.date.toLocaleString("ru", {year:`numeric`, month:`numeric`, day:`numeric`}))}}</div>
    <div><strong>Дата начала работы: </strong>{{(task.beginDate.toLocaleString("ru", {year:`numeric`, month:`numeric`, day:`numeric`}))}}</div>
    <div><strong>Времени прошло с начала: </strong>{{ new Date((Date.now() - task.beginDate + task.beginDate.getTimezoneOffset()*60*1000) ).toLocaleString("ru", {hour: `numeric`, minute: 'numeric', second: 'numeric'})}}</div>
    <greenButton v-on:click.native="deleteTask">
      Удалить
    </greenButton>
  </div>
</template>

<script>
import GreenButton from "@/UI/greenButton";

export default {
  components: {GreenButton},
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTask() {
      this.$emit(`deleteTask`, this.task)
    }
  },
  name: "Task"
}
</script>

<style scoped>
.Task{
  max-width: 100%;
  border: 2px solid #3bffca;
  margin-top: 15px;
  padding: 5px;
  word-break: break-word;
}
</style>