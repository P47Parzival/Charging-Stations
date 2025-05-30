<template>
  <div class="login-form">
    <h2>{{ isLogin ? 'Login' : 'Register' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Email</label>
        <input 
          type="email" 
          v-model="email" 
          required 
          class="form-control"
        >
      </div>
      
      <div class="form-group" v-if="!isLogin">
        <label>Name</label>
        <input 
          type="text" 
          v-model="name" 
          required 
          class="form-control"
        >
      </div>

      <div class="form-group">
        <label>Password</label>
        <input 
          type="password" 
          v-model="password" 
          required 
          class="form-control"
        >
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isLogin ? 'Login' : 'Register' }}
      </button>
    </form>

    <p class="toggle-form">
      {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
      <a href="#" @click.prevent="toggleForm">
        {{ isLogin ? 'Register' : 'Login' }}
      </a>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { authService } from '../services/auth'

const router = useRouter()
const toast = useToast()

const isLogin = ref(true)
const email = ref('')
const password = ref('')
const name = ref('')

const toggleForm = () => {
  isLogin.value = !isLogin.value
}

const handleSubmit = async () => {
  try {
    if (isLogin.value) {
      await authService.login(email.value, password.value)
      router.push('/dashboard')
    } else {
      await authService.register(name.value, email.value, password.value)
      toast.success('Registration successful! Please login.')
      isLogin.value = true
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'An error occurred')
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-form {
  text-align: center;
  margin-top: 15px;
}
</style> 