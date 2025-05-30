<template>
  <div class="station-list">
    <div class="filters">
      <select v-model="filters.status" class="filter-select">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select v-model="filters.connectorType" class="filter-select">
        <option value="">All Connector Types</option>
        <option value="Type 1">Type 1</option>
        <option value="Type 2">Type 2</option>
        <option value="CCS">CCS</option>
        <option value="CHAdeMO">CHAdeMO</option>
      </select>

      <input 
        type="number" 
        v-model="filters.minPower" 
        placeholder="Min Power (kW)"
        class="filter-input"
      >
    </div>

    <div class="stations">
      <div v-for="station in filteredStations" :key="station._id" class="station-card">
        <h3>{{ station.name }}</h3>
        <p>Status: {{ station.status }}</p>
        <p>Power Output: {{ station.powerOutput }} kW</p>
        <p>Connector Type: {{ station.connectorType }}</p>
        <div class="station-actions">
          <button @click="editStation(station)" class="btn-edit">Edit</button>
          <button @click="deleteStation(station._id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>

    <button @click="showAddForm = true" class="btn-add">Add New Station</button>

    <StationForm
      v-if="showAddForm || editingStation"
      :station="editingStation"
      @close="closeForm"
      @save="saveStation"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { stationService } from '../services/stations'
import StationForm from './StationForm.vue'

const toast = useToast()
const stations = ref([])
const showAddForm = ref(false)
const editingStation = ref(null)

const filters = ref({
  status: '',
  connectorType: '',
  minPower: ''
})

const filteredStations = computed(() => {
  return stations.value.filter(station => {
    if (filters.value.status && station.status !== filters.value.status) return false
    if (filters.value.connectorType && station.connectorType !== filters.value.connectorType) return false
    if (filters.value.minPower && station.powerOutput < filters.value.minPower) return false
    return true
  })
})

const loadStations = async () => {
  try {
    stations.value = await stationService.getAllStations()
  } catch (error) {
    toast.error('Failed to load stations')
  }
}

const editStation = (station) => {
  editingStation.value = { ...station }
}

const deleteStation = async (id) => {
  if (confirm('Are you sure you want to delete this station?')) {
    try {
      await stationService.deleteStation(id)
      stations.value = stations.value.filter(s => s._id !== id)
      toast.success('Station deleted successfully')
    } catch (error) {
      toast.error('Failed to delete station')
    }
  }
}

const saveStation = async (stationData) => {
  try {
    if (stationData._id) {
      await stationService.updateStation(stationData._id, stationData)
      const index = stations.value.findIndex(s => s._id === stationData._id)
      stations.value[index] = stationData
    } else {
      const newStation = await stationService.createStation(stationData)
      stations.value.push(newStation)
    }
    closeForm()
    toast.success('Station saved successfully')
  } catch (error) {
    toast.error('Failed to save station')
  }
}

const closeForm = () => {
  showAddForm.value = false
  editingStation.value = null
}

onMounted(loadStations)
</script>

<style scoped>
.station-list {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.filter-select,
.filter-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.stations {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.station-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: white;
}

.station-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-edit,
.btn-delete,
.btn-add {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-edit {
  background-color: #4CAF50;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-add {
  background-color: #2196F3;
  color: white;
  margin-top: 20px;
}
</style> 