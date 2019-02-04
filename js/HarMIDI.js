// Recording MIDI signals

		var play_button_clicked;
		var harm_button_clicked;
		var complete_button_clicked;
		var second_button_clicked;

		var send; // Boolean variable indicating if we are recording MIDI signals or not

		var melody_channel; // Variable used to retrieve the number of the melody channel
		var chord_channel; // Variable used to retrieve the number of the chords channel

		var first_melody_index; // First index of melody_array array in the subsequent recordings
		var last_melody_index; // Variable keeping track of the last index of melody_array in the subsequent recordings

		var last_chord_index; // Variable keeping track of the last index of chord_array in the subsequent recordings

		var first_min_index; // First index of MinNote array in the subsequent recordings
		var min_note_i; // Index used to populate min_note_array and min_note_time in the function getMinNote AND to keep track of the last index of min_note_array in the function record

		var counter_second = 0; //keeps track of the index on the second counterpoint array
		var last_note_second = 0;

	// Getting MIDI Message for chords and melody
		var i; // melody_array index in getMIDIMessage
		var melody_array = new Array; //Array in which we store all the informations regarding the melody notes
		var melody_time; //Array keeping track of all the Timestamp of the different melody notes
	
		var j; // chord_array index in getMIDIMessage
		var chord_array = new Array; // Array containing the informations concerning the raw chords imported from the MIDI
		var chord_time; //Array keeping track of all the Timestamp of the different chord notes
	
	// Getting the durations for the note arrays
		//MinNOte
		var m; // Index used to compute the calculation od the lowest note of the chord in the function getMinNote
		var min_note; // Lowest note for each chord
		var min_note_index; // Index of the lowest note of the chord in chord_array
		var min_note_array; // Array containing the data from each lowest note computed from each chord
		var min_note_time;  // Array containing the Timestamp of each lowest note computed from each chord
		var min_note_i; // Index used to populate min_note_array and min_note_time in the function getMinNote AND to keep track of the last index of min_note_array in the function record

		//Chords
		var chord_i; // Index used to populate the arrays used to create the new chords
		var chord_duration; //Array containing the duration of the chords notes
		var chordOn; // Boolean array stating if the chord note is being played (true) or there is a pause (false)

			//Ctp1
		var ctp1_array = new Array; // Array containing the First Species Counterpoint notes
		var ctp1On = new Array; // Boolean array stating if the counterpoint note is being played (true) or there is a pause (false)

		var cons_notes; // Array containing all the possible distances used to create CONSONANT notes for the First and Second Species Counterpoints

			//Ctp2
		var ctp2_i; // Index used to populate all the variables concerning the Second Species Counterpoint notes
		var ctp2_duration = new Array; // Array containing the Second Species Counterpoint notes' durations
		var ctp2_array = new Array; // Array containing the  the Second Species Counterpoint notes derived by min_note_array
		var ctp2On = new Array; // Boolean array stating if the counterpoint note is being played (true) or there is a pause (false)

		var diss_notes; // Array containing all the possible distances used to create DISSONANT notes for the Second Species Counterpoint
		
		//Melody
		var note_i; // Index used to compute the durations of melody_array in the function makeNoteDuration
		var melody_duration; //Array containing the duration of the melody notes
		var noteOn;	// Boolean array stating if the melody note is being played (true) or there is a pause (false)
		var melody_dur = new Array;

	// Managing color synchronization
		var harmony; // Boolean value to synchronize the changing of the color of the Play Complete Melody in the case in which chords and melody duration arrays have different total duration
		var second;

	// Playing notes
		var midi_chord_freq; // Frequency value concerning the chord in the MIDI Keyboard
		var keyb_chord_freq; // Chord Frequency value corresponding to the value of the MIDI Keyboard
	
	// Melody playing ALONE
		var min_midi_freq; // Minimum frequency value in the MIDI Keyboard
		var min_keyb_freq; // Minimum frequency value corresponding to the minimum value of the MIDI Keyboard

		var k; // Index used to span the elements contained in melody_array and play them

		var volume_slider_1; // Element controlling the volume slider of melody alone
		var output_1; // Element controlling the intensity of the gain of the volume slider of melody alone
		var valore_gain; // Value of the gain for the reproduction of melody alone

		var c; // AudioContext variable for the function playMelody
		var osc; // Oscillator connected to context that plays melody_array
		var gainNode; // Gain node connected to osc
		var analyserMelody;
		var bufferLength;
		var dataArray;

	// First Species Ctp chords reproduction ALONE
		var g; // Index used to span the elements concerning the First Species Ctp (min_not_array and ctp1_array) and play them

		var volume_slider_2; // Element controlling the volume slider of First Species Ctp Chords alone
		var output_2; // Element controlling the intensity of the gain of the volume slider of First Species Ctp Chords alone
		var valore_gain_2; // Value of the gain for the reproduction of First Species Ctp Chords alone

		var context; // AudioContext variable for the function playFirstCtp that plays the First Species Ctp chords
		var oscNode1; // Oscillator connected to context that plays min_note_array
		var oscNode2; // Oscillator connected to context that plays ctp1_array
		var oscNode3; 
		var constantNode; // Node that assures synchronicity between min_note_array and ctp1_array
		var gainNode1; // Gain node connected to OscNode1
		var gainNode2; // Gain node connected to OscNode2
		var gainNode3;
		var analyser_min; //analysers node to get a time representation of the played piece
		var analyser_ctp1
		var bufferLength_min;
		var bufferLength_ctp1;
		var dataArray_min;
		var dataArray_ctp1;

	// Second Species Ctp chords reproduction ALONE
		var y; // Index used to span the elements concerning the Second Species Ctp (min_note_array and ctp2_array) and play them

		var volume_slider_4; // Element controlling the volume slider of Second Species Ctp Chords alone
		var output_4; // Element controlling the intensity of the gain of the volume slider of Second Species Ctp Chords alone
		var valore_gain_4; // Value of the gain for the reproduction of Second Species Ctp Chords alone
		
		var context_second;
		var osc_second;
		var gainSecond;
		var analyser_second;
		var bufferLength_second;
		var dataArray_second;

		var context_first; // AudioContext variable for the function ???
		var osc_chord;
		var analyser_first;
		var bufferLength_first;
		var dataArray_first;

	// First Species Ctp chords and Melody reproduction
		var volume_slider_3_melody; // Element controlling the volume slider of the MELODY for the reproduction of melody and ctp notes together
		var volume_slider_3_chords; // Element controlling the volume slider of the CHORDS for the reproduction of melody and ctp notes together
		var output_3_melody; // Element controlling the intensity of the gain of the volume slider of the MELODY for the reproduction of melody and ctp notes together
		var output_3_chords; // Element controlling the intensity of the gain of the volume slider of the CHORDS for the reproduction of melody and ctp notes together
		var valore_gain_3_melody; // Value of the gain for the MELODY for the reproduction of melody and ctp notes together
		var valore_gain_3_chords; // Value of the gain for the CHORDS for the reproduction of melody and ctp notes together

	// Variables tuning the canvas showing the time evolution of the waves reproduced
		var time_canvas;
		var canvas_context;




	//record button functionalities:
		//request MIDI Access (on MIDI success)
		//compute the chords duration array the first species ctp notes
		//keep track of some important indexes

		send = false;
		last_melody_index = 0;
		last_chord_index = 0;
		min_note_i = 0;

		document.querySelectorAll("#rec_button").forEach(toggleRecord);
		
		function toggleRecord(item){
			item.onclick = record;
		}

		function record(){
			this.classList.toggle("clicked_button");
			melody_channel = document.getElementById("melody_input").value; //we store the value of the channel for the melody
			chord_channel = document.getElementById("chord_input").value; //we store the value of the channel for the chords
			send = !send;
			console.log(send + " record");
			if (send){
				this.firstChild.data = "Stop";
				navigator.requestMIDIAccess().then(onMIDISuccess);
				first_melody_index = last_melody_index;
				first_min_index = min_note_i;
				counter_second = last_note_second;
			}
			else{
				this.firstChild.data = "Start";
				getMinNote();
				getChordDuration();
				getMelodyDuration();
				last_note_second = chord_i*2;
			}
		}
	
	// If send is true, so if we are recording
		i = 0;
		j = 0;


		melody_time = new Array;
		
		chord_time = new Array;


		function onMIDISuccess(midiAccess) {
			console.log(midiAccess);
		    inputs = midiAccess.inputs;
		    outputs = midiAccess.outputs;
		    
		    for (var input of midiAccess.inputs.values()){
		        input.onmidimessage = getMIDIMessage;
		    }
		}

		function getMIDIMessage(midiMessage) {
			message = midiMessage;
			if (message.data[0] == (143 + Number(melody_channel)) || message.data[0] == (127 + Number(melody_channel))){
				melody_array[i] = message.data;
				melody_time[i] = message.timeStamp;
				i++;
			} else if (message.data[0] == (143 + Number(chord_channel))  || message.data[0] == (127 + Number(chord_channel)) ){
				chord_array[j] = message.data;
				chord_time[j] = message.timeStamp;
				j++;
			}
		}

// If send is false, so if we stopped recording
	//creates two arrays, one containing the minimum note for each chord, one containing its timing information
		m = 1;
		min_note_index = 0;
		min_note_array = new Array;
		min_note_time = new Array;
		//min_note_i = 0; To remember its initialization

		function getMinNote(){
			//min_note = chord_array[0][1];
			min_note = chord_array[first_min_index][1];
			while (m<chord_array.length){
				if (chord_array[m][0] == chord_array[m-1][0]){
					if (Math.min(min_note, chord_array[m][1]) == chord_array[m][1]){
						min_note = chord_array[m][1];
						min_note_index = m; 
					}
					m++;
				} else {
					min_note_array[min_note_i] = chord_array[min_note_index];
					min_note_time[min_note_i] = chord_time[min_note_index];
					min_note_i++;
					m++;
					min_note = chord_array[m-1][1];
					min_note_index = m-1;
				} 
			}
			min_note_array[min_note_i] = chord_array[min_note_index];
			min_note_time[min_note_i] = chord_time[min_note_index];
		}

	//Compute note and chord duration array
		function getDurationNotes(index, array_type, time_type, other_time, duration_type, noteOn_type, last_note, other_last){
			if (index == 0){
				specialduration(0, 0, time_type, other_time, duration_type, noteOn_type);
			}else if (index == last_note){
				console.log("SIAMO IN LAST NOTE");
				specialduration(index, other_last, time_type, other_time, duration_type, noteOn_type); //LAST_NOTE
			} else { // if index is not the last
				duration_type[index] = time_type[index] - time_type[index-1];
				noteOn_type[index] = (array_type[index][0] < array_type[index-1][0]);
			}
		}

		function specialduration(index, other_index, time_type, other_time, duration_type, noteOn_type){
			if(time_type[index]>other_time[other_index]){ 
				//if the time of (for example) the note is bigger of the one of the chord then the duration is the difference between the two times plus the arbitrary duration 200ms
				duration_type[index] = time_type[index]-other_time[other_index]+200;
				console.log(duration_type[index] + " duration " + time_type[index]+ " <- first time, second time -> " + other_time[other_index]);
			} else { //otherwise the duration is the arbitrary one
				duration_type[index] = 200; 
				console.log(duration_type[index] + " duration " + time_type[index]+ " <- first time, second time -> " + other_time[other_index]);
			}
			noteOn_type[index] = false;
		}

	// Creating the duration arrays for the First and Second Species Counterpoints
		chord_duration = new Array;
		noteOn = new Array;
		chordOn = new Array;

		//First Species ctp notes
		ctp1_array = new Array;
		ctp1On = new Array;
		cons_notes = [4,7,9,12];

		//Second Species ctp notes
		ctp2On = new Array;
		ctp2_duration = new Array;
		ctp2_array = new Array;
		diss_notes = [1,2,3,4,5,6,8,9,10,11];

		//first_min_index = min_note_i; remember
		function getChordDuration(){
			ctp2_duration = ctp2_duration.concat(Array((min_note_array.length-first_min_index)*2));
			for (chord_i = first_min_index; chord_i<min_note_array.length; chord_i++){
				console.log("CHORDS");
				//getDurationNotes(index, array_type, time_type, other_time, duration_type, noteOn_type, last_note, other_last)
				getDurationNotes(chord_i, min_note_array, min_note_time, melody_time, chord_duration, chordOn, first_min_index, first_melody_index);
			// First Species Ctp array
				ctp1_array[chord_i] = min_note_array[chord_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];
				ctp1On[chord_i] = chordOn[chord_i];
			// Second Species Ctp array	
				ctp2_i = chord_i * 2;
				ctp2_duration = ctp2_duration.fill(chord_duration[chord_i]/2,ctp2_i,ctp2_i+2);
				//consonant notes
				ctp2_array[ctp2_i] = min_note_array[chord_i][1] + cons_notes[Math.floor(Math.random() * cons_notes.length)];
				ctp2On[ctp2_i] = chordOn[chord_i];
				//dissonant notes
				ctp2_array[ctp2_i+1] = min_note_array[chord_i][1] + diss_notes[Math.floor(Math.random() * diss_notes.length)];
				ctp2On[ctp2_i+1] = chordOn[chord_i];
			}
		}

	// Creating the duration array for the Melody
		note_i = 0;

		melody_duration = new Array;
		noteOn = new Array;

		function getMelodyDuration(){
			melody_duration = melody_duration.concat(Array(melody_array.length-first_melody_index));
			last_melody_index = melody_array.length;
			while(note_i < melody_array.length){
				console.log("NOTES");
				getDurationNotes(note_i, melody_array, melody_time, min_note_time, melody_duration, noteOn, first_melody_index, first_min_index);
				note_i++;
			}
		}

		play_button_clicked = document.querySelector("#container_2").children.play_button;
		harm_button_clicked = document.querySelector("#container_3").children.harm_button;
		complete_button_clicked = document.querySelector("#container_4").children.play_all;
		second_button_clicked = document.querySelector("#container_5").children.second_ctp;

// Playing notes
		harmony = false;

		min_midi_freq = 21;
		min_keyb_freq = 27.5;

	//Playing the main melody
		k = 0;

		// Toggle PLAY button
		document.querySelectorAll("#play_button").forEach(togglePlayMelody);
		
		function togglePlayMelody(item){
			item.onclick = callstartMelody;
		}
		
		function callstartMelody(){
			k = first_melody_index;
			harmony = false;
			second = false;
			play_button_clicked.classList.toggle("clicked_button");
			startMelody();
		}
		
		function startMelody(){
			if (second == false){
				if (k<melody_array.length){
					//Melody notes
					midi_freq = melody_array[k][1];
					keyb_freq = min_keyb_freq*Math.pow(2,(midi_freq - min_midi_freq)**1/12);

					if(noteOn[k]){
						playMelody(keyb_freq);
						console.log(midi_freq + " = " + keyb_freq + " durata " + melody_duration[k] + " ON" + " k = " + k);
					} else{
						console.log(midi_freq + " = " + keyb_freq + " durata " + melody_duration[k] + " OFF" + " k = " + k);
					}
					setTimeout(startMelody, melody_duration[k]);
					k++;
				}else {
					if (!harmony){
						play_button_clicked.classList.toggle("clicked_button");
					}
					harmony = true;
				}
			} else if (second){
					for (var i=0;i<melody_duration.length;i++){
						melody_dur[i] = melody_duration[i]*cost;
					}

					console.log(melody_dur);
					
					if (k<melody_array.length){
					//Melody notes
					midi_freq = melody_array[k][1];
					keyb_freq = min_keyb_freq*Math.pow(2,(midi_freq - min_midi_freq)**1/12);

					if(noteOn[k]){
						playMelody(keyb_freq);
						console.log(midi_freq + " = " + keyb_freq + " durata " + melody_dur[k] + " ON" + " k = " + k);
					} else{
						console.log(midi_freq + " = " + keyb_freq + " durata " + melody_dur[k] + " OFF" + " k = " + k);
					}
					setTimeout(startMelody, melody_dur[k]);
					k++;
				}else {
					if (!harmony){
						play_button_clicked.classList.toggle("clicked_button");
					}
					harmony = true;
				}
			}
		}

		// Managing VOLUME
		volume_slider_1 = document.getElementById("volumeControl_1");
		document.querySelectorAll("#volumeControl_1").forEach(toggleVolumeMelody);
		output_1 = document.getElementById("span1");
		output_1.innerHTML = volume_slider_1.value;
		valore_gain = 1;


		function toggleVolumeMelody(item){
			item.onmouseup = changeVolumeMelody;
		}

		function changeVolumeMelody(event) {
			output_1.innerHTML = volume_slider_1.value;
			valore_gain = output_1.innerHTML;
			console.log("valore_gain_1 = " + valore_gain);
		}

		// Actual function starting the oscillators
		function playMelody(freq){
			
			c = new AudioContext();

		    osc = c.createOscillator();

		    gainNode = c.createGain();

		    analyserMelody = c.createAnalyser();

		    gainNode.gain.value = valore_gain;
		
		    osc.connect(gainNode);
		    gainNode.connect(analyserMelody);
			analyserMelody.connect(c.destination);
		    
		    analyserMelody.fftSize = 256;
		    bufferLength = analyserMelody.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);
			
		    osc.frequency.value = freq;

		    if (second == false){current_dur = melody_duration[k]/4000;}
		    else {current_dur = melody_dur[k]/4000;}

		    osc.start();

		    gainNode.gain.linearRampToValueAtTime(valore_gain,current_dur); 
		   	gainNode.gain.linearRampToValueAtTime(0,current_dur*4); 
		    
		    if (harmony == false){drawMelody();}
		    
		    if (second == false){osc.stop(melody_duration[k]/1000);}
		    else {osc.stop(melody_dur[k]/1000);}
		    
		}

	//Playing MinNote and First Species Ctp notes
		g = 0;

		document.querySelectorAll("#harm_button").forEach(togglePlayFirstCtp);
			
		function togglePlayFirstCtp(item){
			item.onclick = callStartFirstCtp;
		}

		function callStartFirstCtp(){
			g = first_min_index;
			harmony = false;
			harm_button_clicked.classList.toggle("clicked_button");
			StartFirstCtp();
		}

		function StartFirstCtp(){
			if (g<min_note_array.length){
				//Min chord Notes	
				midi_chord_freq = min_note_array[g][1];
				keyb_chord_freq = min_keyb_freq*Math.pow(2,(midi_chord_freq - min_midi_freq)**1/12);
				//Ctp Notes
				midi_first_ctp = ctp1_array[g];
				keyb_first_ctp = min_keyb_freq*Math.pow(2,(midi_first_ctp - min_midi_freq)**1/12);
				if (chordOn[g]){
					playFirstCtp(keyb_chord_freq,keyb_first_ctp);
				} 
				
				setTimeout(StartFirstCtp,chord_duration[g]);
				g++;
				
			} else {
				if (harmony){
					complete_button_clicked.classList.toggle("clicked_button");
				} else {
					harm_button_clicked.classList.toggle("clicked_button");
				}
			} 
		}

		//Managing VOLUME
		volume_slider_2 = document.getElementById("volumeControl_2");
		document.querySelectorAll("#volumeControl_2").forEach(toggleVolumeFirstCtp);
		output_2 = document.getElementById("span2");
		output_2.innerHTML = volume_slider_2.value;
		valore_gain_2 = 0.5;

		function toggleVolumeFirstCtp(item){
			item.onmouseup = changeVolumeFirstCtp;
		}

		function changeVolumeFirstCtp(event) {
			output_2.innerHTML = volume_slider_2.value;
			valore_gain_2 = (volume_slider_2.value)/3;
			constantNode.offset.value = valore_gain_2;
			console.log("valore gain = " + valore_gain_2);
			console.log("gain value = " + constantNode.offset.value);
		}
	

		function playFirstCtp(freq1,freq2) {

			context = new AudioContext();

			gainNode1 = context.createGain();
			gainNode1.gain.value = valore_gain_2;
			 
			gainNode2 = context.createGain();
			gainNode2.gain.value = valore_gain_2;

			constantNode = context.createConstantSource();
			constantNode.connect(gainNode1.gain);
			constantNode.connect(gainNode2.gain);
			constantNode.offset.value = valore_gain_2;
			constantNode.start();

		  	oscNode1 = context.createOscillator();
		  	oscNode1.frequency.value = freq1;
		  	oscNode1.type = "sine";

			oscNode2 = context.createOscillator();
			oscNode2.frequency.value = freq2;
			oscNode2.type = "sine";

			analyser_min = context.createAnalyser();
		    analyser_min.fftSize = 256;
		    bufferLength_min = analyser_min.frequencyBinCount;
			dataArray_min = new Uint8Array(bufferLength_min);

			analyser_ctp1 = context.createAnalyser();
		    analyser_ctp1.fftSize = 256;
		    bufferLength_ctp1 = analyser_ctp1.frequencyBinCount;
			dataArray_ctp1 = new Uint8Array(bufferLength_ctp1);

			oscNode1.connect(gainNode1);
			gainNode1.connect(analyser_min);
			analyser_min.connect(context.destination);

			oscNode2.connect(gainNode2);
			gainNode2.connect(analyser_ctp1);
			analyser_ctp1.connect(context.destination);

			oscNode1.start();
			oscNode2.start();

			current_dur = chord_duration[g]/4000;

			gainNode1.gain.linearRampToValueAtTime(valore_gain_2,current_dur); 
  			gainNode1.gain.linearRampToValueAtTime(0,current_dur*4);

  			gainNode2.gain.linearRampToValueAtTime(valore_gain_2,current_dur); 
			gainNode2.gain.linearRampToValueAtTime(0,current_dur*4);

			if (harmony == false) {drawChords();}

			oscNode1.stop(chord_duration[g]/1000);
			oscNode2.stop(chord_duration[g]/1000);
		}


	

		document.querySelectorAll("#play_all").forEach(toggleHarmony);
		
		function toggleHarmony(item){
			item.onclick = callPlayHarmony;
		}

		function callPlayHarmony(){
				
			k = first_melody_index;
			g = first_min_index;
			harmony = true;
			complete_button_clicked.classList.toggle("clicked_button");

			startMelody();
			StartFirstCtp();
			drawFirstCpt();

		}

		// Manage VOLUME for MELODY
		volume_slider_3_melody = document.getElementById("volumeControl_3_melody");	
		output_3_melody = document.getElementById("span3_melody");
		output_3_melody.innerHTML = volumeControl_3_melody.value;
		
		document.querySelectorAll("#volumeControl_3_melody").forEach(toggleVolume_Melody);
		valore_gain_3_melody = 1;

		// Manage VOLUME for CHORDS
		volume_slider_3_chords = document.getElementById("volumeControl_3_chords");
		output_3_chords = document.getElementById("span3_chords");
		output_3_chords.innerHTML = volumeControl_3_chords.value;
		
		document.querySelectorAll("#volumeControl_3_chords").forEach(toggleVolume_Chords);
		var valore_gain_3_chords = 0.5;

		function toggleVolume_Melody(item){
			item.onmouseup = changeVolume_Melody;
		}

		function toggleVolume_Chords(item){
			item.onmouseup = changeVolume_Chords;
		}

		function changeVolume_Melody(event) {
			output_3_melody.innerHTML = volume_slider_3_melody.value;
			//valore_gain_3_melody = output_3_melody.innerHTML;
			valore_gain = output_3_melody.innerHTML;
			console.log("valore_gain_3_melody = " + valore_gain);
		}

		function changeVolume_Chords(event) {
			output_3_chords.innerHTML = volume_slider_3_chords.value;
			//valore_gain_3_chords = (volume_slider_3_chords.value)/3;
			//constantNode.offset.value = valore_gain_3_chords;
			valore_gain_2 = (volume_slider_3_chords.value)/3;
			constantNode.offset.value = valore_gain_2;
			console.log("valore valore_gain_3_chords = " + valore_gain_2);
			console.log("gain value 3 cN = " + constantNode.offset.value);
		}


		//second counterpoint 
		document.querySelectorAll("#second_ctp").forEach(toggle_Second_ctp);
		
		function toggle_Second_ctp(item){
			item.onclick = startPlayingAll_Second;
		}

		y = 0;

		function startPlayingSecondCtp(){

			if (y<ctp2_array.length && second == true){
				//Melody notes
				midi_freq_second = ctp2_array[y];
				keyb_freq_second = min_keyb_freq*Math.pow(2,(midi_freq_second - min_midi_freq)**1/12);

				if(ctp2On[y]){
					playSecondCtp(keyb_freq_second);
					console.log("midi_freq_second = " + keyb_freq_second + " harm_duration = " + ctp2_duration[y] + " ON"+ " y= " +y);
				} else{
					console.log("midi_freq_second = " + keyb_freq_second + " harm_duration = " + ctp2_duration[y] + " OFF"+ " y= " +y);
				}
				setTimeout(startPlayingSecondCtp, ctp2_duration[y]*cost);
				y++;

			} else if (harmony) {
				second_button_clicked.classList.toggle("clicked_button");
			}
		}

		function startPlayingMinNotes(){

			if (g<min_note_array.length && second == true){
				midi_chord_freq = min_note_array[g][1];
				keyb_chord_freq = min_keyb_freq*Math.pow(2,(midi_chord_freq - min_midi_freq)**1/12);
				
				if (chordOn[g]){
					playMinNote(keyb_chord_freq);
					console.log("keyb_chord_freq = " + keyb_chord_freq + " chord_duration = " + chord_duration[g] + " ON" + " g = " + g);
				} else {
					console.log("keyb_chord_freq = " + keyb_chord_freq + " chord_duration = " + chord_duration[g] + " OFF" + " g = " + g);
				}
				setTimeout(startPlayingMinNotes,chord_duration[g]*cost);
				g++;
			} 
		}


		function startPlayingAll_Second(){
				
				k = first_melody_index;
				g = first_min_index;
				y = counter_second;
				harmony = true;
				second = true;
				cost = 5;
				second_button_clicked.classList.toggle("clicked_button");
				startMelody();
				startPlayingMinNotes();
				startPlayingSecondCtp();
				//drawSecondCtp();

		}

		//managing VOLUME -->only controls the second counterpoint notes volume
		volume_slider_4 = document.getElementById("volumeControl_4");
		output_4 = document.getElementById("span4");
		output_4.innerHTML = volume_slider_4.value;
		valore_gain_4 = 1;

		document.querySelectorAll("#volumeControl_4").forEach(toggleVolumeSecondCtp);

		function toggleVolumeSecondCtp(item){
			item.oninput = changeVolumeSecondCtp;
		}

		function changeVolumeSecondCtp(event) {
			output_4.innerHTML = volume_slider_4.value;
			valore_gain_4 = output_4.innerHTML;
			console.log("valore_gain_4 = " + valore_gain_4);
		}


		function playMinNote(freq){
			context_first = new AudioContext();
			
			osc_chord = context_first.createOscillator();
			gain_first = context_first.createGain();
			analyser_first = context_first.createAnalyser();

			gain_first.gain.value = 0.5;
		    
		    analyser_first.fftSize = 256;
		    bufferLength_first = analyser_first.frequencyBinCount;
			dataArray_first = new Uint8Array(bufferLength_first);
			
			osc_chord.connect(gain_first);
			gain_first.connect(analyser_first);
			analyser_first.connect(context_first.destination);
			
			osc_chord.frequency.value = freq;
			
			osc_chord.start();
						
			osc_chord.stop((chord_duration[g]*cost)/1000);
		}

		function playSecondCtp(freq){
			context_second = new AudioContext();
			osc_second = context_second.createOscillator();
			
			gainSecond = context_second.createGain();
			
			gainSecond.gain.value = valore_gain_4;
			
			analyser_second = context_second.createAnalyser();
			
			analyser_second.fftSize = 256;
			bufferLength_second = analyser_second.frequencyBinCount;
			dataArray_second = new Uint8Array(bufferLength_second);
			
			osc_second.connect(gainSecond);
			gainSecond.connect(analyser_second);
			analyser_second.connect(context_second.destination);

			osc_second.frequency.value = freq;
			
			current_dur = (ctp2_duration[y]*cost)/4000;
			
			osc_second.start();
			
			gainSecond.gain.linearRampToValueAtTime(valore_gain_4,current_dur); 
		   	gainSecond.gain.linearRampToValueAtTime(0,current_dur*4); 
			
			drawSecondCtp();

			osc_second.stop((ctp2_duration[y]*cost)/1000);
		}


		//time domain visualization of the selected item
		time_canvas = document.querySelector("#time_canvas");
		canvas_context = time_canvas.getContext("2d");

		WIDTH = time_canvas.width;
		HEIGHT = time_canvas.height;

		canvas_context.fillStyle = 'rgb(255, 255, 255)';


		function drawMelody() {
	      	drawVisual = requestAnimationFrame(drawMelody);

	      	analyserMelody.getByteFrequencyData(dataArray);
			
			canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
			canvas_context.fillStyle = 'rgb(255, 255, 255)';
	      	canvas_context.fillRect(0, 0, WIDTH, HEIGHT);

	      	var barWidth_x = (WIDTH / bufferLength) * 2.5;
			var barHeight;
			var x = 0;

			for(var i = 0; i < bufferLength; i++) {
		        barHeight = dataArray[i]/2;

		        canvas_context.fillStyle = 'rgb(50,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight/2,barWidth_x,barHeight);

		        x += barWidth_x + 1;
		    }
		}

		function drawChords() {
	      	requestAnimationFrame(drawChords);

	      	analyser_min.getByteFrequencyData(dataArray_min);
	      	analyser_ctp1.getByteFrequencyData(dataArray_ctp1);

			canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
			canvas_context.fillStyle = 'rgb(255, 255, 255)';
	      	canvas_context.fillRect(0, 0, WIDTH, HEIGHT);

	      	var barWidth_x = (WIDTH / bufferLength_min) * 2.5;
			var barHeight_x;
			var barHeight_y;
			var x = 0;

			for(var i = 0; i < bufferLength_min; i++) {
		        barHeight_x = dataArray_min[i]/2;
		        barHeight_y = dataArray_ctp1[i]/2;

		        canvas_context.fillStyle = 'rgb(255,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_x,barWidth_x,barHeight_x);

		        canvas_context.fillStyle = 'rgb(0,225,225)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_y/2,barWidth_x,barHeight_y);

		        x += barWidth_x + 1;
		    }
		}

		function drawFirstCpt() {
	      	requestAnimationFrame(drawFirstCpt);

/*	      	analyserMelody.fftSize = 256;
		    bufferLength = analyserMelody.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);

	      	analyser_min.fftSize = 256;
		    bufferLength_min = analyser_min.frequencyBinCount;
			dataArray_min = new Uint8Array(bufferLength_min);

		    analyser_ctp1.fftSize = 256;
		    bufferLength_ctp1 = analyser_ctp1.frequencyBinCount;
			dataArray_ctp1 = new Uint8Array(bufferLength_ctp1);
*/
			analyserMelody.getByteFrequencyData(dataArray);
	      	analyser_min.getByteFrequencyData(dataArray_min);
	      	analyser_ctp1.getByteFrequencyData(dataArray_ctp1);

			canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
			canvas_context.fillStyle = 'rgb(255, 255, 255)';
	      	canvas_context.fillRect(0, 0, WIDTH, HEIGHT);

	      	var barWidth = (WIDTH / bufferLength_min) * 2.5;
	      	var barHeight_melody;
			var barHeight_x;
			var barHeight_y;
			var x = 0;

			for(var i = 0; i < bufferLength_min; i++) {
		        barHeight_x = dataArray_min[i]/2;
		        barHeight_y = dataArray_ctp1[i]/2;
		        barHeight_melody = dataArray[i]/2;

		        canvas_context.fillStyle = 'rgb(255,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_x,barWidth,barHeight_x);

		        canvas_context.fillStyle = 'rgb(0,225,225)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_y/2,barWidth,barHeight_y);

		        canvas_context.fillStyle = 'rgb(50,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_melody/4,barWidth,barHeight_melody);

		        x += barWidth + 1;
		    }
		}


		function drawSecondCtp() {
	      	requestAnimationFrame(drawSecondCtp);

	      	analyserMelody.getByteFrequencyData(dataArray);
			analyser_first.getByteFrequencyData(dataArray_first);	      	
	      	analyser_second.getByteFrequencyData(dataArray_second);
			
			canvas_context.clearRect(0, 0, WIDTH, HEIGHT);
			canvas_context.fillStyle = 'rgb(255, 255, 255)';
	      	canvas_context.fillRect(0, 0, WIDTH, HEIGHT);

	      	var barWidth_x = (WIDTH / bufferLength_second) * 2.5;
			var barHeight_x;
			var barHeight_y;
			var barHeight_z;

			var x = 0;

			for(var i = 0; i < bufferLength_second; i++) {
		        barHeight_x = dataArray[i]/2;
		        barHeight_y = dataArray_first[i]/2;
		        barHeight_z = dataArray_second[i]/2;

		        canvas_context.fillStyle = 'rgb(50,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_x,barWidth_x,barHeight_x);

		        canvas_context.fillStyle = 'rgb(255,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_y/2,barWidth_x,barHeight_y);

		        canvas_context.fillStyle = 'rgb(100,50,50)';
		        canvas_context.fillRect(x,HEIGHT-barHeight_z/4,barWidth_x,barHeight_z);

		        x += barWidth_x + 1;
		    }
		}
	
	//}
