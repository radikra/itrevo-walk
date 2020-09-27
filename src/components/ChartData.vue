<template>
	<div class="chart-section">
		<h1 class="chart-section__header">Суммарная активность</h1>
		<div class="chart-section__body">
			<div class="chart-section__loading" v-if="!loaded">
				<img src="@/assets/loading.png" alt="Вращающийся значок загрузки страницы">
			</div>
			<line-chart v-else :chartData="formattedChartData" :width="700" :height="300"></line-chart>
		</div>
		<div class="chart-section__zoom">
			<p>тут мог быть зум для графика</p>
		</div>
		<div class="chart-section__total total-data">
			<div class="total-data__block">
				<strong>Минимум: {{ distArray.minDist }} м</strong>
			</div>

			<div class="total-data__block">
				<strong>Максимум: {{ distArray.maxDist }} м</strong>
			</div>

			<div class="total-data__block">
				<strong>Суммарно за {{ chart_data.length }} {{ dayIndex }}:</strong>
				<strong> {{ distArray.sumDist }} м</strong>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from './DataLineChart'
import moment from 'moment'

export default {
	name: 'ChartData',
	components: {
		LineChart
	},
	props: {
		chart_data: {
			required: true,
			type: Array,
			default: null
		}
	},
	data() {
		return {
			loaded: false,
			label: 'Дистанция',
			formattedChartData: {}
		}
	},
	watch: {
		chart_data() {
			this.formattedChartData = {
				labels: this.chart_data.map(d => moment(d.date).format('DD.MM.YY')),
				datasets: [{
					label: '',
					data: this.chart_data.map(d => d.distance),

					fill: false,
					lineTension: 0,

					backgroundColor: 'rgba(236,23,79,1)',
					borderColor: 'rgba(236,23,79,1)',
					borderWidth: 2,

					pointBorderWidth: 2,
					pointRadius: 8,
					pointHoverRadius: 18,
					pointBackgroundColor: 'rgba(236,23,79,1)',
					pointBorderColor: 'rgba(236,23,79,1)'
				}]
			}
		}
	},
	computed: {
		distArray() {
			let distances = [];
			this.chart_data.forEach(element => distances.push(element.distance));
			return {
				minDist: Math.min.apply(null, distances),
				maxDist: Math.max.apply(null, distances),
				sumDist: distances.reduce((acc, val) => acc + val, 0)
			}
		},
		dayIndex() {
			const daysLength = this.chart_data.length
			const modDaysLength = daysLength <= 100 ? (daysLength <= 20 ? daysLength : daysLength % 10) : (daysLength % 100 <= 20 ? daysLength % 100 : daysLength % 10)

			let numEnd = '';
			switch (modDaysLength) {
				case 1:
					numEnd = 'день';
					break;
				case 2:
				case 3:
				case 4:
					numEnd = 'дня';
					break;
				default:
					numEnd = 'дней';
					break;
			}

			return numEnd;
		}
	},
	async mounted() {
		if (!this.chart_data.length) {
			await this.$store.dispatch('GET_DAYS_DATA')
			this.loaded = true
		}
	}
}
</script>
