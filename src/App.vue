<template>
  <div class="app" >
   <TaskForm
       @add = "addNewTask"
   ></TaskForm>
    <div style="margin-top: 15px" v-if="(tasks.InWork.length===0)&&(tasks.Created.length===0)&&(tasks.Completed.length===0)">Пока нет задач</div>
    <TasksBody
        @deleteTask = "deleteTask"
        :tasks="tasks"
    ></TasksBody>
  </div>
</template>

<script>
import TaskForm from "@/Components/TaskForm";
import TasksBody from "@/Components/TasksBody";
import * as idbAPI from "./idbAPI.js";
export default {
  components: {
    TaskForm, TasksBody
  },

  data() {
    return{
      tasks: {
        Created:[],
        InWork:[],
        Completed:[]
      },
    }
  },
  methods: {
    addNewTask(task) {
      this.addTask(task);
      idbAPI.putTask(task);
    },
    addTask(task) {
      if (task.state === `Created`){
        this.tasks.Created.push(task);
      }
      if (task.state === `InWork`){
        this.tasks.InWork.push(task);
      }
      if (task.state === `Doned`){
        this.tasks.Completed.push(task);
      }
    },
    deleteTask(task){
      if (task.state === `Created`){
        this.tasks.Created = this.tasks.Created.filter(p=>p.id!==task.id)
      }
      if (task.state === `InWork`){
        this.tasks.InWork = this.tasks.InWork.filter(p=>p.id!==task.id)
      }
      if (task.state === `Completed`){
        this.tasks.Completed = this.tasks.Completed.filter(p=>p.id!==task.id)
      }
      idbAPI.deleteTask(task);
    },
  },
  mounted() {
      idbAPI.getTasks(this);
  }
}
</script>

<style>
</style>
