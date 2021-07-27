<template>
  <div class = "Task" draggable="true" >
    <div><strong>Название: </strong>{{task.title}}</div>
    <div><strong>Описание: </strong>{{task.description}}</div>
    <div><strong>Дата создания: </strong>{{(task.date.toLocaleString("ru", {year:`numeric`, month:`numeric`, day:`numeric`}))}}</div>
    <div><strong>Дата начала работы: </strong>{{(task.beginDate.toLocaleString("ru", {year:`numeric`, month:`numeric`, day:`numeric`}))}}</div>
    <div v-if="(Date.now() - task.beginDate + task.beginDate.getTimezoneOffset()*60*1000)>=0"><strong>Времени прошло с начала: </strong>{{beginDate()}}</div>
    <div v-else><strong>Времени прошло с начала: </strong>00:00:00</div>
    <greenButton v-on:click.native="deleteTask">
      Удалить
    </greenButton>
    <greenButton v-on:click.native="showDialog">
      Редактировать
    </greenButton>
    <greenButton v-if="task.state!==`Completed`" v-on:click.native="completeTask">
      Завершить
    </greenButton>
    <MyDialog
        :show="dialogVisible"
        @hideDialog = "hideDialog">
      <TaskForm
          @add = "editTask"
      ></TaskForm>
    </MyDialog>
  </div>
</template>

<script>
import GreenButton from "@/UI/greenButton";
import MyDialog from "@/Components/MyDialog";
import TaskForm from "@/Components/TaskForm";
export default {
  components: {TaskForm, MyDialog, GreenButton},
  props: {
    task: {
      type: Object,
      required: true
    },
  },
  data(){
    return {
      dialogVisible: false
    }
  },
  methods: {
    editTask(task) {
      this.task.title = task.title;
      this.task.description = task.description;
      this.task.beginDate = task.beginDate;
      console.log(this.task);
      this.$emit("editTask", this.task);
      this.hideDialog();
    },
    deleteTask() {
      this.$emit(`deleteTask`, this.task)
    },
    completeTask() {
      this.$emit(`completeTask`, this.task)
    },
    showDialog(){
      this.dialogVisible = true
    },
    hideDialog(){
      this.dialogVisible = false
    },
    beginDate(){
      let now = new Date(Date.now());
      let beginDay = this.task.beginDate;
      let day = Math.ceil((now - beginDay)/(1000*3600*24))-1;
      let pref = ` `;
      if (day%10 === 1){
        pref = ` день `;
      }else if ((day%10 < 5)) {
        pref = ` дня `;
      }else{
        pref = ` дней `;
      }
      return day + pref + new Date((now - this.task.beginDate + this.task.beginDate.getTimezoneOffset()*60*1000) ).toLocaleString("ru", {hour: `numeric`, minute: 'numeric', second: 'numeric'})
    },

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