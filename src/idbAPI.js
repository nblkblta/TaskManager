export function putTask(task){
    let openRequest = new Promise(function (resolve){
        let db = indexedDB.open(`TaskManager`, 1);
        db.onsuccess = function (){
            resolve(db.result);
        };
    });
    openRequest.then(db => {
        let get_tasks_transaction = db.transaction("Tasks", "readwrite");
        let tasks = get_tasks_transaction.objectStore("Tasks");
        let request = tasks.put(task);
        request.onsuccess = event => {
            console.log(event);
        }
        });
}

export function deleteTask(task){
    let openRequest = new Promise(function (resolve){
        let db = indexedDB.open(`TaskManager`, 1);
        db.onsuccess = function (){
            resolve(db.result);
        };
    });
    openRequest.then(db => {
        let get_tasks_transaction = db.transaction("Tasks", "readwrite");
        let tasks = get_tasks_transaction.objectStore("Tasks");
        tasks.delete(task.id);
    });
}

export async function getTasks(component){
    let openRequest = new Promise(function (resolve){
        let db = indexedDB.open(`TaskManager`, 1);
        db.onsuccess = function (){
            resolve(db.result);
        };
    });
    openRequest.then(db => {
        let get_tasks_transaction = db.transaction("Tasks", "readonly");
        let tasks = get_tasks_transaction.objectStore("Tasks");
        return  new Promise(resolve => {
            let request = tasks.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            }
        });
    }).then(result=>{
        result.forEach(task =>component.addTask(task));
    });
}

