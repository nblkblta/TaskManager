<template>
  <div class = "app" >
    <green-button v-on:click.native="showDialog">
      Добавить Задачу
    </green-button>
    <MyDialog
        :show="dialogVisible"
        @hideDialog = "hideDialog">
          <TaskForm
            @add = "addNewTask"
          ></TaskForm>
    </MyDialog>
    <div style="margin-top: 15px" v-if="(tasks.InWork.length===0)&&(tasks.Created.length===0)&&(tasks.Completed.length===0)">Пока нет задач</div>
    <TasksBody
        @dropTask = "dropTask"
        @editTask = "editTask"
        @deleteTask = "deleteTask"
        @completeTask = "completeTask"
        :tasks = "tasks"
    ></TasksBody>
  </div>
</template>
<script>
import TaskForm from "@/Components/TaskForm";
import TasksBody from "@/Components/TasksBody";
import * as idbAPI from "@/idbAPI.js";
import MyDialog from "@/Components/MyDialog";
import GreenButton from "@/UI/greenButton";
export default {
  components: {
    GreenButton,
    MyDialog,
    TaskForm, TasksBody
  },
  data() {
    return{
      tasks: {
        Created:[],
        InWork:[],
        Completed:[]
      },
      dialogVisible: false
    }
  },
  methods: {
    dropTask(taskId,state){
      idbAPI.getTask(taskId).then(result=>{
        this.deleteTask(result);
        result.state = state;
        this.addTask(result);

        this.editTask(result);
      });
    },
    addNewTask(task) {
      idbAPI.putTask(task);
      this.addTask(task);
    },
    editTask(task){
      idbAPI.putTask(task);
    },
    addTask(task) {
      if (task.state === `Created`){
        if ((Date.now() - task.beginDate + task.beginDate.getTimezoneOffset()*60*1000) > 0){
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
    },
    showDialog(){
      this.dialogVisible = true
    },
    hideDialog(){
      this.dialogVisible = false
    },
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
