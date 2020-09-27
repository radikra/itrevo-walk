<script>
import {Line, mixins} from 'vue-chartjs'
import 'chartjs-plugin-style'

export default {
	extends: Line,
	mixins: [mixins.reactiveProp],
	data() {
		return {
			chartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				layout: {
					padding: {
						left: 20,
						right: 20,
						top: 40,
						bottom: 0
					}
				},
				legend: {
					display: false
				},
				tooltips: {
					backgroundColor: 'rgba(255,255,255,1)',
					titleFontFamily: "'PT Sans Caption', sans-serif",
					titleFontSize: 16,
					titleFontColor: 'rgba(28, 32, 37, 0.4)',
					titleMarginBottom: 16,
					bodyFontFamily: "'PT Sans Caption', sans-serif",
					bodyFontSize: 24,
					bodyFontColor: '#000',
					bodyAlign: 'center',
					xPadding: 11,
					yPadding: 11,
					cornerRadius: 5,
					displayColors: false,
					shadowOffsetX: 0,
					shadowOffsetY: 2,
					shadowBlur: 5,
					shadowColor: 'rgba(0, 0, 0, 0.25)'
				}
			}
		}
	},
	mounted() {
		this.renderChart(this.chartData, this.chartOptions)
	}
}
</script>