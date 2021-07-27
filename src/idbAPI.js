function openConnection(){
    return new Promise(function (resolve){
        let db = indexedDB.open(`TaskManager`, 1);
        db.onupgradeneeded = function (){
            if (!db.objectStoreNames.contains('Tasks')) {
                db.createObjectStore('Tasks', {keyPath: 'id'});
            }
        }
        db.onsuccess = function (){
            resolve(db.result);
        };
    });
}

export function putTask(task) {
    openConnection().then(db => {
        let get_tasks_transaction = db.transaction("Tasks", "readwrite");
        let tasks = get_tasks_transaction.objectStore("Tasks");
        tasks.put(task);
    })
}

export function deleteTask(task){
    openConnection().then(db => {
        let get_tasks_transaction = db.transaction("Tasks", "readwrite");
        let tasks = get_tasks_transaction.objectStore("Tasks");
        tasks.delete(task.id);
    });
}

export function getTasks(){
     return openConnection().then(db => {
        let get_tasks_transaction = db.transaction("Tasks", "readonly");
        let tasks = get_tasks_transaction.objectStore("Tasks");
        return  new Promise(resolve => {
            let request = tasks.getAll();
            request.onsuccess = function () {
                resolve(request.result);
            }
        });
    })
}

