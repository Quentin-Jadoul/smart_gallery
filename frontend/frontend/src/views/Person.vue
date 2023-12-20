<template>
    <div class="relative">
        <button class="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded" @click="goBack">X</button>
        <h1 class="inline-block">{{ personName }}</h1>
        <button class="ml-2 p-1 bg-blue-500 text-white rounded" @click="editName">Edit</button>
        <div class="grid grid-cols-4 gap-4 p-4">
            <div v-for="(picture, index) in uniquePictures" :key="picture.id" class="overflow-hidden">
                <img class="w-full h-48 object-contain picture" :src="picture.Path" alt="Picture" @click="openImageModal(picture)"/>
            </div>
        </div>
    </div>
    <ImageDetailModal ref="imageModal" :persons="persons" :openedFrom="'person'"/>
</template>
  
<script>
import http from '../http';
import ImageDetailModal from '@/components/ImageDetailModal.vue';

export default {
    props: ['personId'],
    components: {
        ImageDetailModal
    },
    data() {
        return {
            personName: '',
            pictures_paths: []
        }
    },
    computed: {
        picturesFromPaths() {
            return this.pictures_paths.map(picture => ({
                ...picture,
                Path: `http://127.0.0.1:8000/${picture.Path}`
            }));
        },
        uniquePictures() {
            const unique = {};
            this.picturesFromPaths.forEach(picture => {
                unique[picture.id] = picture;
            });
            return Object.values(unique);
        }
    },
    async mounted() {
        try {
            const personId = this.$route.params.personId;
            const personResponse = await http.get(`/SmartGalleryAPI/PersonApi/${personId}`);
            this.personName = personResponse.data.Name;
            console.log(this.personName);

            const pictureResponse = await http.get(`/SmartGalleryAPI/PhotoPersonApi/${personId}`);
            this.pictures_paths = pictureResponse.data;
            console.log(this.pictures_paths);
        } catch (error) {
            // Handle errors
        }
    },
    methods: {
        async editName() {
            const newName = prompt("Enter new name");
            if (newName) {
                try {
                    const personId = this.$route.params.personId;
                    await http.put(`/SmartGalleryAPI/PersonApi/${personId}`, { Name: newName });
                    this.personName = newName;
                } catch (error) {
                    // Handle errors
                }
            }
        },
        goBack() {
            this.$router.push('/persons');
        },
        openImageModal(picture) {
            console.log(picture);
            this.$refs.imageModal.open(picture, "person");
        }
    }
}
</script>

<style scoped>
.picture:hover {
    filter: blur(2px);
}
</style>