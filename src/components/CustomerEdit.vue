<template>
  <div class="w-full flex justify-center">
    <form class="w-full  px-10 flex flex-wrap" @submit.prevent="editCustomer">
      <!-- Left Section: Customer Information -->
      <div class="w-full md:w-1/2 px-2 mb-4">
        <div class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Tambah Pelanggan Baru</h3>

          <!-- Nama -->
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700">Nama</label>
            <input type="text" name="name" id="name" v-model="editedCustomer.name"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
          <!-- Email -->
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" id="email" v-model="editedCustomer.email"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
          <!-- No. HP -->
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700">No. HP</label>
            <input type="tel" name="phone" id="phone" v-model="editedCustomer.phone"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
          <!-- Jenis Kelamin -->
          <div class="mb-4">
            <label for="gender" class="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
            <select name="gender" id="gender" v-model="editedCustomer.gender"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
              <option value="male">Laki-laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
          <!-- Tanggal Lahir -->
          <div class="mb-4">
            <label for="birthdate" class="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
            <input type="date" name="birthdate" id="birthdate" v-model="editedCustomer.birthdate"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
        </div>
      </div>

      <!-- Addresses -->
      <div class="w-full md:w-1/2 pl-4">
        <div v-for="(address, index) in addresses" :key="index" class="border rounded-lg p-4 mb-4 flex flex-wrap">
          <div class="w-full flex justify-between items-center mb-2">
            <h4 class="text-lg font-medium">Alamat {{ index + 1 }}</h4>
            <button type="button" @click="removeAddress(index)" class="text-red-600 hover:text-red-800">Hapus
              Alamat</button>
          </div>
          <!-- Receiver Name and Address Name -->
          <div class="mb-2 w-full sm:w-1/2 pr-2">
            <label for="receiver_name" class="block text-sm font-medium text-gray-700">Nama Penerima</label>
            <input type="text" v-model="address.receiver_name" :name="'receiver_name_' + index"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
          <div class="mb-2 w-full sm:w-1/2 pl-2">
            <label for="address_name" class="block text-sm font-medium text-gray-700">Nama Alamat</label>
            <input type="text" v-model="address.address_name" :name="'address_name_' + index"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
          <!-- Address Details -->
          <div class="mb-2 w-full">
            <label for="address_details" class="block text-sm font-medium text-gray-700">Detail Alamat</label>
            <textarea v-model="address.address_details" :name="'address_details_' + index"
              class="px-4 py-1 border border-gray-300 rounded-md w-full"></textarea>
          </div>
          <!-- Phone and Postal Code -->
          <div class="mb-2 w-full sm:w-1/2 pr-2">
            <label for="phone" class="block text-sm font-medium text-gray-700">No. HP</label>
            <input type="tel" v-model="address.phone" :name="'phone_' + index"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
          <div class="mb-2 w-full sm:w-1/2 pl-2">
            <label for="postal_code" class="block text-sm font-medium text-gray-700">Kode Pos</label>
            <input type="text" v-model="address.postal_code" :name="'postal_code_' + index"
              class="px-4 py-1 border border-gray-300 rounded-md w-full">
          </div>
        </div>

        <!-- Button to Add New Address -->
        <div class="mb-4">
          <button type="button" @click="addNewAddress" class="text-blue-600 hover:text-blue-800">Tambah Alamat</button>
        </div>
      </div>


      <!-- Tombol Simpan dan Batal -->
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="submit"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-1 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
          Simpan
        </button>
        <button @click="showAddForm = false" type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      editedCustomer: {
        id: null,
        name: '',
        email: '',
        phone: '',
        gender: 'male',
        birthdate: ''
      },
      addresses: []
    };
  },
  methods: {
    async fetchCustomerData(customerId) {
      try {
        const response = await axios.get(`http://localhost:8000/api/customers/${customerId}`);
        const customerData = response.data;
        console.log("Response :" + `http://localhost:8000/api/customers/${customerId}`)
        console.log(JSON.stringify(customerData));

        // Set nilai editedCustomer berdasarkan respons
        this.editedCustomer = {
          id: customerData.customer.id,
          name: customerData.customer.name,
          email: customerData.customer.email,
          phone: customerData.customer.phone,
          gender: customerData.customer.gender,
          birthdate: customerData.customer.birthdate
        };
        console.log("ini"+customerData.customer.addresses);
        if (customerData.customer.addresses.length > 0) {
          console.log("masuk sini");
          // Set nilai addresses berdasarkan respons alamat
          this.addresses = customerData.customer.addresses.map(address => ({
            id: address.id,
            receiver_name: address.receiver_name,
            address_name: address.address_name,
            address_details: address.address_details,
            phone: address.phone,
            postal_code: address.postal_code
          }));
        } else {
          console.error('Data alamat tidak tersedia untuk pelanggan ini');
        }
      } catch (error) {
        console.error('Gagal mengambil data pelanggan:', error);
      }
    },
    async editCustomer() {
      try {
        // Kirim permintaan PUT untuk memperbarui data pelanggan
        const requestData = {
          ...this.editedCustomer,
          addresses: this.addresses
        };
        
        const response = await axios.put(`http://localhost:8000/api/customers/${this.editedCustomer.id}`, requestData);

        // Tampilkan pesan sukses dan arahkan ke halaman pelanggan
        console.log('Pelanggan diperbarui:', response.data.customer);
        this.$router.push('/customers');
      } catch (error) {
        // Tangani kesalahan saat menyimpan perubahan pelanggan
        console.error('Gagal menyimpan perubahan:', error);
      }
    },
    addNewAddress() {
      this.addresses.push({
        receiver_name: '',
        address_name: '',
        address_details: '',
        phone: '',
        postal_code: ''
      });
    },
    removeAddress(index) {
      this.addresses.splice(index, 1);
    },
  },
  created() {
    const customerId = this.$route.params.id;
    this.fetchCustomerData(customerId);
  }
};
</script>