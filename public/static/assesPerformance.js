export default function assessPerformance() {

	var experiment_data = jsPsych.data.get().filter({task: 'test'});
	var missed_count = 0
	var trial_count = 0
	var rt_array = []
	var rt = 0
	
	var choice_counts = {}
	choice_counts[-1] = 0
	for (var k = 0; k < choices.length; k++) {
		choice_counts[choices[k]] = 0
	}
	for (var i = 0; i < experiment_data.length; i++) {
		trial_count += 1
			rt = experiment_data[i].rt
			key = experiment_data[i].key_press
			choice_counts[key] += 1
			if (rt == -1) {
				missed_count += 1
			} else {
				rt_array.push(rt)
			}
	}
	var avg_rt = -1
	if (rt_array.length !== 0) {
		avg_rt = math.median(rt_array)
	}

	var responses_ok = true
	Object.keys(choice_counts).forEach(function(key, index) {
		if (choice_counts[key] > trial_count * 0.85) {
			responses_ok = false
		}
	})


	 var rtarr = []
		for (i=0; i<resparr.length; i++) {
		if (resparr[i].rt < 1000) {
			rtarr.push(resparr[i].rt)
				}
			}
	var avrt = rtarr.reduce((a, b) => a + b, 0)/rtarr.length
	corrarr = []
		for (i=0; i<resparr.length; i++) {
		if (resparr[i].corr = true) {
			rtarr.push(resparr[i].rt)
				}
			}

			var nocue_cong = []
			var center_cong = []
			var double_cong = []
			var spatial_cong = []
			var nocue_incong = []
			var center_incong = []
			var double_incong = []
			var spatial_incong = []
			var nocue_neutral = []
			var center_neutral = []
			var double_neutral = []
			var spatial_neutral = []


			for (i=0; i<resparr.length; i++) {
				if (resparr[i].corr = true && resparr[i].cue == "nocue" && resparr[i].flanker_type == "congruent") {
					nocue_cong.push(resparr[i].rt)
						}
				else if (resparr[i].corr = true && resparr[i].cue == "center" && resparr[i].flanker_type == "congruent") {
					center_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "double" && resparr[i].flanker_type == "congruent") {
					double_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "spatial" && resparr[i].flanker_type == "congruent") {
					spatial_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "nocue" && resparr[i].flanker_type == "incongruent") {
					nocue_incong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "center" && resparr[i].flanker_type == "incongruent") {
					center_incong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "double" && resparr[i].flanker_type == "incongruent") {
					double_incong.push(resparr[i].rt)
								}

				else if (resparr[i].corr = true && resparr[i].cue == "spatial" && resparr[i].flanker_type == "congruent") {
					spatial_cong.push(resparr[i].rt)
						}

				else if (resparr[i].corr = true && resparr[i].cue == "nocue" && resparr[i].flanker_type == "neutral") {
							nocue_neutral.push(resparr[i].rt)
								}

				else if (resparr[i].corr = true && resparr[i].cue == "center" && resparr[i].flanker_type == "neutral") {
							nocue_neutral.push(resparr[i].rt)
								}

				else if (resparr[i].corr = true && resparr[i].cue == "double" && resparr[i].flanker_type == "neutral") {
							double_neutral.push(resparr[i].rt)
								}

				else if(resparr[i].corr = true && resparr[i].cue == "spatial" && resparr[i].flanker_type == "neutral") {
							spatial_neutral.push(resparr[i].rt)
								}
					}

				var nocue = [...nocue_cong, ...nocue_incong, ...nocue_neutral]
				var centralcue = [...center_cong, ...center_incong, ...center_neutral]
				var spatialcue= [...spatial_cong,...spatial_incong,...spatial_neutral]
				var doublecue =[...double_cong, ...double_incong, ...double_neutral]
				var congruent = [...nocue_cong, ...center_cong, ...double_cong, ...spatial_cong]
				var incongruent = [...nocue_incong, ...center_incong, ...double_incong, ...spatial_incong]

				var mean_nocue = math.mean(nocue)
				var mean_central = math.mean(centralcue)
				var mean_spatial = math.mean(spatialcue)
				var mean_double = math.mean(doublecue)
				var mean_congruent = math.mean(congruent)
				var mean_incongruent = math.mean(incongruent)

				var executive = mean_incongruent - mean_congruent
				var alerting = mean_nocue - mean_double
				var orienting = mean_central - mean_spatial

				var respObj = {exec:executive, alert: alerting, orient:orienting}

				networks.push(respObj)
				valarr.push(myvalues)
				console.log(networks)
				console.log(myvalues)
				console.log(valarr)	
 
			var corr_nocue_cong =  100-(nocue_cong.length/12)*100
			var corr_center_cong = 100 - (center_cong.length/12)*100
			var corr_double_cong = 100 - (double_cong.length/12)*100
			var corr_spatial_cong = 100 - (spatial_cong.length/12)*100
			var corr_nocue_incong = 100 - (nocue_incong.length/12)*100
			var corr_center_incong = 100 - (center_incong.length/12)*100
			var corr_double_incong = 100 - (double_incong.length/12)*100
			var corr_spatial_incong = 100 - (spatial_incong.length/12)*100
			var corr_nocue_neutral = 100 - (nocue_neutral.length/12)*100
			var corr_center_neutral = 100 - (center_neutral.length/12)*100
			var corr_double_neutral = 100 - (double_neutral.length/12)*100
			var corr_spatial_neutral = 100 - (spatial_neutral.length/12)*100

			var correctObj = {congruent_nocue:corr_nocue_cong, congruent_center:corr_center_cong, congruent_double:corr_double_cong, congruent_spatial:corr_spatial_cong,
			incongruent_nocue:corr_nocue_incong, incongruent_center:corr_center_incong, incongruent_double:corr_double_incong, incongruent_spatial:corr_spatial_incong,
		neutral_nocue:corr_nocue_neutral, neutral_center:corr_center_neutral, neutral_double:corr_double_neutral, neutral_spatial:corr_spatial_neutral}

		perf.push(correctObj)
		console.log(perf)

}