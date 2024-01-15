<template>
    <div class="box">
        <div class="box-inner">
            <h3>Edit transaction</h3>
            <form id="form" @submit.prevent="onSubmit">
                <div class="form-control">
                    <label for="text">Text</label>
                    <input v-model="transaction.text" type="text" id="text" placeholder="Enter text..." />
                </div>
                <div class="form-control">
                    <label for="amount">Amount (negative - expense, positive - income)</label>
                    <input v-model="transaction.amount" type="text" id="amount" placeholder="Enter amount..." />
                </div>
                <button class="btn">Edit transaction</button>
            </form>
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useToast } from 'vue-toastification'
import useEventsBus from '../eventBus';


const emit = defineEmits(['closeModal'])
const toast = useToast()

const { transaction } = defineProps(['transaction'])

const onSubmit = () => {
    console.log('here')
    if (!transaction.text || !transaction.amount) {
        toast.error('Both fields are required')
        return
    }

    const transactionData = {
        id: transaction.id,
        text: transaction.text,
        amount: parseFloat(transaction.amount)
    }
    emit('closeModal')
    useEventsBus().emit('transactionEdit', transactionData)
}
</script>
  