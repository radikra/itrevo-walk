<template>
  <div id="app">
	<header class="header">
		<h2 class="header__title">Шагомер на тестовое задание</h2>
	</header>
	<main>
		<section class="data">
			<div class="wrapper">
				<div class="data__content">
					<TableData 
						:table_data='DAYS' 
						@addNewDay='addNewDay' 
						@putNewData='putNewData'
						@deleteDay='deleteDay'
					/>
					<ChartData :chart_data='DAYS' />
				</div>
			</div>
		</section>
	</main>
	
  </div>
</template>

<script>
import TableData from './components/TableData'
import ChartData from './components/ChartData'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
	TableData,
	ChartData
  },
  computed: {
	  ...mapGetters(['DAYS'])
  },
  methods: {
	  ...mapActions(['GET_DAYS_DATA', 'ADD_NEW_DAY_DATA', 'PUT_NEW_DATA', 'DELETE_DAY']),
	  addNewDay(day) {
		  this.ADD_NEW_DAY_DATA(day)
	  },
	  putNewData(day) {
		  this.PUT_NEW_DATA(day)
	  },
	  deleteDay(day) {
		  this.DELETE_DAY(day)
	  }
  },
  mounted() {
	  this.GET_DAYS_DATA()
  }
}
</script>
