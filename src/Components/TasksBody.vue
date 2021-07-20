<template>
  <div class="TasksBody">
    <TaskList v-bind:key="value.id"
              v-for="(value, name) in tasks"
              :name="name"
              :tasks="value"
              @deleteTask= "deleteTask">
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
    deleteTask(task) {
      this.$emit(`deleteTask`, task)
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