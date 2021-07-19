<template>
  <div class="TasksBody">
    <div class = "TaskList" v-bind:key="name"  v-for="(value, name) in tasks">
      <div>{{name}}</div>
      <TaskList
        :tasks="value"
        @deleteTask= "deleteTask"
      ></TaskList>
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList";
export default {
  components: {
    TaskList
  },
  props: {
    tasks: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteTask(task) {
      this.$emit(`deleteTask`, task)
    },
    name: "TasksBody"
  }
}
</script>

<style scoped>
.TaskList{
  display: table-cell;
  padding: 5px;
  margin: 15px 15px 0 0;
  border: 2px solid #3bffca;
  height: 100%;
  width: 33%;
}
.TasksBody{
  margin-top: 15px;
  display: table;
  flex-direction: row;
  width: 100%;
}
</style>