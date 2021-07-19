import Vue from 'vue'
import App from './App.vue'

let openRequest = indexedDB.open("store", 1);

openRequest.onupgradeneeded = function() {
  // срабатывает, если на клиенте нет базы данных
  // ...выполнить инициализацию...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  //let db = openRequest.result;
  console.log(`Нормас`);
};

new Vue({
  render: h => h(App),
}).$mount('#app')
