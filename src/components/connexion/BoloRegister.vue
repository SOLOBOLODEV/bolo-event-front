<template>
    <div>
        <label class="block py-1">Mail</label>
        <input type="email"
            class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
        <p class="text-sm mt-2 px-2 hidden text-gray-600">Text helper</p>
    </div>
    <div>
        <label class="block py-1">Password</label>
        <input type="password"
            class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div>
        <label class="block py-1">Retype Password</label>
        <input type="password"
            class="border w-full py-2 px-2 rounded shadow hover:border-indigo-600 ring-1 ring-inset ring-gray-300 font-mono">
    </div>
    <div class="flex gap-3 pt-3 items-center">
        <button
            class="border hover:border-indigo-600 px-4 py-2 rounded-lg shadow ring-1 ring-inset ring-gray-300">Register</button>
    </div>
</template>

<script setup>

</script>