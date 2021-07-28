<template>
    <div class="TaskList"
         @drop="ondrop($event, name)"
         @dragover.prevent
         @dragenter.prevent>
      <div>{{name}}</div>
        <Task v-bind:key="task.id"
              v-for="task in tasks"
              :task="task"
              @editTask="editTask"
              @deleteTask="deleteTask"
              @completeTask="completeTask">
        </Task>
    </div>
</template>

<script>
import Task from "@/Components/Task";
export default {
  components: {Task},
  props: {
    tasks: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    ondrop(e, state) {
      let taskId = parseInt(e.dataTransfer.getData('taskId'))
      this.$emit('dropTask', taskId, state);
    },

    deleteTask(task) {
      this.$emit(`deleteTask`, task)
    },
    editTask(task) {
      this.$emit(`editTask`, task);
    },
    completeTask(task) {
      this.$emit(`completeTask`, task)
    }
  },
  name: "TaskList"
}
</script>

<style scoped>
.TaskList{
  display: table-cell;
  padding: 5px;
  margin: 15px 15px 0 10px;
  border: 2px solid #3bffca;
  height: 100%;
  width: 33%;
  border-radius: 10px;
}
</style>