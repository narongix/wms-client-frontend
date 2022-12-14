<template>
	<router-view></router-view>
	<div class="col-12">

		<div class="card">
			<h5>Transfer Reference: {{ transferDetails.reference }}</h5>
			<Button label="EDIT" class="p-button-success mr-2" @click="changeEditMode" />
			<hr>
			<p></p>
			<div class="p-fluid formgrid grid">
				<div class="field col-12 md:col-3">
					<label for="contact">Contact:</label>
					<InputText id="contact" type="text" :disabled="isEditting" />
					<!-- <text>&emsp;Contact data</text> -->
				</div>
				<div class="field col-12 md:col-3">
					<label for="operation-type">Operation Type</label>
					<InputText id="operation-type" type="text" :disabled="isEditting" />
					<!-- <text>&emsp;Operation Type data</text> -->
				</div>
				<div class="field col-12 md:col-12"></div><!-- empty space -->

				<div class="field col-12 md:col-3">
					<label for="source-location">Source Location</label>
					<InputText id="source-location" type="text" :disabled="isEditting" />
				</div>
				<div class="field col-12 md:col-3">
					<label for="destination">Destination Location</label>
					<InputText id="destination" type="text" :disabled="isEditting" />
				</div>
				<div class="field col-12 md:col-3">
					<label for="scheduled-date">Scheduled Date</label>
					<InputText id="scheduled-date" type="text" :disabled="isEditting" />
					<!-- <text>&emsp;Operation Type data</text> -->
				</div>
				<div class="field col-12 md:col-3">
					<label for="effective-date">Effective Date</label>
					<InputText id="effective-date" type="text" :disabled="isEditting" />
					<!-- <text>&emsp;Operation Type data</text> -->
				</div>


			</div>
		</div>
	</div>

</template>

<script>
import TransferService from '../service/TransferService';
export default {
	props: ['transferDto'],
	data() {
		return {
			transferDetails: null,
			isEditting: true
		}
	},
	transferService: null,
	created() {
		this.transferService = new TransferService();
		this.loadData();
	},

	methods: {
		changeEditMode() {
			this.isEditting = !this.isEditting;
			console.log(this.isEditting);
		},
		loadData() {
			let _id = this.$route.params.id;
			console.log(`Before GetDetail ${_id}`)
			this.transferService.getTransferDetails(_id).then(data => {
				this.transferDetails = data[0];
				this.loading1 = false;
				console.log(`Props data: ${JSON.stringify(this.transferDetails)}`);
			});
		}
	}
}
</script>
