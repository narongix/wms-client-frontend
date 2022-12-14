<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Product Categories</h5>
                <Button v-if="!isLoading" label="Create" class="p-button-success mr-2" @click="goToNewProduct" />
                <p></p>
                <DataTable :value="prodCategories" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" filterDisplay="menu" :loading="loading1" responsiveLayout="scroll">

                
                    <template #loading v-if="isLoading">
                        Loading product data. Please wait.
                    </template>


                    <!-- <Column field="Barcode" header="Barcode" style="min-width:15rem">
                        <template #body="{ data }">
                            <product-item :data="data"></product-item>
                        </template>
                    </Column> -->

                    <Column field="categoryName" header="Category Name" style="min-width:12rem">
                        <template #body="{ data }">
                            {{ data.category_name }}
                        </template>
                    </Column>
        
                    <Column headerStyle="min-width:10rem;" header="Actions" style="width:5%">
                        <template #body="slotProps">
                            <!-- <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="editProduct(slotProps.data)" /> -->
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
                                @click="confirmDeleteProduct(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
                <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="product">Are you sure you want to delete <b>{{ product.name }}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text"
                            @click="deleteProductDialog = false" />
                        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
                    </template>
                </Dialog>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    components: {
      
    },
    data() {
        return {
            loading1: true,
        }
    },
    computed: {
        prodCategories() {
            return this.$store.getters['products/prodCategories'];
        },
        isLoading() {
            return this.loading1;
        }
    },
    created() {
        this.loadProductCategories();
    },
    methods: {

        async loadProductCategories(refresh = false) {

            try {
                await this.$store.dispatch('products/getProdCategories', {
                    forceRefresh: refresh,
                });
            } catch (error) {
                this.error = error.message || 'Something went wrong!';
            }

            this.loading1 = false;
        },
       
    }

}
</script>

<style scoped lang="scss">
@import '../../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
