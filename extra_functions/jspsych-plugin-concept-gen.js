/*
 * Example plugin template
 */

jsPsych.plugins["plugin-concept-gen"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "plugin-concept-gen",
    description: "",
    parameters: {
      prompt_img_name: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt image name',
        default: undefined,
        array: true,
        description: 'Prompt image name.'
      },  
      prompt_img_path: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      ex_pairs_maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },      
      prompt_img_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      prompt_img_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus width',
        default: 100,
        description: 'Width of images in pixels'
      },
      prompt_img_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      prompt_img_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },
      ex_pairs_img_path: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      ex_pairs_img_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      ex_pairs_img_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs width',
        default: 100,
        description: 'Width of images in pixels'
      }, 
      ex_pairs_img_margin_top: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs margin on top',
        default: 100,
        description: 'A bit of space on top, after the prompt image'
      },       
      item_img_names: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Item image names',
        default: undefined,
        array: true,
        description: 'Item image name.'
      },       
      fb_correct_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Green Tick',
        default: undefined,
        description: 'Green tick.'
      },       
      fb_incorrect_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Red X',
        default: undefined,
        description: 'Red X.'
      },    
			// audio_stimulus: {
			// 	type: jsPsych.plugins.parameterType.AUDIO,
      //   pretty_name: 'Audio feedback',
      //   default: undefined,
			// 	description: 'Correct and incorrect audio to be played.'
      // },                    
      onscreen_idx: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'On screen indices',
        default: undefined,
        array: true,
        description: 'On screen indices for items.'
      },     
      onscreen_idx_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Index x coordinates',
        default: undefined,
        array: true,
        description: 'X coordinates of indices shown.'
      },
      onscreen_idx_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Index y coordinates',
        default: undefined,
        array: true,
        description: 'Y coordinates of indices shown.'
      },
      fb_img_paths: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Paths to feedback images',
        default: undefined,
        array: true,
        description: 'Paths to feedback images'
      },       
      fb_imgs_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback img x coordinates',
        default: undefined,
        array: true,
        description: 'X coordinate of Feedback imgs.'
      },     
      fb_imgs_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback img y coordinates',
        default: undefined,
        array: true,
        description: 'Y coordinate of Feedback imgs.'
      }, 
      timer_after_response: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Post-response timer',
        default: null,
        description: 'How long to wait until next trial starts automatically after response.'
      },         
      timer_allow_space_key: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'When to allow space key',
        default: null,
        description: 'When to allow space key to move to the next trial manually'
      },               
      timer_response_window: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Response window',
        default: null,
        description: 'How long to wait for a response, until automatic feedback is given.'
      },
      correct_response: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Correct response',
        default: undefined,
        description: 'Correct response.'
      },           
      sort_area_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Sort area height',
        default: 800,
        description: 'The height of the container that subjects can move the stimuli in.'
      },
      sort_area_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Sort area width',
        default: 800,
        description: 'The width of the container that subjects can move the stimuli in.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'It can be used to provide a reminder about the action the subject is supposed to take.'
      },
      prompt_location: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Prompt location',
        options: ['above','below'],
        default: 'above',
        description: 'Indicates whether to show prompt "above" or "below" the sorting area.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },      
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      n_trials: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Total trials',
        default: null,
        description: 'Total trials in this session.'
      },
      phase: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Current phase',
        default: null,
        description: 'What phase is this?'
      },
      session: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Current session',
        default: null,
        description: 'What session is this? If -1 thats practice trials.'
      }                       
    } // parameters
  } // plugin.info

  plugin.trial = function(display_element, trial) {

    [curr_phase,phase_string,curr_session,curr_global_trial] = getPhaseAndSession()    

    // // setup audio stimulus
    // var context = jsPsych.pluginAPI.audioContext();
    // if(context !== null){
    //   var source = context.createBufferSource();
    //   source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.audio_stimulus);
    //   source.connect(context.destination);
    // } else {
    //   var audio = jsPsych.pluginAPI.getAudioBuffer(trial.audio_stimulus);
    //   audio.currentTime = 0;
    // }

    // Start defining the html
    var html = "";

    html += '<div '+
      'id="jspsych-free-sort-arena" '+
      'class="jspsych-free-sort-arena" '+
      'style="background-color: white; position: relative; width:'+trial.sort_area_width+'px; height:'+trial.sort_area_height+'px; border:2px solid #444;"'+
      '></div>';

    display_element.innerHTML = html;

    // Create the text saying to press space key to move on
    let press_space_key_element = document.createElement('div')
    press_space_key_element.innerText = 'Space key = next trial'
    press_space_key_element.style.visibility = 'hidden'
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(press_space_key_element)
    press_space_key_element.style.position = 'absolute'
    press_space_key_element.style.top      = '660px'
    press_space_key_element.style.left     = '560px'     

		// Create the score box
		let score_box_element = createScoreBox()
    score_box_element.style.position = 'absolute'
    score_box_element.style.top      = '580px'
    score_box_element.style.left     = '5px'             
    
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(score_box_element)

    // Create an element containing text about session, trial, and phase progress
    const progress_text = document.createElement('P')
    
    if (trial.session == -1){
      progress_text.innerText = 'Practice. Trial ' + (jsPsych.data.get().values().length + 1) + '/' + trial.n_trials;

    } else {
      progress_text.innerText = 'Session ' + trial.session + '/' + jatos.studySessionData.qc_criteria.max_training_sess + '. Trial ' + (jsPsych.data.get().values().length + 1) + '/' + trial.n_trials;
    };

    progress_text.id    = 'progress_text'
    progress_text.style = 'font-size: 15px; text-align: center; position: absolute; top: -40px; left: 30px; z-index: 1;'
    // progress_text.style = 'font-size: 15px; display: block; margin-left: auto; margin-right: auto;'

    score_box_element.appendChild(progress_text)

    // ADD PROMPT TEXT
    const prompt = document.createElement('P')
    prompt.innerText = trial.prompt
    prompt.id = 'prompt_text'
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt)


    // ADD PROMPT IMAGE
    const prompt_img = document.createElement('img')
    prompt_img.src = trial.prompt_img_path
    prompt_img.id = 'prompt_img'
    prompt_img.width = trial.prompt_img_width
    prompt_img.height = trial.prompt_img_height
    prompt_img.style = 'position: absolute; top:' + trial.prompt_img_y_coords + 'px; left:' 
      + trial.prompt_img_x_coords + 'px;'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt_img)


    // ADD PROMPT IMAGE NAME
    const prompt_img_name = document.createElement('P')
    prompt_img_name.innerText = trial.prompt_img_name
    prompt_img_name.style = 'position: relative; top:' + (-15) + 'px;' 
     + 'font-size: 20px;'
    prompt_img_name.id += 'prompt_img_name'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt_img_name)


    // ADD ex img
    const ex_pairs_img_path = document.createElement('img')
    ex_pairs_img_path.src = trial.ex_pairs_img_path
    ex_pairs_img_path.id = 'ex_pairs_img_path'

    ex_pairs_img_path.width = trial.ex_pairs_img_width
    // ex_pairs_img_path.style = 'position: absolute; z-index: 0; top:' + (trial.prompt_img_y_coords + trial.prompt_img_height + 50) + 
    //                           'px; left:' + (trial.sort_area_width/2 - trial.ex_pairs_img_width/2) + 'px;'
    ex_pairs_img_path.style = 'z-index: 0; margin-top: ' + trial.ex_pairs_img_margin_top + 'px;'                              

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(ex_pairs_img_path)


    // Create an element for all the feedback with class = 'feedback'
    const feedback_element = document.createElement('div')
    feedback_element.className = 'feedback_items'
    feedback_element.style.visibility = 'hidden'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(feedback_element)

    // Add elements
    for (iImg=0; iImg<trial.fb_img_paths.length; iImg++){

      // Indices of images
      let idx_element = document.createElement('P')
      idx_element.innerText = trial.onscreen_idx[iImg]

      idx_element.id = 'onscreen_idx_' + iImg
      idx_element.style = 'position: absolute; top:' + trial.onscreen_idx_y_coords[iImg] + 
        'px; left:' + trial.onscreen_idx_x_coords[iImg] + 'px;' + 
        'font-size: 25px; font-weight: bold'
      display_element.querySelector("#jspsych-free-sort-arena").appendChild(idx_element)

      // Images
      let i_fb_img = document.createElement('img')
      i_fb_img.src = trial.fb_img_paths[iImg]
      i_fb_img.id = 'fb_img' + (iImg+1)
      i_fb_img.width = trial.prompt_img_width*70/100
      i_fb_img.height = trial.prompt_img_height*70/100
      i_fb_img.style = 'position: absolute; top:' + trial.fb_imgs_y_coords[iImg] + 'px; left:' 
        + trial.fb_imgs_x_coords[iImg] + 'px;'

      feedback_element.appendChild(i_fb_img)

      // Image names
      let i_item_img_name = document.createElement('P')
      i_item_img_name.innerText = trial.item_img_names[iImg]
      i_item_img_name.id = 'item_img_name' + (iImg+1)
      i_item_img_name.style = 'position: absolute; top:' + (trial.fb_imgs_y_coords[iImg]-40) + 'px; left:' 
      + (trial.fb_imgs_x_coords[iImg]+5) + 'px;'
     
      i_item_img_name.style['font-size'] = '0.8em'    

      feedback_element.appendChild(i_item_img_name)

    }

    // ADD FEEDBACK TEXT: "correct" "incorrect..."
    const fb_text = document.createElement('P')
    fb_text.innerText = ''
    fb_text.id = 'fb_text'
    fb_text.style = 'position: absolute; top:' + (trial.prompt_img_y_coords) + 'px; left:' 
      + (trial.prompt_img_x_coords+trial.prompt_img_width+10) + 'px;'

    feedback_element.appendChild(fb_text)

    // ADD FEEDBACK SYMBOL IMAGE: green tick or red X.
    const fb_accu_img = document.createElement('img')
    fb_accu_img.id = 'fb_accu_img'
    fb_accu_img.width = trial.prompt_img_width/2
    fb_accu_img.height = trial.prompt_img_height/2
    fb_accu_img.style = 'position: absolute; top:' + (trial.prompt_img_y_coords+20) + 'px; left:' 
      + (trial.prompt_img_x_coords - trial.prompt_img_width/2 - 5)  + 'px;'

    feedback_element.appendChild(fb_accu_img)

    ////////////////////////////////////////////////////////////////////
    // store response
    var response = {
      rt: null,
      key: null,
      correct: null,
      space_key_pressed: false,
      space_key_rt: null,
    };

    // If the show correct flag is on, show the feedback from the beginning
    if (jatos.studySessionData.show_correct){
      display_element.querySelector('.feedback_items').style.visibility = 'visible';
    }
    // ////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////

    var after_space_key = function(info){
      
      if (allow_space_key){
        // Record when the space key was pressed
        response.space_key_pressed = true
        response.space_key_rt = info.rt
        end_trial();
      }
    }

    // function to handle responses by the subject
    var after_response = function(info) {
      
      // Clear the trial duration timeout
      clearTimeout(ticking_response_window)

      // If auto respond, change the info
      if (jatos.studySessionData.auto_respond){

        // Decide whether to answer correctly or incorrectly on this trial
        let randChoice = Math.random() * 10 // generates a random number from 0 to 10

        if (randChoice <= jatos.studySessionData.auto_respons_probability){
          // Record the correct responses

          // If correct response is 1, key code is 49. Else its 50
          trial.correct_response == 1 ? response.key = '49' : response.key = '50'
          response.correct = 1
        } else {

          // Record wrong responses

          // If correct response is 1, key code is 49. Else its 50
          trial.correct_response == 1 ? response.key = '50' : response.key = '49'
          response.correct = 0
        }

        response.rt = 100
      } else {
        // only record the first response
        if (response.key == null) {

          // Copy the details from info to response
          Object.assign(response,info);
        }
        // Was it correct or not?
        response.correct = (response.key == '49' & trial.correct_response == 1) |
                           (response.key == '50' & trial.correct_response == 2)
      }


      // Show feedback
      show_feedback(response.correct)

      if (trial.response_ends_trial) {

        // End the trial after max seconds 
        jsPsych.pluginAPI.setTimeout(end_trial, trial.timer_after_response)

        // In 0.5 seconds, start listening to a space key to move to next trial
        jsPsych.pluginAPI.setTimeout(function(){

          allow_space_key = true
          press_space_key_element.style.visibility = 'visible'

        }, trial.timer_allow_space_key)
      
      } // if response ends trial.
    };

    // function to end trial when it is time
    var end_trial = function() {

      // stop the audio file if it is playing
			// remove end event listeners if they exist
			// if(context !== null){
			// 	source.stop();
			// 	source.onended = function() { }
			// } else {
			// 	audio.pause();
			// 	audio.removeEventListener('ended', end_trial);
			// }

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      if (typeof spaceKeyListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(spaceKeyListener);
      }      

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "key_press": response.key,
        "correct": response.correct
      };

      // clear the display

      document.querySelector("#onscreen_idx_0").style.visibility    = 'hidden';
      document.querySelector("#onscreen_idx_1").style.visibility    = 'hidden';
      document.querySelector('.feedback_items').style.visibility    = 'hidden';
      prompt_img.style.visibility              = 'hidden';
      prompt_img_name.style.visibility         = 'hidden';      
      ex_pairs_img_path.style.visibility       = 'hidden';
      press_space_key_element.style.visibility = 'hidden';
          

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // Function to show feedback

    var show_feedback = function(correct){
      
      // let feedback_text = '';

      if (correct == 1){
        fb_text.innerText = 'correct!'
        fb_accu_img.src = trial.fb_correct_img

        // // Play the sound
        // if(context !== null){
        //   startTime = context.currentTime;
        //   source.start(startTime);
        // } else {
        //   audio.play();
        // }


      } else if (correct == 0){
        fb_text.innerText = 'incorrect...'
        fb_accu_img.src = trial.fb_incorrect_img
      } else if (correct == null){
        fb_text.innerText = 'missed...'
        fb_accu_img.style.visibility = 'hidden'
      }

      // Display the feedback items
      display_element.querySelector('.feedback_items').style.visibility = 'visible';
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // Create a variable to be used later to start listening to the space key
    var spaceKeyListener = jsPsych.pluginAPI.getKeyboardResponse({
      callback_function: after_space_key,
      valid_responses: ['space'],
      rt_method: 'performance',
      persist: true,
      allow_held_key: false
    });

    var allow_space_key = false
    
    // If no response in time, show feedback and allow space key to move on
    var ticking_response_window = jsPsych.pluginAPI.setTimeout(function(){
      
      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      
      // Record a miss
      response.correct = null

      // Show feedback
      show_feedback(response.correct)

      // End the trial after max seconds 
      jsPsych.pluginAPI.setTimeout(end_trial, trial.timer_after_response)

      // In 0.5 seconds, start listening to a space key to move to next trial
      jsPsych.pluginAPI.setTimeout(function(){
 
        allow_space_key = true

        press_space_key_element.style.visibility = 'visible'

      }, trial.timer_allow_space_key)

    }, trial.timer_response_window)


    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    // If autoresponder is on, just respond in a while
    if (jatos.studySessionData.auto_respond){

      jsPsych.pluginAPI.setTimeout(function(){
        // // Whats the correct response?
        // let simKey 
        // trial.correct_response == 1 ? simKey = '1' : simKey = '2'

        // // Simulate a keypress
        // document.dispatchEvent(new KeyboardEvent('keydown',{'key':simKey}))

        after_response()

      },100)
    } // if autorespond
  };

  return plugin;
})();
