<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				
				<DataTable :value="transfers" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
					:rowHover="true" filterDisplay="menu" :loading="loading1" responsiveLayout="scroll">

					<!-- <template #header>
						<div class="flex justify-content-between flex-column sm:flex-row">

						</div>
					</template> -->
					<template #empty>
						No transfers found.
					</template>
					<template #loading>
						Loading transfers data. Please wait.
					</template>



					<Column field="Reference" header="Reference" style="min-width:12rem">
						<template #body="{ data }">
							<transfer-item :data="data"></transfer-item>
						</template>

					</Column>

					<Column field="Date" header="Date" style="min-width:12rem">
						<template #body="{ data }">
							{{ data.reference }}
						</template>
					</Column>

					<Column field="From" header="From" style="min-width:12rem">
						<template #body="{ data }">
							{{ data.from }}
						</template>
					</Column>

					<Column field="To" header="To" style="min-width:12rem">
						<template #body="{ data }">
							{{ data.to }}
						</template>
					</Column>



				</DataTable>
			</div>
		</div>

	</div>
</template>

<script>

export default {
	data() {
		return {
			loading1: false
		}
	},
	computed: {
		transfers() {
			return this.$store.getters['transfers/transfers'];
		},
		hasTransfers() {
			return this.$store.getters['transfers/hasTransfers'];
		},
		LoginStatus() {
			return this.$store.getters.isLoggedIn;
		},
		accessToken() {
			return localStorage.accessToken;
		}
	}

}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
	font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
	font-weight: bold;
}
</style>
