<template>
    <Header />
    <div class="container">
        <Balance :total="+total" />
        <IncomeExpenses :income="+income" :expense="+expense" />
        <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
        <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
    </div>
</template>

<script setup>
import Header from "./components/Header.vue"
import Balance from "./components/Balance.vue"
import IncomeExpenses from "./components/IncomeExpenses.vue"
import TransactionList from "./components/TransactionList.vue"
import AddTransaction from "./components/AddTransaction.vue"
import { ref, computed, onMounted,toRefs } from "vue"
import { useToast } from 'vue-toastification'
import useEventsBus from './eventBus';


const toast = useToast();
const bus = useEventsBus()
const transactions = ref([])
bus.on('transactionEdit', (payload) => {

    const targetObject = payload;

    const handlerObject = {
        // Your handler configuration goes here
        _isReadonly: false,
        _shallow: false,
        get(target, property, receiver) {
            // Return the actual property value
            return Reflect.get(target, property, receiver);
        }
    };
    const proxy = new Proxy(targetObject, handlerObject);
    // Accessing properties on the Proxy will trigger the 'get' trap
    const editedPayload = {
        id: proxy.id,
        text: proxy.text,
        amount: parseFloat(proxy.amount)
    }
    handleTransactionEdit(editedPayload)
});
onMounted(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
    if (savedTransactions) {
        transactions.value = savedTransactions
    }
})

//get total
const total = computed(() => {
    return transactions.value.reduce((acc, transaction) => {
        return acc + transaction.amount
    }, 0)
})
//get income
const income = computed(() => {
    return transactions.value
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount
        }, 0).toFixed(2)
})
//get expense
const expense = computed(() => {
    const totalExpense = transactions.value
        .filter((transaction) => transaction.amount < 0)
        .reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);

    // Ensure totalExpense is a number before applying toFixed
    const formattedExpense = typeof totalExpense === 'number' ? totalExpense.toFixed(2) : '0.00';

    return formattedExpense;
});
//handle transaction submitted
const handleTransactionSubmitted = (transactionData) => {
    transactions.value.push({
        id: generateUniqueId(),
        text: transactionData.text,
        amount: transactionData.amount
    })
    saveTransactionsToLocalStorage()
    toast.success('Transaction added successfully')
}
//unique id
const generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000)
}
// delete transaction
const handleTransactionDeleted = (id) => {
    transactions.value = transactions.value.filter(
        (transaction) => transaction.id !== id
    )
    saveTransactionsToLocalStorage()
    toast.success('Transaction Deleted Successfully')
}

const handleTransactionEdit = (editedTransaction) => {
    const foundIndex = transactions.value.findIndex(item => item.id === editedTransaction.id);

    if (foundIndex !== -1) {
        // Update the properties of the existing transaction
        transactions.value[foundIndex].text = editedTransaction.text;
        transactions.value[foundIndex].amount = parseFloat(editedTransaction.amount);

        // Save the updated transactions to local storage
        saveTransactionsToLocalStorage();

        toast.success('Transaction Edited Successfully');
    } else {
        // Handle case when the transaction with the specified id is not found
        toast.error('Transaction not found');
    }
};

// save Transactions to local storage
const saveTransactionsToLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>