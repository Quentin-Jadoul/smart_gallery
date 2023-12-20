<!-- ImageDetailModal.vue -->
<template>
    <div v-if="isOpen" class="fixed z-10 inset-0 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true" @click.self="close">
        <div class="bg-white p-4 rounded shadow-lg max-w-md w-full">
            <img :src="selectedImage.Path" alt="Image" class="w-full" />
            <div class="mt-2">
                <label for="tagInput" class="block">Tag:</label>
                <input id="tagInput" class="bg-gray-200 text-black p-2 rounded" v-model="newTag" />
                <button class="bg-green-500 text-white p-2 m-1 rounded" @click="addTag">Confirm Tag</button>
                <div class="flex flex-wrap">
                    <span class="bg-blue-500 text-white p-2 m-1 rounded" v-if="selectedImage.Tag">
                        {{ selectedImage.Tag }}
                        <button class="ml-2 text-white" @click="deleteTag">X</button>
                    </span>
                </div>
            </div>
            <div v-if="openedFrom === 'person'">
                <label for="personSelect" class="mt-2 block">Move to:</label>
                <div class="flex items-center mt-2">
                    <select id="personSelect" class="flex-grow bg-gray-200 text-black p-2 rounded" v-model="selectedPersonId">
                        <option v-for="person in sortedPersons" :key="person.id" :value="person.id">{{ person.Name }}</option>
                    </select>
                    <button class="ml-2 px-4 py-2 bg-blue-500 text-white rounded" @click="moveImage(selectedImage.LinkId, selectedPersonId)">Move</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from '../http';

export default {
    props: ['picture', 'openedFrom'],
    data() {
        return {
            isOpen: false,
            selectedImage: null,
            persons: [],
            selectedPersonId: null
        };
    },
    computed: {
        sortedPersons() {
            return this.persons.sort((a, b) => a.Name.localeCompare(b.Name));
        }
    },
    methods: {
        async open(image) {
            this.selectedImage = image;
            this.isOpen = true;
            console.log(this.selectedImage);

            // Fetch the persons data
            const response = await http.get('/SmartGalleryAPI/PersonApi');
            this.persons = response.data;
        },
        close() {
            this.isOpen = false;
        },
        async moveImage() {
            const oldPersonid = this.$route.params.personId; // Replace with this.$route.query.Old_Person_Id if Old_Person_Id is a query parameter // Replace with this.$route.query.Old_Person_Id if Old_Person_Id is a query parameter
            console.log(oldPersonid);
            try {
                await http.put(`/SmartGalleryAPI/LinkPhotoPersonApi/${this.selectedImage.id}`, { New_Person_id: this.selectedPersonId, Old_Person_id: oldPersonid });
                this.close(); // Close the modal
            } catch (error) {
                console.error(error);
            }
        },
        async addTag() {
            if (this.newTag) {
                this.selectedImage.Tag = this.newTag;
                this.newTag = '';

                // Update the tag of the picture in the backend
                await http.put(`/SmartGalleryAPI/PhotoApi/${this.selectedImage.id}`, { Tag: this.selectedImage.Tag });
            }
        },
        async deleteTag() {
            this.selectedImage.Tag = '';

            // Update the tag of the picture in the backend
            await http.put(`/SmartGalleryAPI/PhotoApi/${this.selectedImage.id}`, { Tag: this.selectedImage.Tag });
        }
    }
}
</script>