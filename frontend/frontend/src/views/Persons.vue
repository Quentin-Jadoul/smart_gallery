<template>
    <div class="grid grid-cols-5 gap-4 p-4">
        <PersonCard v-for="person in persons" :key="person.id" :name="person.Name" :picture="person.picture" @click.native="goToPerson(person.id, person.Name)" />
    </div>
</template>
  
<script>
import PersonCard from '@/components/PersonCard.vue'
import http from '../http';

export default {
    components: {
        PersonCard
    },
    data() {
        return {
            persons: []
        }
    },
    methods: {
        goToPerson(personId, personName) {
            this.$router.push({ 
                name: 'Person', 
                params: { personId }, 
                props: { personName } 
            });
        }
    },
    async mounted() {
        try {
            const response = await http.get('/SmartGalleryAPI/PersonApi');
            this.persons = response.data;

            for (let person of this.persons) {
                try {
                    const pictureResponse = await http.get(`/SmartGalleryAPI/CroppedFaceApi/${person.id}`, { responseType: 'blob' });
                    const imageUrl = URL.createObjectURL(pictureResponse.data);
                    person.picture = imageUrl;
                } catch (error) {
                    // Handle errors
                    person.picture = 'default-picture-url'; // Replace with your default picture URL
                }
            }
        } catch (error) {
            // Handle errors
        }
    }
}
</script>