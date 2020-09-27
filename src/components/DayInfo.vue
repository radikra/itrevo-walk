<template>
	<tr class="data-table__row">
		<td class="data-table__date">
			<div class="date">
				<div class="date__form">
					<p class="date__day">{{ formattedData.date[0] }}</p>
					<p class="date__date">{{ formattedData.date[1] }}</p>
				</div>
				<div class="date__actions">
					<TooltipEdit class="custom" @click="editingData" />
					<DeleteCircle class="custom" @click="deletingData" />
				</div>
			</div>
		</td>
		<td class="data-table__distance">{{ formattedData.distance }}</td>
	</tr>
</template>

<script>
import TooltipEdit from 'vue-material-design-icons/TooltipEdit.vue'
import DeleteCircle from 'vue-material-design-icons/DeleteCircle'

export default {
	name: 'dayInfo',
	components: {
		TooltipEdit,
		DeleteCircle
	},
	props: {
		day_info: {
			type: Object,
			default: null
		}
	},
	computed: {
		formattedData() {
			const d = this.day_info.distance
			return {
				date: new Date(this.day_info.date)
						.toLocaleDateString('ru-RU', {
							weekday: 'long',
							year: 'numeric',
							month: 'numeric',
							day: 'numeric'
						})
						.split(', '),
				distance: (d - (d % 1000)) / 1000 + ' км ' + d % 1000 + ' м'
			}
		}
	},
	methods: {
		editingData() {
			const {...dayInfo} = this.day_info
			this.$emit('editDayData', dayInfo)
		},
		deletingData() {
			const {...delDay} = this.day_info
			this.$emit('deleteDayData', delDay)
		}
	}
}
</script>
