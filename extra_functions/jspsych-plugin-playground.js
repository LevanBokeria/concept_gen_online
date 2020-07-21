/*
 * Example plugin template
 */

jsPsych.plugins["plugin-playground"] = (function() {

  var plugin = {};

  // jsPsych.pluginAPI.registerPreload('plugin-playground', 'stimuli', 'image');
  jsPsych.pluginAPI.registerPreload('plugin-playground', 'audio_stimulus', 'audio');


  plugin.info = {
    name: "plugin-playground",
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
			audio_stimulus: {
				type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'Audio feedback',
        default: undefined,
				description: 'Correct and incorrect audio to be played.'
      },        
      score_box_target_names: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Score box targets',
        default: undefined,
        array: true,
        description: 'Image paths for the score board.'
      },             
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
      timer_till_fb: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Feedback timer',
        default: null,
        description: 'How long to wait until feedback is automatically given.'
      },
      timer_after_response: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Post-response timer',
        default: null,
        description: 'How long to wait until next trial starts automatically after response.'
      },         
      timer_no_resp_fb_freeze: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Post-no-response freeze timer',
        default: null,
        description: 'If there is no response, how long to freeze the feedback.'
      },       
      timer_no_resp_fb_freeze: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Post-no-response freeze timer',
        default: null,
        description: 'If there is no response, how long to freeze the feedback.'
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
      }      
    } // parameters
  } // plugin.info

  plugin.trial = function(display_element, trial) {

    // setup audio stimulus
    var context = jsPsych.pluginAPI.audioContext();
    if(context !== null){
      var source = context.createBufferSource();
      source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.audio_stimulus);
      source.connect(context.destination);
    } else {
      var audio = jsPsych.pluginAPI.getAudioBuffer(trial.audio_stimulus);
      audio.currentTime = 0;
    }

    // Start defining the html
    var html = "";

    html += '<div '+
      'id="jspsych-free-sort-arena" '+
      'class="jspsych-free-sort-arena" '+
      'style="background-color: white; position: relative; width:'+trial.sort_area_width+'px; height:'+trial.sort_area_height+'px; border:2px solid #444;"'+
      '></div>';

    display_element.innerHTML = html;

    // Create a smaller box to display the ongoing performance
    const score_box = document.createElement('div')
    score_box.id = 'score_box'
    score_box.className = 'score_box'

    score_box.style = 'position: absolute; top: 570px; left: 10px; width: 170px; height: 100px; border: 2px solid #444;'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(score_box)

      // Add the images of targets and the text to the performance box
      for (i=0; i<3; i++){

        let iTarget = document.createElement('img')
        iTarget.src = trial.score_box_target_names[i]
        score_box.appendChild(iTarget)

        iTarget.id = 'iTarget' + i
        iTarget.style = 'height: 40px; width: 40px; position: absolute; top:5px; left: ' + (5 + i*60) + 'px'

        let iPerf = document.createElement('P')
        iPerf.innerText = '100%'
  
        score_box.appendChild(iPerf)
        
        iPerf.id = 'iPerf' + i
        iPerf.style = 'font-size: 15px; position: absolute; top:30px; left: ' + (7 + i*60) + 'px'

      }

      // Add text "ongoing pefromance"
      const ongoingPerfText = document.createElement('P')
      ongoingPerfText.innerText = 'Your scores'
      score_box.appendChild(ongoingPerfText)

      ongoingPerfText.id = 'ongoingPerfText'
      ongoingPerfText.style = 'position: absolute; top: 55px; left: 30px; font-weight: bold;'



    // Create an element for all the feedback with class = 'feedback'
    const feedback_element = document.createElement('div')
    feedback_element.className = 'feedback_items'
    feedback_element.style.visibility = 'hidden'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(feedback_element)

    // ADD PROMPT TEXT
    const prompt = document.createElement('P')
    prompt.innerText = trial.prompt
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt)

    prompt.id = 'prompt'

    // ADD PROMPT IMAGE
    const prompt_img = document.createElement('img')
    prompt_img.src = trial.prompt_img_path
    prompt_img.dataset.src = trial.prompt_img_path

    prompt_img.id = 'prompt_img'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt_img)

    prompt_img.width = trial.prompt_img_width
    prompt_img.height = trial.prompt_img_height

    prompt_img.style = 'position: absolute; top:' + trial.prompt_img_y_coords + 'px; left:' 
      + trial.prompt_img_x_coords + 'px;'

    // ADD PROMPT IMAGE NAME
    const prompt_img_name = document.createElement('P')
    prompt_img_name.innerText = trial.prompt_img_name
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt_img_name)

    prompt_img_name.style = 'position: relative; top:' + (-15) + 'px;' 
     + 'font-size: 20px;'

    prompt_img_name.id += 'prompt_img_name'

    // ADD ex img
    const ex_pairs_img_path = document.createElement('img')
    ex_pairs_img_path.src = trial.ex_pairs_img_path
    ex_pairs_img_path.dataset.src = trial.ex_pairs_img_path

    ex_pairs_img_path.id = 'ex_pairs_img_path'


    display_element.querySelector("#jspsych-free-sort-arena").appendChild(ex_pairs_img_path)

    ex_pairs_img_path.width = trial.ex_pairs_img_width

    ex_pairs_img_path.style = 'position: absolute; top:' + (trial.prompt_img_y_coords + trial.prompt_img_height + 30) + 
                              'px; left:' + (trial.sort_area_width/2 - trial.ex_pairs_img_width/2) + 'px;'

    // ADD INDICES ONSCREEN TEXT
    // debugger
    for (i=0; i<trial.onscreen_idx.length; i++){

      let idx_element = document.createElement('P')
      idx_element.innerText = trial.onscreen_idx[i]

      display_element.querySelector("#jspsych-free-sort-arena").appendChild(idx_element)
      idx_element.id = 'onscreen_idx_' + i
      idx_element.style = 'position: absolute; top:' + trial.onscreen_idx_y_coords[i] + 
        'px; left:' + trial.onscreen_idx_x_coords[i] + 'px;' + 
        'font-size: 25px; font-weight: bold'

    }

    // Add elements
    for (iImg=0; iImg<trial.fb_img_paths.length; iImg++){

      // Images
      let i_fb_img = document.createElement('img')
      i_fb_img.src = trial.fb_img_paths[iImg]
      i_fb_img.id = 'fb_img' + (iImg+1)
      i_fb_img.width = trial.prompt_img_width
      i_fb_img.height = trial.prompt_img_height
      i_fb_img.style = 'position: absolute; top:' + trial.fb_imgs_y_coords[iImg] + 'px; left:' 
        + trial.fb_imgs_x_coords[iImg] + 'px;'

      feedback_element.appendChild(i_fb_img)

      // Image names
      let i_item_img_name = document.createElement('P')
      i_item_img_name.innerText = trial.item_img_names[iImg]
      i_item_img_name.id = 'item_img_name' + (iImg+1)
      i_item_img_name.style = 'position: absolute; top:' + (trial.fb_imgs_y_coords[iImg]-50) + 'px; left:' 
      + (trial.fb_imgs_x_coords[iImg]+13) + 'px;'       

      feedback_element.appendChild(i_item_img_name)

    }

    // ADD FEEDBACK TEXT
    const fb_text = document.createElement('P')
    fb_text.innerText = ''
    fb_text.id = 'fb_text'
    fb_text.style = 'position: absolute; top:' + (trial.prompt_img_y_coords) + 'px; left:' 
      + (trial.prompt_img_x_coords+trial.prompt_img_width+10) + 'px;'

    feedback_element.appendChild(fb_text)

    // ADD FEEDBACK SYMBOL IMAGE
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
      key: null
    };

    // ////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////

    // function to handle responses by the subject
    var after_response = function(info) {

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      // Was it correct or not?
      response.correct = (response.key == '49' & trial.correct_response == 1) |
                         (response.key == '50' & trial.correct_response == 2)


      // Clear the timer for showing feedback if no response
      clearTimeout(ticking_till_fb)

      // Show feedback
      show_feedback(response.correct)

      if (trial.response_ends_trial) {

        // End the trial after 2 seconds 
        jsPsych.pluginAPI.setTimeout(end_trial, trial.timer_after_response)
      }
    };

    // function to end trial when it is time
    var end_trial = function() {

      // stop the audio file if it is playing
			// remove end event listeners if they exist
			if(context !== null){
				source.stop();
				source.onended = function() { }
			} else {
				audio.pause();
				audio.removeEventListener('ended', end_trial);
			}


      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.targetStim,
        "key_press": response.key
      };

      // clear the display
      // display_element.innerHTML = '';
      document.querySelector("#prompt_img").style.visibility = 'hidden';
      document.querySelector("#ex_pairs_img_path").style.visibility = 'hidden';
      document.querySelector("#onscreen_idx_0").style.visibility = 'hidden';
      document.querySelector("#onscreen_idx_1").style.visibility = 'hidden';
      display_element.querySelector('.feedback_items').style.visibility = 'hidden';
          

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // helper functions

    function random_coordinate(max_width, max_height) {
      var rnd_x = Math.floor(Math.random() * (max_width - 1));
      var rnd_y = Math.floor(Math.random() * (max_height - 1));

      return {
        x: rnd_x,
        y: rnd_y
      };
    }

    // Function to show feedback

    var show_feedback = function(correct){
      
      // let feedback_text = '';

      if (correct == 1){
        fb_text.innerText = 'correct!'
        fb_accu_img.src = trial.fb_correct_img

        // Play the sound
        if(context !== null){
          startTime = context.currentTime;
          source.start(startTime);
        } else {
          audio.play();
        }


      } else if (correct == 0){
        fb_text.innerText = 'incorrect...'
        fb_accu_img.src = trial.fb_incorrect_img
      } else if (correct == 2){
        fb_text.innerText = 'missed...'
        fb_accu_img.style.visibility = 'hidden'
      }

      // Display the feedback items
      display_element.querySelector('.feedback_items').style.visibility = 'visible';

      // display_element.querySelector('#fb_img1').style.visibility = 'visible';
      // display_element.querySelector('#fb_img2').style.visibility = 'visible';

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

    // Show feedback if timing is set
    if (trial.timer_till_fb !== null) {
      var ticking_till_fb = jsPsych.pluginAPI.setTimeout(show_feedback, trial.timer_till_fb);
    }

    // If no response in time, show feedback and freeze the feedback for a while
    var ticking_response_window = jsPsych.pluginAPI.setTimeout(function(){
      
      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      
      // Record a miss
      response.correct = 2

      // Show feedback
      show_feedback(response.correct)

      // Freeze feedback, then end the trial
      jsPsych.pluginAPI.setTimeout(end_trial, trial.timer_no_resp_fb_freeze)

    }, trial.timer_response_window)


    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
