<template>
  <form class="form" @submit.prevent>
    <div>Добавление задачи</div>
    <input v-model="task.title"
           class="input"
           type="text"
           placeholder="Название задачи">
    <input v-model="task.description"
           class="input"
           type="input"
           placeholder="Описание задачи">
    <button
        class="btn"
        @click="addTask">
      Добавить
    </button>
  </form>
</template>

<script>
export default {
  name: "TaskForm",
  data() {
    return{
      task: {
        title: ``,
        description: ``,
      }
    }
  },
  methods: {
    addTask() {
      if ((this.task.title == ``) || (this.task.title == ``)) {
        return
      }
      this.task.id = Date.now();
      this.task.date = new Date;
      this.task.state = `Created`;
      this.$emit("add", this.task);
      this.task = {
        title : ``,
        description : ``,
      }
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
.btn{
  align-self: flex-end;
  margin-top: 15px;
  padding: 5px;
  background: none;
  border: 2px solid #3bffca;
}

</style>