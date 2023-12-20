<template>
    <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
        aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="close"></div>
        <div
            class="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <input type="file" multiple @change="handleFiles">
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div v-if="isLoading" class="loader"></div>
                <button type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="uploadFiles">
                    Upload
                </button>
                <button type="button"
                    class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                    @click="close">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>
  
<script>
import http from '../http';

export default {
    data() {
        return {
            isLoading: false,
            isOpen: false,
            files: []
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        handleFiles(event) {
            this.files = Array.from(event.target.files);
        },
        async uploadFiles() {
            this.isLoading = true;
            const formData = new FormData();

            this.files.forEach((file, index) => {
                formData.append(`file${index}`, file);
            });

            try {
                const response = await http.post('/SmartGalleryAPI/PhotoApi/upload', formData);
                // Handle successful upload
                this.close();
                // refresh the page
                this.$router.go();
            } catch (error) {
                // Handle errors
            } finally {
                this.isLoading = false; // End loading
            }
        }
    }
}
</script>

<style scoped>

.loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin-left: 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>