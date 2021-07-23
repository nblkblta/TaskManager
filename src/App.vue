<template>
  <div class="app" >
   <TaskForm
       @add = "addNewTask"
   ></TaskForm>
    <div style="margin-top: 15px" v-if="(tasks.InWork.length===0)&&(tasks.Created.length===0)&&(tasks.Completed.length===0)">Пока нет задач</div>
    <TasksBody
        @deleteTask = "deleteTask"
        @completeTask="completeTask"
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
      idbAPI.putTask(task);
      this.addTask(task);
    },
    addTask(task) {
      if (task.state === `Created`){
        if ((Date.now() - task.beginDate + task.beginDate.getTimezoneOffset()*60*1000)>0){
          task.state = `InWork`;
        }else this.tasks.Created.push(task);
      }
      if (task.state === `InWork`){
        this.tasks.InWork.push(task);
      }
      if (task.state === `Completed`){
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
    completeTask(task){
      task.state = `Completed`;
      let searched = this.tasks.Created.filter(p=>p.id===task.id);
      if (searched.length) {
        this.tasks.Completed.push(task);
        this.tasks.Created = this.tasks.Created.filter(p=>p.id!==task.id)
        searched[0].state = `Completed`;
      } else {
        searched = this.tasks.InWork.filter(p=>p.id===task.id)
        if (searched.length){
          this.tasks.Completed.push(task);
          this.tasks.InWork = this.tasks.InWork.filter(p=>p.id!==task.id)
          searched[0].state = `Completed`;
        }
      }
      idbAPI.putTask(task);
    }
  },
  mounted() {
      idbAPI.getTasks().then(result=>
        {
          result.forEach(task => this.addTask(task));
        });
  }
}
</script>

<style>
</style>
