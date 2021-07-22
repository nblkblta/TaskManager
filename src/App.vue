<template>
  <div class="app" >
   <TaskForm
       @add = "addTask"
   ></TaskForm>
    <TasksBody
        @deleteTask = "deleteTask"
        :tasks="tasks"
    ></TasksBody>
  </div>
</template>

<script>
import TaskForm from "@/Components/TaskForm";
import TasksBody from "@/Components/TasksBody";
export default {
  components: {
    TaskForm, TasksBody
  },

  data() {
    return{
      tasks: {
        Created:[
          {id: 1, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Created`},
          {id: 2, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Created`}
        ],
        InWork:[
          {id: 3, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `InWork`},
          {id: 4, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `InWork`},
          {id: 5, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `InWork`}
        ],
        Completed:[
          {id: 6, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Completed`},
          {id: 7, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Completed`},
          {id: 8, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Completed`},
          {id: 9, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Completed`},
          {id: 10, title: `title`, description: `description`, date: new Date(Date.now()), beginDate: new Date(Date.now()), state: `Completed`}
        ]
      }
    }
  },
  methods: {
    addTask(task) {
      this.tasks.Created.push(task);
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


    }
  }

}
</script>

<style>
</style>
