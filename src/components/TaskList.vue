<template>
  <div>
  <div  draggable="true" class = "task" v-bind:key="task.id" v-for="task in tasks">
    <div><strong>Название: </strong>{{task.title}}</div>
    <div><strong>Описание: </strong>{{task.description}}</div>
    <div><strong>Дата создания: </strong>{{(task.date.toLocaleString("ru", {year:`numeric`, month:`numeric`, day:`numeric`}))}}</div>
    <div><strong>Времени прошло с создания: </strong>{{ new Date((Date.now() - task.date + task.date.getTimezoneOffset()*60*1000)).toLocaleString("ru", {hour: `numeric`, minute: 'numeric', second: 'numeric'})}}</div>
<!--    <div><strong>Состояние: </strong>{{task.state}}</div>-->
    <button
        class="btn"
        @click="$emit(`deleteTask`, task)">
        Удалить
    </button>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  name: "TaskList"
}
</script>

<style scoped>
  .task{
    max-width: 100%;
    border: 2px solid #3bffca;
    margin-top: 15px;
    padding: 5px;
    word-break: break-word;
  }
  .btn{
    align-self: flex-end;
    margin-top: 15px;
    padding: 5px;
    background: none;
    border: 2px solid #3bffca;
  }
</style>