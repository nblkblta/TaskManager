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
import TaskForm from "@/components/TaskForm";
import TasksBody from "@/components/TasksBody";
export default {
  components: {
    TaskForm, TasksBody
  },

  data() {
    return{
      tasks: {
        Created:[
          {id: 1, title: `title`, description: `description`, date: new Date, state: `Created`},
          {id: 2, title: `title`, description: `description`, date: new Date, state: `Created`}
        ],
        InWork:[
          {id: 3, title: `title`, description: `description`, date: new Date, state: `InWork`},
          {id: 4, title: `title`, description: `description`, date: new Date, state: `InWork`},
          {id: 5, title: `title`, description: `description`, date: new Date, state: `InWork`}
        ],
        Doned:[
          {id: 6, title: `title`, description: `description`, date: new Date, state: `Doned`},
          {id: 7, title: `title`, description: `description`, date: new Date, state: `Doned`},
          {id: 8, title: `title`, description: `description`, date: new Date, state: `Doned`},
          {id: 9, title: `title`, description: `description`, date: new Date, state: `Doned`},
          {id: 10, title: `title`, description: `description`, date: new Date, state: `Doned`}
        ]
      }
    }
  },
  methods: {
    addTask(task) {
      this.tasks.Created.push(task);
    },
    deleteTask(task){
      if (task.state == `Created`){
        this.tasks.Created = this.tasks.Created.filter(p=>p.id!=task.id)
      }
      if (task.state == `InWork`){
        this.tasks.InWork = this.tasks.InWork.filter(p=>p.id!=task.id)
      }
      if (task.state == `Doned`){
        this.tasks.Doned = this.tasks.Doned.filter(p=>p.id!=task.id)
      }


    }
  }

}
</script>

<style>
</style>
