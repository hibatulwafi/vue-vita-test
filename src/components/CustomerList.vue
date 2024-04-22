<template>

  <div class="max-w-screen-xl mx-auto px-5 grid grid-cols-2">
    <h2 class="text-lg font-semibold mb-4 mt-4">Daftar Pelanggan</h2>
    <div class="text-right mt-4">
      <a href="/customers/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Tambah Pelanggan
      </a>
    </div>


  </div>
  <div class="mx-auto max-w-screen-xl px-5">

    <div class="flex justify-end mt-4">
      <input type="text" v-model="searchQuery" placeholder="Cari nama pelanggan..."
        class="w-64 px-4 py-2 border border-gray-300 rounded-md mr-2">
      <button @click="searchCustomer"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">Cari</button>
    </div>
  </div>

  <div class="mx-auto max-w-screen-xl px-5">
    <!-- Tabel -->
    <div class="overflow-x-auto mt-4">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Header Tabel -->
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Foto
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.
              HP</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis
              Kelamin</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tanggal Lahir</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Alamat</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi
            </th>
          </tr>
        </thead>
        <!-- Isi Tabel -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="customer in paginatedCustomers" :key="customer.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="customer.photo" alt="Photo" class="w-12 h-12 rounded-full">
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ customer.birthdate }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="showAddresses(customer.addresses)"
                class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Lihat Alamat</button>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="editCustomer(customer)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
              <button @click="deleteCustomer(customer.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end mt-4 mb-6">
      <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2" :disabled="currentPage === 1"
        @click="currentPage--">Previous</button>
      <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md" :disabled="currentPage === totalPages"
        @click="currentPage++">Next</button>
    </div>


    <!-- Modal Alamat -->

    <div v-if="showAddressModal"
      class="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-md mx-auto">
        <!-- Judul modal -->
        <div class="bg-gray-50 px-4 py-3">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Alamat Pelanggan</h3>
        </div>
        <!-- Isi modal -->
        <div class="bg-white px-4 py-5">
          <ul>
            <li v-for="address in currentAddresses" :key="address.id">
              <!-- Tampilkan alamat pelanggan -->
              <div>{{ address.address_name }}, {{ address.address_details }}, {{ address.postal_code }}</div>
              <div>Penerima: {{ address.receiver_name }}</div>
              <div>No. HP: {{ address.phone }}</div>
            </li>
          </ul>
        </div>
        <!-- Tombol tutup modal -->
        <div class="bg-gray-50 px-4 py-3">
          <button @click="showAddressModal = false" type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm">
            Tutup
          </button>
        </div>
      </div>
    </div>

  </div>


</template>



<script>
import axios from 'axios';

export default {
  name: "CustomerList",
  data() {
    return {
      customers: [],
      currentPage: 1,
      pageSize: 10,
      showAddressModal: false,
      searchQuery: ''
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.customers.length / this.pageSize);
    },
    paginatedCustomers() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.customers.slice(startIndex, endIndex);
    }
  },
  mounted() {
    this.fetchCustomers();
  },
  methods: {
    showAddresses(addresses) {
      console.log('Addresses:', addresses);
      this.currentAddresses = addresses;
      console.log('Current Addresses:', this.currentAddresses);
      this.showAddressModal = true;
      console.log('Show Address Modal:', this.showAddressModal);
    },
    fetchCustomers() {
      axios.get('http://localhost:8000/api/customers')
        .then(response => {
          this.customers = response.data.customers;
          console.log(this.customers);
        })
        .catch(error => {
          console.error('Error fetching customers:', error);
        });
    },
    editCustomer(customer) {
      console.log('Edit customer:', customer);
      this.$router.push({ name: 'EditCustomer', params: { id: customer.id } });
    },
    deleteCustomer(customerId) {
      if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
        axios.delete(`http://localhost:8000/api/customers/${customerId}`)
          .then(() => {
            this.fetchCustomers();
          })
          .catch(error => {
            console.error('Error deleting customer:', error);
          });
      }
    },
    showAddForm() {
      console.log('Tampilkan formulir tambah pelanggan');
    },
    searchCustomer() {
      axios.get(`http://localhost:8000/api/customers/search?keyword=${this.searchQuery}`)
        .then(response => {
          this.customers = response.data.customers;
        })
        .catch(error => {
          console.error('Error searching customers:', error);
        });
    },
  },
};
</script>
