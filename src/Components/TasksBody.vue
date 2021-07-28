<template>
  <div class="TasksBody">
    <TaskList  v-bind:key="value.id"
               v-for="(value, name) in tasks"
               :name="name"
               :tasks="value"
               @editTask= "editTask"
               @deleteTask= "deleteTask"
               @completeTask="completeTask"
               @dropTask="dropTask">
    </TaskList>
  </div>
</template>

<script>
import TaskList from "@/Components/TaskList";
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
    dropTask(taskId, state){
      this.$emit('dropTask', taskId, state);
    },
    deleteTask(task) {
      this.$emit(`deleteTask`, task);
    },
    editTask(task) {
      this.$emit(`editTask`, task);
    },
    completeTask(task) {
      this.$emit(`completeTask`, task);
    }
  },
  name: "TasksBody"
}
</script>

<style scoped>
.TasksBody{
  margin-top: 15px;
  display: table;
  flex-direction: row;
  width: 100%;

}
</style>