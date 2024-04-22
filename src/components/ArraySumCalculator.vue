<template>
  <div class="flex flex-col items-center">
    <h2 class="text-2xl font-bold mb-4">Penjumlahan Array</h2>
    <div class="mb-4">
      <label for="arrayInput" class="block mb-2">Masukkan array bilangan bulat (pisahkan dengan koma):</label>
      <label for="arrayInput" class="block mb-2">misal : 10, 20, 30, 40, 50</label>
      <input type="text" id="arrayInput" v-model="arrayInput"
        class="px-4 py-2 border border-gray-300 rounded-md w-full">

    </div>
    <button @click="calculateSum" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Hitung</button>

    <div v-if="result !== null" class="mt-4 text-center">
      <h3 class="text-lg font-semibold mb-2">Hasil Penjumlahan:</h3>
      <p class="text-xl">{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrayInput: '',
      result: null
    };
  },
  methods: {
    calculateSum() {
      const numbers = this.arrayInput.split(',').map(Number);
      const sumArray = numbers.map((number, index) => {
        return numbers.reduce((accumulator, currentValue, currentIndex) => {
          if (currentIndex !== index) {
            return accumulator + currentValue;
          } else {
            return accumulator;
          }
        }, 0);
      });

      this.result = sumArray.join(', ');
    }
  }
};
</script>