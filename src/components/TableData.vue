<template>
	<div class="table-section">
		<div class="table-section__data">
			<table class="data-table">
				<thead>
					<tr class="data-table__head">
						<th class="data-table__date">
							<span class="data-table__text">Дата</span>
							<ArrowUpBoldBox 
								class="custom" 
								:class="{active: activeDate, down: sortDate}" 
								@click="sortByDate" 
							/>
						</th>
						<th class="data-table__distance data-table__distance_head">
							<span class="data-table__text">Дистанция</span>
							<ArrowUpBoldBox 
								class="custom" 
								:class="{active: activeDistance, down: sortDistance}" 
								@click="sortByDistance" 
							/>
						</th>
					</tr>
				</thead>
				<transition-group name="flip-list" tag="tbody">
					<dayInfo 
						v-for="day in table_data"
						:key="day.id"
						:day_info="day"
						@editDayData='editDayData'
						@deleteDayData='deleteDayData'
					/>
				</transition-group>
			</table>
		</div>
<!-- добавление новой записи -->
		<transition name="slide-fade" mode="out-in">
			<div 
				class="table-section__new-entry"
				v-if="addEntry"
			>
				<form class="new-entry__form" @submit.prevent="postNewEntry">
					<fieldset class="new-entry__field">
						<label for="distance" class="new-entry__label">Сегодня вы прошли<span>:</span></label>
						<input 
							type="number" 
							name="distance" 
							minlength="4"
							class="new-entry__input" 
							v-model.number="newEntryData.distance" 
							autocomplete="off"
							autofocus
							required
						>
						<small class="new-entry__description"><sup>*</sup>Введите дистанцию в метрах.<br>Дата будет добавлена автоматически</small>
					</fieldset>
					<input type="submit" value="Добавить" class="new-entry__submit">
				</form>
			</div>
		</transition>
<!-- редактирование записи -->
		<transition name="slide-fade" mode="out-in">
			<div 
				class="table-section__new-entry" 
				v-if="editEntry"
			>
				<form class="new-entry__form" @submit.prevent="putNewData">
					<fieldset class="new-entry__field">
						<label for="distance" class="new-entry__label"><span>{{ date }}</span> вы прошли:</label>
						<input 
							type="number" 
							name="distance" 
							minlength="4"
							class="new-entry__input" 
							v-model.number="distance" 
							autocomplete="off"
							autofocus
							required
						>
						<small class="new-entry__description"><sup>*</sup>Введите дистанцию в метрах.<br>Изменить дату нельзя.</small>
					</fieldset>
					<input type="submit" value="Обновить запись" class="new-entry__submit">
				</form>
			</div>
		</transition>
<!-- удаление записи -->
		<transition name="slide-fade" mode="out-in">
			<div 
				class="table-section__new-entry" 
				v-if="delEntry"
			>
				<div class="new-entry__form">
					<div class="new-entry__field">
						<p class="new-entry__label"><span>{{ distance }}</span> м</p>
						<p class="new-entry__text">Такое расстояние вы собираетесь удалить. <strong>Продолжить?</strong></p>
						<button 
							class="new-entry__submit"
							@click="deleteDay"
						>Удалить запись</button>
					</div>
				</div>
			</div>
		</transition>
<!-- кнопка вызова окна добавления новой записи -->
		<button class="table-section__action" @click="addEntryBtn">Добавить запись</button>
	</div>
</template>

<script>
import ArrowUpBoldBox from 'vue-material-design-icons/ArrowUpBoldBox.vue'
import dayInfo from './DayInfo'
import moment from 'moment'

export default {
	name: 'TableData',
	components: {
		ArrowUpBoldBox,
		dayInfo
	},
	props: {
		table_data: {
			required: true,
			type: Array,
			default: null
		}
	},
	data() {
		return {
			sortDate: false,
			sortDistance: false,
			activeDate: true,
			activeDistance: false,
			addEntry: false,
			editEntry: false,
			delEntry: false,
			newEntryData: {
				date: '',
				distance: ''
			},
			date: '',
			distance: '',
			tempEntryData: {}
		}
	},
	methods: {
		sortByDate() {
			this.sortDate ? this.table_data.sort((a,z) => a.id - z.id) : this.table_data.sort((a,z) => z.id - a.id)
			this.sortDate = !this.sortDate
			this.activeDate = true
			this.activeDistance = false
		},
		sortByDistance() {
			this.sortDistance ? this.table_data.sort((a,z) => a.distance - z.distance) : this.table_data.sort((a,z) => z.distance - a.distance)
			this.sortDistance = !this.sortDistance
			this.activeDate = false
			this.activeDistance = true
		},
		addEntryBtn() {
			this.addEntry = !this.addEntry
		},
		postNewEntry() {
			this.newEntryData.date = new Date().toJSON()
			const {...day} = this.newEntryData
			this.$emit('addNewDay', day)
			this.newEntryData.date = ''
			this.newEntryData.distance = ''
			this.addEntryBtn()
		},
		editDayData(editDay) {
			this.date = moment(this.editDay).format('DD.MM.YYYY')
			this.tempEntryData = editDay
			this.editEntry = !this.editEntry
		},
		putNewData() {
			this.tempEntryData.distance = this.distance
			const {...editedDay} = this.tempEntryData
			this.$emit('putNewData', editedDay)
			this.date = ''
			this.tempEntryData = {}
			this.editEntry = !this.editEntry
		},
		deleteDayData(delInfo) {
			this.distance = delInfo.distance
			this.tempEntryData = delInfo
			this.delEntry = !this.delEntry
		},
		deleteDay() {
			const {...deletingDay} = this.tempEntryData
			this.$emit('deleteDay', deletingDay)
			this.distance = ''
			this.tempEntryData = {}
			this.delEntry = !this.delEntry
		}
	}
}
</script>