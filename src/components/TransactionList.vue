<template>
  <div>
    <h3>History</h3>
      <ul id="list" class="list">
        <li
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
        >
          {{ transaction.text }} <span>${{ transaction.amount }}</span>
          <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
          <button
          @click="() => {
             showEdit = !showEdit
             editData(transaction)
          }"
          class="edit-btn"
          ><i class="bi bi-pencil-square"></i></button>
        </li>
      </ul>

      <div class="overlay" v-if="showEdit">
      </div>

      <div class="modal" v-if="showEdit">
        <button @click="
          myShow();
          " class="modal-close btn btn_small">
          <i class="icn icn_close">x</i>
        </button>
        <EditTransaction :transaction="transactionval" @transactionEdit = "editTransaction(transactionval)"/>
      </div>
  </div>
</template>
<script setup>
  import { defineProps } from 'vue';
  import EditTransaction from './EditTransaction.vue'
  import { ref } from "vue"

  const emit = defineEmits(['transactionDeleted'])
  const props = defineProps({
    transactions: {
      type: Array,
      required: true
    }
  })
  let transactionval = ref([]);
  const showEdit = ref(false);
  const editData = (transaction) => {
    // transaction
    transactionval = transaction;
    return transactionval;
  }
  const deleteTransaction = (transactionId) => {
    emit('transactionDeleted', transactionId)
  }
  const myShow = () => {
    showEdit.value = false;
    console.log("clicked");
  }
  const editTransaction = (transactionId) => {
    emit('transactionEdit', transactionId)
    myShow();
  }
</script>