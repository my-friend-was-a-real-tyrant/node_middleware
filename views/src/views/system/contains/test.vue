<template>
    <div>
        <input type="file" id="file">
        <button @click="handleUpload">上传</button>
    </div>
</template>
<script lang="babel">
    import zdUpload from 'publicComponents/upload/upload';

    export default {
        components: {
            zdUpload
        },
        data() {
            return {
                uploadFormData: []
            }
        },
        methods: {
            handleUpload() {
                console.log(this.uploadFormData);
                const formData = new FormData();
                // for (let key in this.uploadFormData) {
                //     formData.append('file', this.uploadFormData[key]);
                // }
                formData.append('uploadType', 1);
                formData.append('uploadFileType', 1);
                formData.append('file', document.getElementById('file').files[0]);

                // for(var pair of formData.entries()) {
                //    console.log(pair[0]+ ', '+ pair[1]); 
                // }
                
                this.$http({
                    url: '/api/test/postTest',
                    method: 'post',
                    data: formData
                }).then((response) => {
                    // ..
                }).catch((response) => {
                    console.log(response);
                });
            }
        }
    }
</script>