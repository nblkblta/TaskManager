<template>
  <form class="form" @submit.prevent>
    <div>Добавление задачи</div>
    <input v-model="task.title"
           class="input"
           placeholder="Название задачи">
    <input v-model="task.description"
           class="input"
           placeholder="Описание задачи">
    <input v-model="task.beginDate"
           class="input"
           placeholder="Дата начала работы">
    <greenButton v-on:click.native="addTask">
      Добавить
    </greenButton>
  </form>
</template>

<script>
import greenButton from "@/UI/greenButton";
export default {
  components: {
    greenButton
  },
  name: "task-form",
  data() {
    return{
      task: {
        title: ``,
        description: ``,
        beginDate: ``
      }
    }
  },
  methods: {
    addTask() {
      if (!this.isValid()){
        alert(`Некорректные данные`)
      }
      this.task.title = this.task.title.trim();
      this.task.description = this.task.description.trim();
      let year = this.task.beginDate.toString().slice(6,10)-0;
      let month = this.task.beginDate.toString().slice(3,5)-1;
      let day= this.task.beginDate.toString().slice(0,2)-0;
      this.task.beginDate = new Date(year, month, day);
      if (this.task.beginDate < new Date()){
        alert(`Дата начала не может быть раньше текущей`);
        this.task.beginDate = ``;
        return
      }
      this.task.id = Date.now();
      this.task.date = new Date;
      this.task.state = `Created`;
      this.$emit("add", this.task);
      this.task = {
        title : ``,
        description : ``,
        beginDate: ``
      }
    },
    isValid(){
      if ((this.task.title === ``) || (this.task.title === ``) || (this.task.beginDate === ``) ) {
      return false
      }
      if ((this.task.beginDate.match(/(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/))==null){
        alert(`Неправильный формат даты`);
        return false
      }
      return true
    }


  }
}
</script>

<style scoped>
.form{
  display: flex;
  flex-direction: column;
  border: 2px solid #3bffca;
  padding: 18px 15px;
  margin-top: 15px;
}

.input{
  width: auto;
  border: 2px solid #3bffca;
  padding: 18px 15px;
  margin-top: 15px;
}
</style>