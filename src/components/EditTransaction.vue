<template>
    <div class="box">
            <div class="box-inner">
                <h3>Edit transaction</h3>
                    <form id="form" @submit.prevent="">
                        <div class="form-control">
                        <label for="text">Text</label>
                        <input v-model="transaction.text" type="text" id="text" placeholder="Enter text..." />
                        </div>
                        <div class="form-control">
                        <label for="amount"
                            >Amount <br />
                            (negative - expense, positive - income)</label
                        >
                        <input v-model="transaction.amount" type="text" id="amount" placeholder="Enter amount..." />
                        </div>
                        <button class="btn">Add transaction</button>
                    </form>
                </div>
            <!-- box-inner -->
        </div>
        <!-- box -->
</template>
<script setup>
 const emit = defineEmits(['transactionEdit'])
  const props = defineProps({
    transaction: {
      type: Object,
      required: true
    }
  })
</script>